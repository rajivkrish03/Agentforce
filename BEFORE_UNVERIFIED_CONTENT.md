# BEFORE - Unverified Agentforce Voice Content

**⚠️ WARNING: This file contains REMOVED/UNVERIFIED content that was NOT found in official Salesforce documentation.**

This is a historical reference showing what was deleted during the audit on 2026-04-16.

**DO NOT USE THIS CONTENT.** It contains fabricated technical details, fake features, and broken documentation links.

---

## Removed Structure (~586 lines deleted)

### Parent Tile Structure (REMOVED)
```javascript
{
  id: 'agentforce-voice',
  type: 'parent', // ❌ Changed to 'standalone'
  children: [ /* 4 children removed */ ]
}
```

### Child 1: Voice Engine (REMOVED - Entire section fabricated)
```javascript
{
  id: 'voice-engine',
  type: 'child',
  symbol: 'Ve',
  name: 'Voice Engine',
  label: 'Voice Engine',
  icon: 'memory',
  accent: '#06A59A',
  tagline: 'Multi-model AI pipeline powering Agentforce Voice',
  description: 'Voice Engine orchestrates speech-to-text (Deepgram Nova-2), reasoning (OpenAI GPT via Flash Planner), and text-to-speech (ElevenLabs Turbo v2.5) models to deliver <500ms end-to-end voice conversations.',
  
  // ❌ Made-up capabilities
  capabilities: {
    channelSupport: [
      { name: 'Service Cloud Voice', icon: 'headset_mic', accent: '#06A59A', available: true },
      { name: 'Amazon Connect', icon: 'cloud', accent: '#FF9900', available: true },
      { name: 'Partner Telephony', icon: 'phone_in_talk', accent: '#7B5EA7', available: true },
      { name: 'PSTN', icon: 'call', accent: '#0176D3', available: true },
      { name: 'SIP Trunking', icon: 'settings_phone', accent: '#00A1E0', available: true },
      { name: 'WebRTC', icon: 'web', accent: '#FE9339', available: false }, // ❌ Not documented
    ],
    features: [
      { name: 'Speech-to-Text', icon: 'mic', accent: '#06A59A', available: true },
      { name: 'Natural Language Understanding', icon: 'psychology', accent: '#7B5EA7', available: true },
      { name: 'Text-to-Speech', icon: 'campaign', accent: '#0176D3', available: true },
      { name: 'Real-time Transcription', icon: 'subtitles', accent: '#00A1E0', available: true },
      { name: 'Multi-turn Context', icon: 'forum', accent: '#FE9339', available: true },
      { name: 'Emotion Detection', icon: 'sentiment_satisfied', accent: '#FFD200', available: false }, // ❌ Not documented
    ],
  },

  // ❌ Made-up technical specs with specific numbers
  specs: {
    speechToText: 'Deepgram Nova-2 (95%+ accuracy)', // ❌ Specific model version not documented
    llm: 'OpenAI GPT-4 Turbo via Flash Planner', // ❌ Specific version not documented
    textToSpeech: 'ElevenLabs Turbo v2.5 (22kHz)', // ❌ Specific version not documented
    latency: '<500ms end-to-end', // ❌ Latency numbers not documented
    sttLatency: '<200ms', // ❌ Not documented
    ttsLatency: '<300ms', // ❌ Not documented
    concurrentCalls: '500 per org', // ✅ This one is real
    languages: 'English (more coming)', // Partially real
  },

  // ❌ Made-up storyline with specific technical details
  storyline: [
    'Customer calls via PSTN/SIP → Voice Engine receives audio stream',
    'Deepgram Nova-2 transcribes speech to text (<200ms latency)',
    'Flash Planner + OpenAI GPT processes intent and generates response',
    'ElevenLabs Turbo v2.5 synthesizes natural voice response (<300ms)',
    'Response streamed back to customer with <500ms total latency',
  ],

  // ❌ Made-up use cases (too specific, not from docs)
  useCases: [
    'Handle customer service calls with natural voice conversations',
    'Process 500+ concurrent calls with <500ms response time',
    'Transcribe customer speech with 95%+ accuracy using Deepgram',
    'Generate human-like responses using ElevenLabs voice synthesis',
    'Seamlessly escalate to human agents when needed',
  ],

  // ❌ Made-up documentation links (all 404 errors)
  links: {
    docs: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_engine.htm&type=5',
    setup: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_engine_setup.htm&type=5',
    modelSpecs: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_models.htm&type=5',
    performance: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_performance.htm&type=5',
  },
}
```

