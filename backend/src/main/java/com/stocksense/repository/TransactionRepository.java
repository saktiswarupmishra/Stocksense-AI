package com.stocksense.repository;

import com.stocksense.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByPortfolioIdOrderByCreatedAtDesc(String portfolioId);
    List<Transaction> findByUserIdOrderByCreatedAtDesc(String userId);
}
