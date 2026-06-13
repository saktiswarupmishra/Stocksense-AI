package com.stocksense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

public class WatchlistDTO {

    @Data
    public static class CreateRequest {
        @NotBlank(message = "Watchlist name is required")
        private String name;
        private List<String> symbols;
    }

    @Data
    public static class AddSymbolRequest {
        @NotBlank(message = "Symbol is required")
        private String symbol;
    }

    @Data
    public static class AlertRequest {
        @NotBlank(message = "Watchlist ID is required")
        private String watchlistId;

        @NotBlank(message = "Symbol is required")
        private String symbol;

        @NotNull(message = "Target price is required")
        @Positive(message = "Target price must be positive")
        private BigDecimal targetPrice;

        @NotBlank(message = "Direction is required (ABOVE or BELOW)")
        private String direction;
    }
}
