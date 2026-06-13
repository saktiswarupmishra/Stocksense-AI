package com.stocksense.repository;

import com.stocksense.model.StockPrice;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.List;

public interface StockPriceRepository extends MongoRepository<StockPrice, String> {
    List<StockPrice> findBySymbolAndDateBetweenOrderByDateAsc(String symbol, LocalDate start, LocalDate end);
    List<StockPrice> findBySymbolOrderByDateDesc(String symbol, Pageable pageable);
}
