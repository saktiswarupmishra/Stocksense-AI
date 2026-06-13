package com.stocksense.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@EnableMongoAuditing
public class AppConfig {

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    @Bean
    public WebClient aiServiceClient(WebClient.Builder builder,
                                      @org.springframework.beans.factory.annotation.Value("${app.ai-service.base-url}") String aiServiceUrl) {
        return builder
                .baseUrl(aiServiceUrl)
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024))
                .build();
    }
}
