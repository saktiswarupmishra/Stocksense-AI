package com.stocksense.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

public class PortfolioDTO {

    @Data
    public static class CreateRequest {
        @NotBlank(message = "Portfolio name is required")
        private String name;
        private String description;
    }

    @Data
    public static class TransactionRequest {
        @NotBlank(message = "Portfolio ID is required")
        private String portfolioId;

        @NotBlank(message = "Symbol is required")
        private String symbol;

        @NotBlank(message = "Transaction type is required")
        private String type; // BUY or SELL

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        private BigDecimal price;

        private String notes;
    }

    @Data
    public static class RebalanceRequest {
        @NotBlank
        private String portfolioId;
        private String riskProfile; // CONSERVATIVE, MODERATE, AGGRESSIVE
        private BigDecimal targetReturn;
    }
}
