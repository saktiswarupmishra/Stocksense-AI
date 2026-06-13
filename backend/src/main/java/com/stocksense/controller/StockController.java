package com.stocksense.controller;

import com.stocksense.model.Stock;
import com.stocksense.model.StockPrice;
import com.stocksense.service.StockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Stock>> searchStocks(@RequestParam(defaultValue = "") String q) {
        return ResponseEntity.ok(stockService.searchStocks(q));
    }

    @GetMapping("/{symbol}")
    public ResponseEntity<Stock> getStock(@PathVariable String symbol) {
        return ResponseEntity.ok(stockService.getStockBySymbol(symbol));
    }

    @GetMapping("/{symbol}/history")
    public ResponseEntity<List<StockPrice>> getHistory(
            @PathVariable String symbol,
            @RequestParam(defaultValue = "90") int days) {
        return ResponseEntity.ok(stockService.getStockHistory(symbol, days));
    }
}
