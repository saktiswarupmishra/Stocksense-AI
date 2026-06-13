package com.stocksense.repository;

import com.stocksense.model.Portfolio;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PortfolioRepository extends MongoRepository<Portfolio, String> {
    List<Portfolio> findByUserId(String userId);
}
