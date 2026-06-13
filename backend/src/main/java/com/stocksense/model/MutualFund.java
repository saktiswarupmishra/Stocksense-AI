package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "mutual_funds")
public class MutualFund {

    @Id
    private String id;

    private String name;
    private String symbol;
    private String category;
    private String fundFamily;
    private BigDecimal nav;
    private BigDecimal aum;
    private BigDecimal expenseRatio;
    private BigDecimal minInvestment;
    private String riskLevel;
    private int morningstarRating;

    /** Returns map: "1y" -> 12.5, "3y" -> 8.2, "5y" -> 10.1 */
    private Map<String, BigDecimal> returns;

    /** Top holdings as symbol -> allocation% */
    private Map<String, BigDecimal> topHoldings;

    /** Sector allocation as sector -> percentage */
    private Map<String, BigDecimal> sectorAllocation;
}
