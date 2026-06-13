package com.stocksense.controller;

import com.stocksense.model.InsiderTrade;
import com.stocksense.repository.InsiderTradeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insider")
public class InsiderTradeController {

    private final InsiderTradeRepository insiderTradeRepository;

    public InsiderTradeController(InsiderTradeRepository insiderTradeRepository) {
        this.insiderTradeRepository = insiderTradeRepository;
    }

    @GetMapping
    public ResponseEntity<List<InsiderTrade>> getRecent() {
        return ResponseEntity.ok(insiderTradeRepository.findTop50ByOrderByTransactionDateDesc());
    }

    @GetMapping("/{symbol}")
    public ResponseEntity<List<InsiderTrade>> getBySymbol(@PathVariable String symbol) {
        return ResponseEntity.ok(insiderTradeRepository.findBySymbolOrderByTransactionDateDesc(symbol.toUpperCase()));
    }
}
