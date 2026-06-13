package com.stocksense.repository;

import com.stocksense.model.Stock;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface StockRepository extends MongoRepository<Stock, String> {
    Optional<Stock> findBySymbol(String symbol);
    
    @Query("{'$or': [{'symbol': {$regex: ?0, $options: 'i'}}, {'name': {$regex: ?0, $options: 'i'}}]}")
    List<Stock> searchBySymbolOrName(String query);
    
    List<Stock> findBySector(String sector);
    List<Stock> findByExchange(String exchange);
}
