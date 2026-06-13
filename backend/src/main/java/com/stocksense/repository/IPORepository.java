package com.stocksense.repository;

import com.stocksense.model.IPO;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.List;

public interface IPORepository extends MongoRepository<IPO, String> {
    List<IPO> findByStatusOrderByOpenDateAsc(IPO.IPOStatus status);
    List<IPO> findByOpenDateAfterOrderByOpenDateAsc(LocalDate date);
}
