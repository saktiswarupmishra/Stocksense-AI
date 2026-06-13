package com.stocksense.repository;

import com.stocksense.model.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface WatchlistRepository extends MongoRepository<Watchlist, String> {
    List<Watchlist> findByUserId(String userId);
}
