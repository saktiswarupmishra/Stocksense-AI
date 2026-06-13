package com.stocksense.controller;

import com.stocksense.model.IPO;
import com.stocksense.repository.IPORepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ipo")
public class IPOController {

    private final IPORepository ipoRepository;

    public IPOController(IPORepository ipoRepository) {
        this.ipoRepository = ipoRepository;
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<IPO>> getUpcoming() {
        return ResponseEntity.ok(ipoRepository.findByOpenDateAfterOrderByOpenDateAsc(LocalDate.now().minusDays(30)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IPO> getById(@PathVariable String id) {
        return ResponseEntity.ok(ipoRepository.findById(id).orElseThrow());
    }
}
