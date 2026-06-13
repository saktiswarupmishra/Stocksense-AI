package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "insider_trades")
public class InsiderTrade {

    @Id
    private String id;

    @Indexed
    private String symbol;

    private String companyName;
    private String insiderName;
    private String insiderTitle;
    private String relationship;
    private TradeType transactionType;
    private long shares;
    private BigDecimal pricePerShare;
    private BigDecimal totalValue;
    private long sharesOwned;
    private LocalDate transactionDate;
    private LocalDate filingDate;

    public enum TradeType {
        BUY, SELL, EXERCISE, GIFT
    }
}
