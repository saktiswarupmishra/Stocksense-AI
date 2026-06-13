package com.stocksense.controller;

import com.stocksense.dto.ChatDTO;
import com.stocksense.model.ChatMessage;
import com.stocksense.model.User;
import com.stocksense.repository.ChatMessageRepository;
import com.stocksense.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;
    private final AuthService authService;
    private final WebClient aiServiceClient;

    public ChatController(ChatMessageRepository chatMessageRepository,
                          AuthService authService,
                          @Qualifier("aiServiceClient") WebClient aiServiceClient) {
        this.chatMessageRepository = chatMessageRepository;
        this.authService = authService;
        this.aiServiceClient = aiServiceClient;
    }

    @PostMapping
    public ResponseEntity<ChatDTO.ChatResponse> chat(
            @AuthenticationPrincipal UserDetails ud,
            @Valid @RequestBody ChatDTO.ChatRequest request) {
        User user = authService.getCurrentUser(ud.getUsername());
        String sessionId = request.getSessionId() != null ? request.getSessionId() : UUID.randomUUID().toString();

        // Save user message
        chatMessageRepository.save(ChatMessage.builder()
                .userId(user.getId()).sessionId(sessionId)
                .role(ChatMessage.MessageRole.USER).content(request.getMessage()).build());

        // Call AI service for RAG response
        String aiResponse;
        try {
            Map<?, ?> result = aiServiceClient.post()
                    .uri("/api/chat")
                    .bodyValue(Map.of("message", request.getMessage(), "session_id", sessionId))
                    .retrieve().bodyToMono(Map.class).block();
            aiResponse = result != null ? (String) result.get("response") : "I'm processing your request...";
        } catch (Exception e) {
            aiResponse = "I'm an AI stock assistant. I can help you analyze stocks, understand market trends, and answer financial questions. The AI service is currently initializing — please try again shortly.";
        }

        // Save assistant message
        chatMessageRepository.save(ChatMessage.builder()
                .userId(user.getId()).sessionId(sessionId)
                .role(ChatMessage.MessageRole.ASSISTANT).content(aiResponse).build());

        return ResponseEntity.ok(new ChatDTO.ChatResponse(sessionId, aiResponse, new String[]{}));
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChatMessage>> getHistory(
            @AuthenticationPrincipal UserDetails ud,
            @RequestParam(required = false) String sessionId) {
        User user = authService.getCurrentUser(ud.getUsername());
        if (sessionId != null) {
            return ResponseEntity.ok(chatMessageRepository.findByUserIdAndSessionIdOrderByTimestampAsc(user.getId(), sessionId));
        }
        return ResponseEntity.ok(chatMessageRepository.findByUserIdOrderByTimestampDesc(user.getId()));
    }
}
