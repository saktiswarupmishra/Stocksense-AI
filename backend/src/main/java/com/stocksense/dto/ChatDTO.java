package com.stocksense.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ChatDTO {

    @Data
    public static class ChatRequest {
        @NotBlank(message = "Message is required")
        private String message;
        private String sessionId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatResponse {
        private String sessionId;
        private String response;
        private String[] sources;
    }
}
