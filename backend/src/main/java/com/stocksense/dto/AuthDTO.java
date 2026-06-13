package com.stocksense.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

public class AuthDTO {

    @Data
    public static class RegisterRequest {
        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        private String password;
    }

    @Data
    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String refreshToken;
        private String type = "Bearer";
        private UserInfo user;

        public AuthResponse(String token, String refreshToken, UserInfo user) {
            this.token = token;
            this.refreshToken = refreshToken;
            this.user = user;
        }
    }

    @Data
    public static class UserInfo {
        private String id;
        private String name;
        private String email;
        private String avatarUrl;

        public UserInfo(String id, String name, String email, String avatarUrl) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.avatarUrl = avatarUrl;
        }
    }

    @Data
    public static class GoogleOAuthRequest {
        @NotBlank
        private String idToken;
    }
}
