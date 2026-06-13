package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "portfolios")
public class Portfolio {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String name;
    private String description;

    @Builder.Default
    private List<Holding> holdings = new ArrayList<>();

    private BigDecimal totalInvested;
    private BigDecimal currentValue;
    private BigDecimal totalPnL;
    private BigDecimal totalPnLPercent;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Holding {
        private String symbol;
        private String stockName;
        private int quantity;
        private BigDecimal avgBuyPrice;
        private BigDecimal currentPrice;
        private BigDecimal investedValue;
        private BigDecimal currentValue;
        private BigDecimal pnl;
        private BigDecimal pnlPercent;
        private BigDecimal allocationPercent;
    }
}
