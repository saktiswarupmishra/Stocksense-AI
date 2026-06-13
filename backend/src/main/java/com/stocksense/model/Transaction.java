package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;

    @Indexed
    private String portfolioId;

    @Indexed
    private String userId;

    private String symbol;
    private String stockName;
    private TransactionType type;
    private int quantity;
    private BigDecimal price;
    private BigDecimal totalAmount;
    private String notes;

    @CreatedDate
    private Instant createdAt;

    public enum TransactionType {
        BUY, SELL
    }
}
