package com.stocksense.controller;

import com.stocksense.dto.WatchlistDTO;
import com.stocksense.model.User;
import com.stocksense.model.Watchlist;
import com.stocksense.service.AuthService;
import com.stocksense.service.WatchlistService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;
    private final AuthService authService;

    public WatchlistController(WatchlistService watchlistService, AuthService authService) {
        this.watchlistService = watchlistService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<Watchlist> create(@AuthenticationPrincipal UserDetails ud,
                                             @Valid @RequestBody WatchlistDTO.CreateRequest req) {
        User user = authService.getCurrentUser(ud.getUsername());
        return ResponseEntity.ok(watchlistService.createWatchlist(user.getId(), req));
    }

    @GetMapping
    public ResponseEntity<List<Watchlist>> getAll(@AuthenticationPrincipal UserDetails ud) {
        User user = authService.getCurrentUser(ud.getUsername());
        return ResponseEntity.ok(watchlistService.getUserWatchlists(user.getId()));
    }

    @PostMapping("/{id}/symbols")
    public ResponseEntity<Watchlist> addSymbol(@PathVariable String id,
                                                @Valid @RequestBody WatchlistDTO.AddSymbolRequest req) {
        return ResponseEntity.ok(watchlistService.addSymbol(id, req.getSymbol()));
    }

    @PostMapping("/alert")
    public ResponseEntity<Watchlist> addAlert(@Valid @RequestBody WatchlistDTO.AlertRequest req) {
        return ResponseEntity.ok(watchlistService.addAlert(req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        watchlistService.deleteWatchlist(id);
        return ResponseEntity.noContent().build();
    }
}
