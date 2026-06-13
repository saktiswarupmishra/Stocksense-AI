package com.stocksense.service;

import com.stocksense.dto.AuthDTO;
import com.stocksense.exception.DuplicateResourceException;
import com.stocksense.exception.ResourceNotFoundException;
import com.stocksense.model.User;
import com.stocksense.repository.UserRepository;
import com.stocksense.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    public AuthDTO.AuthResponse register(AuthDTO.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email is already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .authProvider(User.AuthProvider.LOCAL)
                .build();

        user = userRepository.save(user);
        log.info("New user registered: {}", user.getEmail());

        String token = tokenProvider.generateTokenFromEmail(user.getEmail());
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        AuthDTO.UserInfo userInfo = new AuthDTO.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getAvatarUrl());

        return new AuthDTO.AuthResponse(token, refreshToken, userInfo);
    }

    public AuthDTO.AuthResponse login(AuthDTO.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        AuthDTO.UserInfo userInfo = new AuthDTO.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getAvatarUrl());

        log.info("User logged in: {}", user.getEmail());
        return new AuthDTO.AuthResponse(token, refreshToken, userInfo);
    }

    public AuthDTO.AuthResponse processGoogleOAuth(String email, String name, String avatarUrl) {
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .avatarUrl(avatarUrl)
                    .authProvider(User.AuthProvider.GOOGLE)
                    .build();
            return userRepository.save(newUser);
        });

        String token = tokenProvider.generateTokenFromEmail(user.getEmail());
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        AuthDTO.UserInfo userInfo = new AuthDTO.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getAvatarUrl());

        return new AuthDTO.AuthResponse(token, refreshToken, userInfo);
    }

    public User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