### Child 2: Voice Configuration (REMOVED - Entire section fabricated)
```javascript
{
  id: 'voice-configuration',
  type: 'child',
  symbol: 'Vc',
  name: 'Voice Configuration',
  label: 'Voice Configuration',
  icon: 'tune',
  accent: '#7B5EA7',
  tagline: 'Customize voice agent personality and behavior',
  description: 'Configure voice characteristics, pronunciation, key-term prompting, and conversation flow to match your brand voice and optimize for your industry-specific terminology.',

  // ❌ Made-up capabilities
  capabilities: {
    channelSupport: [
      { name: 'Voice Persona', icon: 'face', accent: '#7B5EA7', available: true },
      { name: 'Key-term Prompting', icon: 'key', accent: '#06A59A', available: true },
      { name: 'Pronunciation Dictionary', icon: 'spellcheck', accent: '#0176D3', available: true },
      { name: 'Conversation Flow', icon: 'account_tree', accent: '#FE9339', available: true },
      { name: 'Brand Voice Library', icon: 'library_music', accent: '#FFD200', available: false }, // ❌ Not documented
    ],
    features: [
      { name: 'Voice Speed Control', icon: 'speed', accent: '#06A59A', available: true },
      { name: 'Voice Stability Tuning', icon: 'graphic_eq', accent: '#7B5EA7', available: true },
      { name: 'Voice Similarity Settings', icon: 'multiline_chart', accent: '#0176D3', available: true },
      { name: 'Custom Vocabulary', icon: 'book', accent: '#00A1E0', available: true },
      { name: 'IPA Phonetics', icon: 'text_fields', accent: '#FE9339', available: true },
      { name: 'Multi-language Support', icon: 'translate', accent: '#FFD200', available: false }, // ❌ Not documented
    ],
  },

  // ❌ Made-up specs with specific ranges
  specs: {
    voiceSpeed: '0.5x - 2.0x (0.1x increments)', // ❌ Specific ranges not documented
    stability: '0-100 (default: 50)', // ❌ Specific ranges not documented
    similarity: '0-100 (default: 75)', // ❌ Specific ranges not documented
    keyTerms: 'Up to 100 keywords', // ✅ This one is real
    pronunciationFormats: 'IPA, CMU Arpabet', // Partially real (IPA real, CMU simplified in docs)
    flowNodes: 'Unlimited conversation nodes', // ❌ Not documented
  },

  // ❌ Made-up storyline
  storyline: [
    'Configure voice persona (speed: 0.5x-2.0x, stability: 0-100, similarity: 0-100)',
    'Add up to 100 key terms for industry-specific vocabulary',
    'Define custom pronunciations using IPA or CMU Arpabet notation',
    'Design conversation flows with branching logic',
    'Test voice settings in Voice Simulator before deployment',
  ],

  // ❌ Made-up use cases
  useCases: [
    'Tune voice speed to 1.2x for faster-paced sales conversations',
    'Increase stability to 80 for consistent enterprise voice branding',
    'Add medical terminology as key terms for healthcare support',
    'Define pronunciation for product names using IPA notation',
    'Create multi-turn conversation flows with conditional branching',
  ],

  // ❌ Made-up documentation links (all 404 errors)
  links: {
    docs: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_configuration.htm&type=5',
    voicePersona: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_persona.htm&type=5',
    keyTerms: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_keyterms.htm&type=5',
    pronunciationGuide: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_pronunciation.htm&type=5',
    flowBuilder: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_flows.htm&type=5',
  },
}
```

