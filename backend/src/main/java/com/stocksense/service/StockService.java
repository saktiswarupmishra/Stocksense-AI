package com.stocksense.service;

import com.stocksense.exception.ResourceNotFoundException;
import com.stocksense.model.Stock;
import com.stocksense.model.StockPrice;
import com.stocksense.repository.StockPriceRepository;
import com.stocksense.repository.StockRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;

@Service
public class StockService {

    private static final Logger log = LoggerFactory.getLogger(StockService.class);

    private final StockRepository stockRepository;
    private final StockPriceRepository stockPriceRepository;

    public StockService(StockRepository stockRepository, StockPriceRepository stockPriceRepository) {
        this.stockRepository = stockRepository;
        this.stockPriceRepository = stockPriceRepository;
    }

    @PostConstruct
    public void seedSampleData() {
        if (stockRepository.count() == 0) {
            log.info("Seeding sample stock data...");
            List<Stock> stocks = List.of(
                createStock("AAPL", "Apple Inc.", "NASDAQ", "Technology", "Consumer Electronics", new BigDecimal("189.84"), 2940000000000L),
                createStock("GOOGL", "Alphabet Inc.", "NASDAQ", "Technology", "Internet Services", new BigDecimal("141.80"), 1780000000000L),
                createStock("MSFT", "Microsoft Corp.", "NASDAQ", "Technology", "Software", new BigDecimal("378.91"), 2810000000000L),
                createStock("AMZN", "Amazon.com Inc.", "NASDAQ", "Consumer Cyclical", "E-Commerce", new BigDecimal("186.49"), 1940000000000L),
                createStock("TSLA", "Tesla Inc.", "NASDAQ", "Consumer Cyclical", "Auto Manufacturers", new BigDecimal("248.42"), 790000000000L),
                createStock("NVDA", "NVIDIA Corp.", "NASDAQ", "Technology", "Semiconductors", new BigDecimal("875.28"), 2160000000000L),
                createStock("META", "Meta Platforms Inc.", "NASDAQ", "Technology", "Social Media", new BigDecimal("505.75"), 1290000000000L),
                createStock("JPM", "JPMorgan Chase & Co.", "NYSE", "Financial", "Banks", new BigDecimal("196.52"), 564000000000L),
                createStock("V", "Visa Inc.", "NYSE", "Financial", "Credit Services", new BigDecimal("281.40"), 577000000000L),
                createStock("WMT", "Walmart Inc.", "NYSE", "Consumer Defensive", "Retail", new BigDecimal("165.23"), 445000000000L),
                createStock("JNJ", "Johnson & Johnson", "NYSE", "Healthcare", "Pharmaceuticals", new BigDecimal("156.74"), 378000000000L),
                createStock("DIS", "Walt Disney Co.", "NYSE", "Communication", "Entertainment", new BigDecimal("111.85"), 204000000000L)
            );
            stockRepository.saveAll(stocks);

            // Seed historical prices for top stocks
            seedHistoricalPrices("AAPL", 189.84, 120);
            seedHistoricalPrices("GOOGL", 141.80, 120);
            seedHistoricalPrices("MSFT", 378.91, 120);
            seedHistoricalPrices("NVDA", 875.28, 120);
            seedHistoricalPrices("TSLA", 248.42, 120);
            seedHistoricalPrices("AMZN", 186.49, 120);

            log.info("Sample data seeded: {} stocks with historical prices", stocks.size());
        }
    }

    private Stock createStock(String symbol, String name, String exchange, String sector, String industry,
                               BigDecimal price, long marketCap) {
        Random rand = new Random(symbol.hashCode());
        BigDecimal prevClose = price.multiply(BigDecimal.valueOf(1 - (rand.nextDouble() * 0.03 - 0.015)));
        return Stock.builder()
                .symbol(symbol).name(name).exchange(exchange).sector(sector).industry(industry)
                .currentPrice(price).previousClose(prevClose.setScale(2, RoundingMode.HALF_UP))
                .dayHigh(price.multiply(BigDecimal.valueOf(1.02)).setScale(2, RoundingMode.HALF_UP))
                .dayLow(price.multiply(BigDecimal.valueOf(0.98)).setScale(2, RoundingMode.HALF_UP))
                .weekHigh52(price.multiply(BigDecimal.valueOf(1.25)).setScale(2, RoundingMode.HALF_UP))
                .weekLow52(price.multiply(BigDecimal.valueOf(0.75)).setScale(2, RoundingMode.HALF_UP))
                .marketCap(marketCap)
                .volume((long)(rand.nextDouble() * 50000000 + 10000000))
                .avgVolume((long)(rand.nextDouble() * 40000000 + 15000000))
                .peRatio(BigDecimal.valueOf(rand.nextDouble() * 40 + 10).setScale(2, RoundingMode.HALF_UP))
                .eps(BigDecimal.valueOf(rand.nextDouble() * 15 + 2).setScale(2, RoundingMode.HALF_UP))
                .dividendYield(BigDecimal.valueOf(rand.nextDouble() * 3).setScale(2, RoundingMode.HALF_UP))
                .beta(BigDecimal.valueOf(rand.nextDouble() * 1.5 + 0.5).setScale(2, RoundingMode.HALF_UP))
                .build();
    }

    private void seedHistoricalPrices(String symbol, double currentPrice, int days) {
        List<StockPrice> prices = new ArrayList<>();
        Random rand = new Random(symbol.hashCode());
        double price = currentPrice * 0.85;

        for (int i = days; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            if (date.getDayOfWeek().getValue() > 5) continue;

            double change = (rand.nextDouble() - 0.48) * price * 0.03;
            price = Math.max(price + change, price * 0.5);
            double open = price * (1 + (rand.nextDouble() - 0.5) * 0.01);
            double high = Math.max(price, open) * (1 + rand.nextDouble() * 0.02);
            double low = Math.min(price, open) * (1 - rand.nextDouble() * 0.02);

            prices.add(StockPrice.builder()
                    .symbol(symbol).date(date)
                    .open(BigDecimal.valueOf(open).setScale(2, RoundingMode.HALF_UP))
                    .high(BigDecimal.valueOf(high).setScale(2, RoundingMode.HALF_UP))
                    .low(BigDecimal.valueOf(low).setScale(2, RoundingMode.HALF_UP))
                    .close(BigDecimal.valueOf(price).setScale(2, RoundingMode.HALF_UP))
                    .adjustedClose(BigDecimal.valueOf(price).setScale(2, RoundingMode.HALF_UP))
                    .volume((long)(rand.nextDouble() * 50000000 + 5000000))
                    .build());
        }
        stockPriceRepository.saveAll(prices);
    }

    public List<Stock> searchStocks(String query) {
        if (query == null || query.isBlank()) {
            return stockRepository.findAll();
        }
        return stockRepository.searchBySymbolOrName(query);
    }

    public Stock getStockBySymbol(String symbol) {
        return stockRepository.findBySymbol(symbol.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found: " + symbol));
    }

    public List<StockPrice> getStockHistory(String symbol, int days) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days);
        return stockPriceRepository.findBySymbolAndDateBetweenOrderByDateAsc(symbol.toUpperCase(), startDate, endDate);
    }

    public List<StockPrice> getRecentPrices(String symbol, int limit) {
        return stockPriceRepository.findBySymbolOrderByDateDesc(symbol.toUpperCase(), PageRequest.of(0, limit));
    }
}
