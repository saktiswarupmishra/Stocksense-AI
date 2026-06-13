package com.stocksense.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String password;
    private String name;
    private String avatarUrl;

    @Builder.Default
    private Set<Role> roles = new HashSet<>(Set.of(Role.USER));

    @Builder.Default
    private AuthProvider authProvider = AuthProvider.LOCAL;

    private String oauthProviderId;

    @Builder.Default
    private boolean enabled = true;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public enum Role {
        USER, ADMIN, PREMIUM
    }

    public enum AuthProvider {
        LOCAL, GOOGLE
    }
}
