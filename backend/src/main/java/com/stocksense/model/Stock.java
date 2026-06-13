package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "stocks")
@CompoundIndex(name = "symbol_exchange", def = "{'symbol': 1, 'exchange': 1}", unique = true)
public class Stock {

    @Id
    private String id;

    @Indexed(unique = true)
    private String symbol;

    private String name;
    private String exchange;
    private String sector;
    private String industry;
    private String description;
    private String logoUrl;

    private BigDecimal currentPrice;
    private BigDecimal previousClose;
    private BigDecimal dayHigh;
    private BigDecimal dayLow;
    private BigDecimal weekHigh52;
    private BigDecimal weekLow52;
    private Long marketCap;
    private Long volume;
    private Long avgVolume;
    private BigDecimal peRatio;
    private BigDecimal eps;
    private BigDecimal dividendYield;
    private BigDecimal beta;
}
