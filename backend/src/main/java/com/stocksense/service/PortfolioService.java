package com.stocksense.service;

import com.stocksense.dto.PortfolioDTO;
import com.stocksense.exception.ResourceNotFoundException;
import com.stocksense.model.Portfolio;
import com.stocksense.model.Stock;
import com.stocksense.model.Transaction;
import com.stocksense.repository.PortfolioRepository;
import com.stocksense.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    private static final Logger log = LoggerFactory.getLogger(PortfolioService.class);

    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;
    private final StockService stockService;

    public PortfolioService(PortfolioRepository portfolioRepository,
                            TransactionRepository transactionRepository,
                            StockService stockService) {
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository = transactionRepository;
        this.stockService = stockService;
    }

    public Portfolio createPortfolio(String userId, PortfolioDTO.CreateRequest request) {
        Portfolio portfolio = Portfolio.builder()
                .userId(userId)
                .name(request.getName())
                .description(request.getDescription())
                .holdings(new ArrayList<>())
                .totalInvested(BigDecimal.ZERO)
                .currentValue(BigDecimal.ZERO)
                .totalPnL(BigDecimal.ZERO)
                .totalPnLPercent(BigDecimal.ZERO)
                .build();

        return portfolioRepository.save(portfolio);
    }

    public List<Portfolio> getUserPortfolios(String userId) {
        List<Portfolio> portfolios = portfolioRepository.findByUserId(userId);
        portfolios.forEach(this::recalculatePortfolio);
        return portfolios;
    }

    public Portfolio getPortfolio(String id) {
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found: " + id));
        recalculatePortfolio(portfolio);
        return portfolio;
    }

    public Transaction executeTransaction(String userId, PortfolioDTO.TransactionRequest request) {
        Portfolio portfolio = portfolioRepository.findById(request.getPortfolioId())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));

        Stock stock = stockService.getStockBySymbol(request.getSymbol());
        Transaction.TransactionType type = Transaction.TransactionType.valueOf(request.getType().toUpperCase());

        Transaction transaction = Transaction.builder()
                .portfolioId(portfolio.getId())
                .userId(userId)
                .symbol(request.getSymbol().toUpperCase())
                .stockName(stock.getName())
                .type(type)
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .totalAmount(request.getPrice().multiply(BigDecimal.valueOf(request.getQuantity())))
                .notes(request.getNotes())
                .build();

        transaction = transactionRepository.save(transaction);

        // Update holdings
        updateHoldings(portfolio, request.getSymbol().toUpperCase(), stock.getName(),
                type, request.getQuantity(), request.getPrice());

        log.info("Transaction executed: {} {} shares of {} at ${}",
                type, request.getQuantity(), request.getSymbol(), request.getPrice());

        return transaction;
    }

    private void updateHoldings(Portfolio portfolio, String symbol, String stockName,
                                 Transaction.TransactionType type, int quantity, BigDecimal price) {
        Optional<Portfolio.Holding> existingHolding = portfolio.getHoldings().stream()
                .filter(h -> h.getSymbol().equals(symbol))
                .findFirst();

        if (type == Transaction.TransactionType.BUY) {
            if (existingHolding.isPresent()) {
                Portfolio.Holding holding = existingHolding.get();
                int newQty = holding.getQuantity() + quantity;
                BigDecimal totalCost = holding.getAvgBuyPrice().multiply(BigDecimal.valueOf(holding.getQuantity()))
                        .add(price.multiply(BigDecimal.valueOf(quantity)));
                holding.setQuantity(newQty);
                holding.setAvgBuyPrice(totalCost.divide(BigDecimal.valueOf(newQty), 2, RoundingMode.HALF_UP));
            } else {
                portfolio.getHoldings().add(Portfolio.Holding.builder()
                        .symbol(symbol)
                        .stockName(stockName)
                        .quantity(quantity)
                        .avgBuyPrice(price)
                        .build());
            }
        } else {
            existingHolding.ifPresent(holding -> {
                int remaining = holding.getQuantity() - quantity;
                if (remaining <= 0) {
                    portfolio.getHoldings().remove(holding);
                } else {
                    holding.setQuantity(remaining);
                }
            });
        }

        recalculatePortfolio(portfolio);
        portfolioRepository.save(portfolio);
    }

    private void recalculatePortfolio(Portfolio portfolio) {
        BigDecimal totalInvested = BigDecimal.ZERO;
        BigDecimal totalCurrent = BigDecimal.ZERO;

        for (Portfolio.Holding holding : portfolio.getHoldings()) {
            try {
                Stock stock = stockService.getStockBySymbol(holding.getSymbol());
                holding.setCurrentPrice(stock.getCurrentPrice());
                holding.setInvestedValue(holding.getAvgBuyPrice().multiply(BigDecimal.valueOf(holding.getQuantity())));
                holding.setCurrentValue(stock.getCurrentPrice().multiply(BigDecimal.valueOf(holding.getQuantity())));
                holding.setPnl(holding.getCurrentValue().subtract(holding.getInvestedValue()));
                if (holding.getInvestedValue().compareTo(BigDecimal.ZERO) > 0) {
                    holding.setPnlPercent(holding.getPnl().divide(holding.getInvestedValue(), 4, RoundingMode.HALF_UP)
                            .multiply(BigDecimal.valueOf(100)));
                }
                totalInvested = totalInvested.add(holding.getInvestedValue());
                totalCurrent = totalCurrent.add(holding.getCurrentValue());
            } catch (Exception e) {
                log.warn("Could not fetch current price for {}", holding.getSymbol());
            }
        }

        // Calculate allocation percentages
        for (Portfolio.Holding holding : portfolio.getHoldings()) {
            if (totalCurrent.compareTo(BigDecimal.ZERO) > 0 && holding.getCurrentValue() != null) {
                holding.setAllocationPercent(holding.getCurrentValue()
                        .divide(totalCurrent, 4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100)));
            }
        }

        portfolio.setTotalInvested(totalInvested);
        portfolio.setCurrentValue(totalCurrent);
        portfolio.setTotalPnL(totalCurrent.subtract(totalInvested));
        if (totalInvested.compareTo(BigDecimal.ZERO) > 0) {
            portfolio.setTotalPnLPercent(portfolio.getTotalPnL()
                    .divide(totalInvested, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100)));
        }
    }

    public List<Transaction> getTransactions(String portfolioId) {
        return transactionRepository.findByPortfolioIdOrderByCreatedAtDesc(portfolioId);
    }

    public void deletePortfolio(String id) {
        portfolioRepository.deleteById(id);
    }
}
