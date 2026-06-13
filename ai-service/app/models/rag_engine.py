"""RAG engine for stock market chatbot using vector search."""

from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

# Pre-built knowledge base for stock market Q&A
KNOWLEDGE_BASE = [
    {"topic": "P/E Ratio", "content": "The Price-to-Earnings (P/E) ratio measures a company's current share price relative to its earnings per share. A high P/E may indicate overvaluation or high growth expectations. The average S&P 500 P/E is around 20-25."},
    {"topic": "Market Cap", "content": "Market capitalization is calculated by multiplying share price by total outstanding shares. Large-cap: >$10B, Mid-cap: $2-10B, Small-cap: <$2B. Larger companies tend to be less volatile."},
    {"topic": "RSI", "content": "Relative Strength Index (RSI) is a momentum oscillator (0-100). RSI above 70 indicates overbought conditions, below 30 indicates oversold. It helps identify potential reversal points."},
    {"topic": "MACD", "content": "Moving Average Convergence Divergence (MACD) shows the relationship between two EMAs. A bullish signal occurs when MACD crosses above the signal line. It helps identify trend changes."},
    {"topic": "Diversification", "content": "Diversification reduces portfolio risk by investing across different asset classes, sectors, and geographies. A well-diversified portfolio typically holds 20-30 stocks across 8+ sectors."},
    {"topic": "Dollar Cost Averaging", "content": "DCA involves investing a fixed amount regularly regardless of price. This strategy reduces the impact of volatility and removes the need to time the market."},
    {"topic": "Dividend Yield", "content": "Dividend yield is the annual dividend payment divided by stock price. A yield of 2-6% is typical. Very high yields may indicate financial distress. Dividend aristocrats have increased dividends for 25+ consecutive years."},
    {"topic": "Bull Market", "content": "A bull market is characterized by rising prices, typically defined as a 20%+ increase from recent lows. Bull markets historically last an average of 5-7 years."},
    {"topic": "Bear Market", "content": "A bear market occurs when prices fall 20%+ from recent highs. Bear markets last an average of 9-16 months. They often present buying opportunities for long-term investors."},
    {"topic": "ETF", "content": "Exchange-Traded Funds trade like stocks but hold a basket of securities. They offer diversification, low fees (0.03-0.50%), and tax efficiency. SPY tracks the S&P 500."},
    {"topic": "Options", "content": "Options give the right to buy (call) or sell (put) a stock at a set price. They can be used for hedging, income generation, or speculation. Options expire and can become worthless."},
    {"topic": "Bonds", "content": "Bonds are debt instruments that pay periodic interest. Government bonds are lower risk, corporate bonds offer higher yields. Bond prices move inversely to interest rates."},
]


class RAGEngine:
    """Retrieval-Augmented Generation engine for financial Q&A."""

    def __init__(self):
        self.knowledge = KNOWLEDGE_BASE
        logger.info("RAG Engine initialized with %d knowledge items", len(self.knowledge))

    def query(self, message: str, session_id: str = None) -> Dict:
        """Process a user query using RAG."""
        message_lower = message.lower()

        # Retrieve relevant knowledge
        relevant = self._retrieve(message_lower)

        # Generate response
        if relevant:
            context = "\n".join([f"- {item['topic']}: {item['content']}" for item in relevant[:3]])
            response = self._generate_response(message, relevant)
        else:
            response = self._general_response(message)

        return {
            "response": response,
            "sources": [item["topic"] for item in relevant[:3]],
            "session_id": session_id,
        }

    def _retrieve(self, query: str) -> List[Dict]:
        """Simple keyword-based retrieval (in production, use vector similarity)."""
        scored = []
        for item in self.knowledge:
            score = 0
            keywords = item["topic"].lower().split() + item["content"].lower().split()[:10]
            for word in query.split():
                if word in keywords:
                    score += 1
                if word in item["topic"].lower():
                    score += 3
            if score > 0:
                scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [item for _, item in scored[:5]]

    def _generate_response(self, query: str, context: List[Dict]) -> str:
        """Generate a response based on retrieved context."""
        main_topic = context[0]
        response = f"📊 **{main_topic['topic']}**\n\n{main_topic['content']}\n\n"

        if len(context) > 1:
            response += "**Related concepts:**\n"
            for item in context[1:3]:
                response += f"- **{item['topic']}**: {item['content'][:100]}...\n"

        response += "\n💡 *Feel free to ask follow-up questions about any of these topics!*"
        return response

    def _general_response(self, query: str) -> str:
        """Fallback response for unmatched queries."""
        return (
            "I'm your AI stock market assistant! I can help you with:\n\n"
            "📈 **Technical Analysis** — RSI, MACD, moving averages, candlestick patterns\n"
            "📊 **Fundamental Analysis** — P/E ratio, market cap, earnings, dividends\n"
            "💼 **Portfolio Strategy** — Diversification, asset allocation, rebalancing\n"
            "📚 **Market Education** — Bull/bear markets, ETFs, options, bonds\n\n"
            "Try asking about a specific concept, like 'What is the P/E ratio?' or 'Explain diversification'."
        )
