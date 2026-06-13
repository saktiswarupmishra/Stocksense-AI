package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ipos")
public class IPO {

    @Id
    private String id;

    private String companyName;
    private String symbol;
    private String exchange;
    private String sector;
    private String description;

    private BigDecimal priceRangeLow;
    private BigDecimal priceRangeHigh;
    private BigDecimal issuePrice;
    private Long sharesOffered;
    private BigDecimal expectedValuation;

    private LocalDate openDate;
    private LocalDate closeDate;
    private LocalDate listingDate;

    private IPOStatus status;
    private BigDecimal aiScore;
    private String aiRecommendation;
    private String aiAnalysis;

    public enum IPOStatus {
        UPCOMING, OPEN, CLOSED, LISTED
    }
}