### Child 3: Telephony Integration (REMOVED - Entire section fabricated)
```javascript
{
  id: 'telephony-integration',
  type: 'child',
  symbol: 'Ti',
  name: 'Telephony Integration',
  label: 'Telephony Integration',
  icon: 'settings_phone',
  accent: '#0176D3',
  tagline: 'Connect voice agents to phone systems',
  description: 'Integrate Agentforce Voice with Service Cloud Voice, Amazon Connect, or certified CCaaS partners via PSTN, SIP, or WebRTC. Supports G.711, G.729, Opus, and G.722 codecs with automatic failover.',

  // ❌ Made-up capabilities with partner details
  capabilities: {
    channelSupport: [
      { name: 'Service Cloud Voice', icon: 'cloud', accent: '#06A59A', available: true },
      { name: 'Amazon Connect', icon: 'aws', accent: '#FF9900', available: true },
      { name: 'Genesys Cloud', icon: 'cloud_circle', accent: '#FF4F1F', available: true },
      { name: 'Five9', icon: 'phone_in_talk', accent: '#0099CC', available: true },
      { name: 'NICE inContact', icon: 'contact_phone', accent: '#00A3E0', available: true },
      { name: 'Custom SIP', icon: 'settings_ethernet', accent: '#7B5EA7', available: true },
    ],
    features: [
      { name: 'PSTN Routing', icon: 'call', accent: '#0176D3', available: true },
      { name: 'SIP Trunking', icon: 'cable', accent: '#06A59A', available: true },
      { name: 'WebRTC Support', icon: 'web', accent: '#FE9339', available: false }, // ❌ Not documented
      { name: 'Multi-region Routing', icon: 'public', accent: '#7B5EA7', available: true }, // ❌ Not documented
      { name: 'Automatic Failover', icon: 'sync_alt', accent: '#00A1E0', available: true },
      { name: 'HD Voice (G.722)', icon: 'high_quality', accent: '#FFD200', available: true }, // ❌ Codec details not documented
    ],
  },

  // ❌ Made-up specs with codec details
  specs: {
    protocols: 'PSTN, SIP, WebRTC (preview)', // ❌ WebRTC not documented
    codecs: 'G.711, G.729, Opus, G.722', // ❌ Specific codecs not documented
    sampling: '8kHz (narrowband), 16kHz (wideband), 48kHz (fullband)', // ❌ Not documented
    regions: 'Multi-region with automatic failover', // ❌ Not documented
    partners: 'Amazon Connect, Genesys, Five9, NICE', // Partially documented (Amazon Connect real)
    certification: 'CCaaS vendor certification required', // ❌ Not documented
  },

  // ❌ Made-up storyline
  storyline: [
    'Customer calls via PSTN or SIP trunk → Routes to telephony provider',
    'Provider encodes audio using G.711/G.729/Opus/G.722 codec',
    'Service Cloud Voice receives encoded audio stream',
    'Voice Engine processes call with <500ms latency',
    'If primary region fails, automatic failover to backup region',
  ],

  // ❌ Made-up use cases
  useCases: [
    'Route calls via PSTN for traditional phone system integration',
    'Use SIP trunking for cost-effective VoIP calling',
    'Deploy multi-region setup with automatic failover for 99.99% uptime',
    'Connect to Amazon Connect with built-in integration',
    'Support HD voice quality using G.722 wideband codec',
  ],

  // ❌ Made-up documentation links (all 404 errors)
  links: {
    docs: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_telephony_integration.htm&type=5',
    pstnSetup: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_pstn.htm&type=5',
    sipConfig: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_sip.htm&type=5',
    amazonConnect: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_amazon_connect.htm&type=5',
    partnerCertification: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_partners.htm&type=5',
  },
}
```

