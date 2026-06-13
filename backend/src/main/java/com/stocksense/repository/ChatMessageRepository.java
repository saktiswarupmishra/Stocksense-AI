package com.stocksense.repository;

import com.stocksense.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByUserIdAndSessionIdOrderByTimestampAsc(String userId, String sessionId);
    List<ChatMessage> findByUserIdOrderByTimestampDesc(String userId);
}
