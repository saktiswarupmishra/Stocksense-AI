package com.stocksense.controller;

import com.stocksense.model.MutualFund;
import com.stocksense.repository.MutualFundRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mutual-funds")
public class MutualFundController {

    private final MutualFundRepository mutualFundRepository;

    public MutualFundController(MutualFundRepository mutualFundRepository) {
        this.mutualFundRepository = mutualFundRepository;
    }

    @GetMapping
    public ResponseEntity<List<MutualFund>> getAll(@RequestParam(required = false) String category) {
        if (category != null) {
            return ResponseEntity.ok(mutualFundRepository.findByCategory(category));
        }
        return ResponseEntity.ok(mutualFundRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MutualFund> getById(@PathVariable String id) {
        return ResponseEntity.ok(mutualFundRepository.findById(id).orElseThrow());
    }
}