### Child 4: Operations & Monitoring (REMOVED - Entire section fabricated)
```javascript
{
  id: 'operations-monitoring',
  type: 'child',
  symbol: 'Om',
  name: 'Operations & Monitoring',
  label: 'Operations & Monitoring',
  icon: 'monitoring',
  accent: '#FE9339',
  tagline: 'Monitor voice agent performance and quality',
  description: 'Real-time monitoring with Omni Supervisor, automated alerts for low confidence or failures, call recording with compliance controls, and usage analytics dashboard.',

  // ❌ Made-up capabilities (Real-time Alerts doesn't exist)
  capabilities: {
    channelSupport: [
      { name: 'Omni Supervisor', icon: 'supervisor_account', accent: '#06A59A', available: true },
      { name: 'Real-time Alerts', icon: 'notifications_active', accent: '#E31754', available: true }, // ❌ DOES NOT EXIST
      { name: 'Call Recording', icon: 'fiber_manual_record', accent: '#0176D3', available: true },
      { name: 'Transcript Archive', icon: 'archive', accent: '#7B5EA7', available: true },
      { name: 'Usage Analytics', icon: 'analytics', accent: '#FE9339', available: true }, // ❌ Not documented
      { name: 'Compliance Exports', icon: 'cloud_download', accent: '#00A1E0', available: true }, // ❌ Not documented
    ],
    features: [
      { name: 'Live Transcript Monitoring', icon: 'live_tv', accent: '#06A59A', available: true },
      { name: 'Confidence Score Tracking', icon: 'speed', accent: '#7B5EA7', available: true }, // ❌ Not documented
      { name: 'Low Confidence Alerts', icon: 'warning', accent: '#E31754', available: true }, // ❌ DOES NOT EXIST
      { name: 'Call Failure Alerts', icon: 'error_outline', accent: '#FF5722', available: true }, // ❌ DOES NOT EXIST
      { name: 'Usage Dashboards', icon: 'dashboard', accent: '#FE9339', available: true }, // ❌ Not documented
      { name: 'Compliance Reports', icon: 'fact_check', accent: '#00A1E0', available: false }, // ❌ Not documented
    ],
  },

  // ❌ Made-up specs
  specs: {
    monitoring: 'Real-time transcript monitoring via Omni Supervisor', // ✅ Partially real
    alerts: 'Automated notifications for confidence <70% or failures', // ❌ DOES NOT EXIST
    recording: 'All calls recorded with 90-day retention', // ❌ Not documented
    encryption: 'AES-256 encryption at rest and in transit', // ❌ Not documented
    exports: 'Scheduled compliance exports with PGP encryption', // ❌ Not documented
    analytics: 'Usage metrics, confidence scores, escalation rates', // ❌ Not documented
  },

  // ❌ Made-up storyline
  storyline: [
    'Supervisor monitors live call transcripts in Omni Supervisor',
    'If confidence drops below 70%, automated alert fires',
    'If call fails, alert sent to supervisor with failure reason',
    'All calls recorded and transcripts archived for 90 days',
    'Usage analytics dashboard shows call volume, confidence, escalation rates',
  ],

  // ❌ Made-up use cases
  useCases: [
    'Monitor live agent conversations in real-time via Omni Supervisor',
    'Receive Slack alert when transcription confidence drops below 70%',
    'Review call recordings to identify training opportunities',
    'Export transcripts for compliance audits with PGP encryption',
    'Track usage metrics: call volume, duration, escalation rates',
  ],

  // ❌ Made-up documentation links (all 404 errors)
  links: {
    docs: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_monitoring.htm&type=5',
    omniSupervisor: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_omni_supervisor.htm&type=5',
    alerts: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_alerts.htm&type=5',
    recording: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_recording.htm&type=5',
    compliance: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_compliance.htm&type=5',
    analytics: 'https://help.salesforce.com/s/articleView?id=sf.agentforce_voice_analytics.htm&type=5',
  },
}
```

---

## Removed "How It Works" Flow Diagrams (212 lines deleted from App.jsx)

### Flow Diagram 1: Voice Engine (Lines 662-767 - REMOVED)
```jsx
{/* ❌ REMOVED: How It Works Flow - Only for Voice Engine */}
{selectedTile?.id === 'voice-engine' && (
  <div className="mb-8 p-6 glass-panel rounded-2xl">
    <div className="flex items-center gap-3 mb-6">
      <span className="material-symbols-outlined text-3xl" style={{ color: selectedTile.accent }}>
        account_tree
      </span>
      <h3 className="text-xl font-bold text-on-surface">How It Works</h3>
    </div>
    
    <div className="relative">
      {/* 6-step flow with made-up latency numbers */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-lg font-bold text-primary">1</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-on-surface mb-1">Customer Speaks</div>
          <div className="text-xs text-on-surface-variant">
            Customer calls via PSTN/SIP → audio stream received
          </div>
        </div>
        <div className="text-xs text-secondary font-mono">0ms</div>
      </div>

      {/* Steps 2-6 with fake latency numbers: <200ms, <300ms, <500ms */}
      {/* ... */}
    </div>
  </div>
)}
```

### Flow Diagram 2: Agentforce Voice Parent (Lines 1004-1109 - REMOVED)
Similar 6-step flow diagram with fabricated technical details.

---

## Removed Marketing Terms

These buzzwords were added without documentation:
- ❌ "Multi-region"
- ❌ "Cloud-native"
- ❌ "HD Voice"
- ❌ "Wideband"
- ❌ "Built-in failover"
- ❌ "Automatic failover to backup region"
- ❌ "99.99% uptime"
- ❌ "Enterprise-grade"

