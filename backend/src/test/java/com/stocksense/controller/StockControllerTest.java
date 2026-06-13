package com.stocksense.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stocksense.model.Stock;
import com.stocksense.service.StockService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.bean.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class StockControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private StockService stockService;

    @Test
    void searchStocks_ReturnsResults() throws Exception {
        Stock apple = Stock.builder().symbol("AAPL").name("Apple Inc.")
                .currentPrice(new BigDecimal("189.84")).build();
        when(stockService.searchStocks("AAPL")).thenReturn(List.of(apple));

        mockMvc.perform(get("/api/stocks/search?q=AAPL"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].symbol").value("AAPL"));
    }

    @Test
    void getStock_ReturnsStock() throws Exception {
        Stock apple = Stock.builder().symbol("AAPL").name("Apple Inc.")
                .currentPrice(new BigDecimal("189.84")).build();
        when(stockService.getStockBySymbol("AAPL")).thenReturn(apple);

        mockMvc.perform(get("/api/stocks/AAPL"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Apple Inc."));
    }
}
