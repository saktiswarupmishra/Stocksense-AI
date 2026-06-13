'use client';

import { useState } from 'react';
import { MicrophoneIcon, SpeakerWaveIcon, StopIcon } from '@heroicons/react/24/outline';

export default function VoicePage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const toggleListening = () => {
    if (listening) {
      setListening(false);
      setTranscript('What is the current price of Apple stock?');
      setResponse('Apple Inc. (AAPL) is currently trading at $189.84, up 1.25% today. The stock hit a day high of $191.45 and has a market cap of $2.94 trillion. The RSI is at 62.4, suggesting neutral-to-bullish momentum.');
    } else {
      setListening(true);
      setTranscript('');
      setResponse('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] animate-fade-in">
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <MicrophoneIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Voice Stock Assistant</h1>
        </div>

        {/* Microphone Button */}
        <button onClick={toggleListening}
          className={`relative w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-all ${
            listening
              ? 'bg-loss/20 border-2 border-loss animate-pulse-soft'
              : 'bg-gradient-to-br from-primary-500 to-purple-600 hover:scale-105'
          }`}>
          {listening
            ? <StopIcon className="w-12 h-12 text-loss" />
            : <MicrophoneIcon className="w-12 h-12 text-white" />
          }
          {listening && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-loss/30 animate-ping" />
              <div className="absolute -inset-4 rounded-full border border-loss/10 animate-ping" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </button>

        <p className="mt-4 text-sm text-[var(--muted)]">
          {listening ? 'Listening... Tap to stop' : 'Tap to start speaking'}
        </p>

        {/* Transcript */}
        {transcript && (
          <div className="mt-8 glass-card p-4 text-left" style={{ cursor: 'default' }}>
            <p className="text-xs text-[var(--muted)] font-medium mb-1">You said:</p>
            <p className="text-sm font-medium">{transcript}</p>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="mt-4 glass-card p-4 text-left" style={{ cursor: 'default' }}>
            <div className="flex items-center gap-2 mb-2">
              <SpeakerWaveIcon className="w-4 h-4 text-primary-500" />
              <p className="text-xs text-[var(--muted)] font-medium">AI Response:</p>
            </div>
            <p className="text-sm">{response}</p>
          </div>
        )}

        {/* Sample Commands */}
        <div className="mt-8">
          <p className="text-xs text-[var(--muted)] mb-3">Try saying:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['"What\'s the price of Tesla?"', '"Analyze NVDA"', '"Should I buy MSFT?"', '"Market summary"'].map((cmd) => (
              <span key={cmd} className="px-3 py-1.5 rounded-lg bg-[var(--muted-bg)] text-xs text-[var(--muted)]">{cmd}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
