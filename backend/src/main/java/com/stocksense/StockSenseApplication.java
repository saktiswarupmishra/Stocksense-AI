package com.stocksense;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StockSenseApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockSenseApplication.class, args);
    }
}
