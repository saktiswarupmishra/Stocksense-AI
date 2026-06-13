package com.stocksense.controller;

import com.stocksense.dto.PortfolioDTO;
import com.stocksense.model.Portfolio;
import com.stocksense.model.Transaction;
import com.stocksense.model.User;
import com.stocksense.service.AuthService;
import com.stocksense.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final AuthService authService;

    public PortfolioController(PortfolioService portfolioService, AuthService authService) {
        this.portfolioService = portfolioService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<Portfolio> create(@AuthenticationPrincipal UserDetails userDetails,
                                             @Valid @RequestBody PortfolioDTO.CreateRequest request) {
        User user = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(portfolioService.createPortfolio(user.getId(), request));
    }

    @GetMapping
    public ResponseEntity<List<Portfolio>> getAll(@AuthenticationPrincipal UserDetails userDetails) {
        User user = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(portfolioService.getUserPortfolios(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getOne(@PathVariable String id) {
        return ResponseEntity.ok(portfolioService.getPortfolio(id));
    }

    @PostMapping("/transaction")
    public ResponseEntity<Transaction> transact(@AuthenticationPrincipal UserDetails userDetails,
                                                 @Valid @RequestBody PortfolioDTO.TransactionRequest request) {
        User user = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(portfolioService.executeTransaction(user.getId(), request));
    }

    @GetMapping("/{id}/transactions")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable String id) {
        return ResponseEntity.ok(portfolioService.getTransactions(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        portfolioService.deletePortfolio(id);
        return ResponseEntity.noContent().build();
    }
}
