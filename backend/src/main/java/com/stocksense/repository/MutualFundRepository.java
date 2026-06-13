package com.stocksense.repository;

import com.stocksense.model.MutualFund;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MutualFundRepository extends MongoRepository<MutualFund, String> {
    List<MutualFund> findByCategory(String category);
    List<MutualFund> findByFundFamily(String fundFamily);
}
