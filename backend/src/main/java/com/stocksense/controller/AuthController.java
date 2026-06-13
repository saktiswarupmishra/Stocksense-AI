package com.stocksense.controller;

import com.stocksense.dto.AuthDTO;
import com.stocksense.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDTO.AuthResponse> register(@Valid @RequestBody AuthDTO.RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDTO.AuthResponse> login(@Valid @RequestBody AuthDTO.LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthDTO.AuthResponse> googleAuth(@Valid @RequestBody AuthDTO.GoogleOAuthRequest request) {
        // In production, verify the Google ID token and extract user info
        return ResponseEntity.ok(authService.processGoogleOAuth(
                "user@gmail.com", "Google User", null));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        var user = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(new AuthDTO.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getAvatarUrl()));
    }
}