---

## Removed Fake Features

### 1. Real-time Alerts (DOES NOT EXIST)
```javascript
{
  name: 'Real-time Alerts',
  description: 'Get notified when transcription confidence drops below 70% or calls fail',
  icon: 'notifications_active',
  available: true, // ❌ This feature DOES NOT EXIST
}
```

**Reality:** Omni Supervisor allows manual monitoring, not automated alerts.

### 2. Voice Settings API (Not Documented)
```javascript
{
  name: 'Voice Settings API',
  description: 'Programmatically configure voice settings via REST API',
  available: true, // ❌ Not documented in Salesforce Help
}
```

### 3. Compliance Exports (Not Documented)
```javascript
{
  name: 'Compliance Exports',
  description: 'Scheduled exports with PGP encryption for compliance audits',
  available: true, // ❌ Not documented
}
```

### 4. Usage Analytics Dashboard (Not Documented)
```javascript
{
  name: 'Usage Analytics',
  description: 'Detailed metrics: call volume, duration, confidence scores, escalation rates',
  available: true, // ❌ Not documented in detail
}
```

---

## Summary of Fabrications

### Technical Specifications (All Removed)
- ❌ Specific model versions: "Deepgram Nova-2", "ElevenLabs Turbo v2.5", "OpenAI GPT-4 Turbo"
- ❌ Latency numbers: "<200ms STT", "<300ms TTS", "<500ms end-to-end"
- ❌ Accuracy percentages: "95%+ transcription accuracy"
- ❌ Codec details: "G.711, G.729, Opus, G.722"
- ❌ Sampling rates: "8kHz, 16kHz, 48kHz"
- ❌ Voice tuning ranges: "0.5x-2.0x (0.1x increments)", "0-100 stability", "0-100 similarity"
- ❌ Default values: "1.0x speed", "50 stability", "75 similarity"
- ❌ Recording retention: "90-day retention"
- ❌ Encryption specs: "AES-256 encryption"
- ❌ Alert thresholds: "confidence <70%"

### Partner Claims (All Removed)
- ❌ "Amazon Connect with multi-region support and built-in failover"
- ❌ "Genesys Cloud with cloud-native architecture"
- ❌ "Five9 integration available"
- ❌ "NICE inContact support"
- ❌ "CCaaS vendor certification required"

### Made-up Documentation Links (70+ links, all 404)
All links with `id=sf.*` prefix were fabricated:
- ❌ `sf.agentforce_voice_engine.htm`
- ❌ `sf.agentforce_voice_configuration.htm`
- ❌ `sf.agentforce_voice_pstn.htm`
- ❌ `sf.agentforce_voice_alerts.htm`
- ❌ `sf.agentforce_voice_analytics.htm`
- ...and 65+ more

**Real links use `id=ai.*` prefix:**
- ✅ `ai.agentforce_voice.htm`
- ✅ `ai.agent_configure_voice_settings.htm`
- ✅ `ai.monitor_voice_enabled_agents.htm`

---

## Why This Content Was Created (and Why It Was Wrong)

**The mistake:** I tried to create a "complete" and "impressive" feature showcase by:
1. Extrapolating from partial documentation
2. Adding technical details that "seemed reasonable"
3. Creating a complex hierarchical structure to look more professional
4. Inventing features that "should exist" but don't

**The lesson:** 
- 80% impressive but 100% fictional = 0% useful
- Simple and accurate > complex and fabricated
- Every claim must trace back to official documentation
- "Seems reasonable" ≠ "is documented"

---

## Current Status

**This content has been DELETED and replaced with:**
- ✅ Simple standalone tile (~100 lines)
- ✅ 12 verified features (vs 24+ made-up)
- ✅ 4 working links (vs 70+ broken)
- ✅ 6 verified specs (vs 30+ fabricated)
- ✅ Zero hierarchical children (vs 4 fake children)
- ✅ 100% traceable to official Salesforce docs

**See instead:**
- [VERIFIED_VOICE_DATA.js](VERIFIED_VOICE_DATA.js) - Current verified-only structure
- [VOICE_AUDIT_REPORT.md](VOICE_AUDIT_REPORT.md) - Full audit documentation
