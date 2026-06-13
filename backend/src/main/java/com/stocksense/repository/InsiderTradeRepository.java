package com.stocksense.repository;

import com.stocksense.model.InsiderTrade;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface InsiderTradeRepository extends MongoRepository<InsiderTrade, String> {
    List<InsiderTrade> findBySymbolOrderByTransactionDateDesc(String symbol);
    List<InsiderTrade> findTop50ByOrderByTransactionDateDesc();
}
