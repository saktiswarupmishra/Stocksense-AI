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
@Document(collection = "watchlists")
public class Watchlist {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String name;

    @Builder.Default
    private List<String> symbols = new ArrayList<>();

    @Builder.Default
    private List<Alert> alerts = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Alert {
        private String id;
        private String symbol;
        private BigDecimal targetPrice;
        private AlertDirection direction;
        private boolean triggered;
        private Instant triggeredAt;
        private Instant createdAt;
    }

    public enum AlertDirection {
        ABOVE, BELOW
    }
}
