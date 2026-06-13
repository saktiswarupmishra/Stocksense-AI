package com.stocksense.service;

import com.stocksense.dto.WatchlistDTO;
import com.stocksense.exception.ResourceNotFoundException;
import com.stocksense.model.Watchlist;
import com.stocksense.repository.WatchlistRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;

    public WatchlistService(WatchlistRepository watchlistRepository) {
        this.watchlistRepository = watchlistRepository;
    }

    public Watchlist createWatchlist(String userId, WatchlistDTO.CreateRequest request) {
        Watchlist wl = Watchlist.builder()
                .userId(userId).name(request.getName())
                .symbols(request.getSymbols() != null ? request.getSymbols() : new ArrayList<>())
                .alerts(new ArrayList<>()).build();
        return watchlistRepository.save(wl);
    }

    public List<Watchlist> getUserWatchlists(String userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public Watchlist addSymbol(String watchlistId, String symbol) {
        Watchlist wl = watchlistRepository.findById(watchlistId)
                .orElseThrow(() -> new ResourceNotFoundException("Watchlist not found"));
        if (!wl.getSymbols().contains(symbol.toUpperCase())) {
            wl.getSymbols().add(symbol.toUpperCase());
            watchlistRepository.save(wl);
        }
        return wl;
    }

    public Watchlist addAlert(WatchlistDTO.AlertRequest request) {
        Watchlist wl = watchlistRepository.findById(request.getWatchlistId())
                .orElseThrow(() -> new ResourceNotFoundException("Watchlist not found"));
        Watchlist.Alert alert = Watchlist.Alert.builder()
                .id(UUID.randomUUID().toString())
                .symbol(request.getSymbol().toUpperCase())
                .targetPrice(request.getTargetPrice())
                .direction(Watchlist.AlertDirection.valueOf(request.getDirection().toUpperCase()))
                .triggered(false).createdAt(Instant.now()).build();
        wl.getAlerts().add(alert);
        return watchlistRepository.save(wl);
    }

    public void deleteWatchlist(String id) {
        watchlistRepository.deleteById(id);
    }
}
