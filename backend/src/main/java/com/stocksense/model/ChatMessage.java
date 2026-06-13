package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chat_messages")
public class ChatMessage {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String sessionId;
    private MessageRole role;
    private String content;

    @CreatedDate
    private Instant timestamp;

    public enum MessageRole {
        USER, ASSISTANT, SYSTEM
    }
}
