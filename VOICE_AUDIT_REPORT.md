# Agentforce Voice Data Audit Report
**Date:** 2026-04-16  
**Auditor:** Claude Code  
**Source:** Official Salesforce Documentation (MCP)

## ✅ What Was VERIFIED and KEPT

All information below comes from official Salesforce Help documentation accessed via MCP:

### Core Information (Source: ai.agentforce_voice.htm)
- **Tagline:** "Voice conversations for Agentforce Service agents"
- **Description:** Uses speech-to-text models (e.g. Deepgram), Flash Planner with OpenAI GPT, text-to-speech models (e.g. ElevenLabs)
- **Prerequisite:** Service Cloud Voice required
- **Language:** English only
- **Concurrent Calls:** 500 per org maximum
- **Data Retention:** Zero data retention by LLM providers
- **Routing:** PSTN or SIP

### Verified Features
1. **Speech-to-Text** - Models such as Deepgram
2. **LLM Reasoning** - Flash Planner with OpenAI GPT
3. **Text-to-Speech** - Models such as ElevenLabs
4. **Key-term Prompting** - Up to 100 keywords (ai.agent_configure_voice_settings.htm)
5. **Pronunciation Dictionary** - IPA and CMU support (ai.agent_configure_voice_settings.htm)
6. **Voice Tuning** - Speed, similarity, stability controls (ai.agent_configure_voice_settings.htm)
7. **Zero Data Retention** - Enforced by all providers (ai.agentforce_voice.htm)
8. **Failover Strategy** - Automatic failover to provider infrastructure (ai.agentforce_voice.htm)
9. **PSTN Routing** - Traditional phone networks (rn_agentforce_voice_with_sip.htm)
10. **SIP Routing** - Session Initiation Protocol (rn_agentforce_voice_with_sip.htm)
11. **Omni-Channel Routing** - Flow-based routing (ai.agent_call_routing_escalation.htm)
12. **Omni Supervisor Monitoring** - Real-time transcript monitoring (ai.monitor_voice_enabled_agents.htm)

### Verified Links (All Working)
- Main docs: https://help.salesforce.com/s/articleView?id=ai.agentforce_voice.htm&type=5
- Setup: https://help.salesforce.com/s/articleView?id=ai.agent_connect_telephony_parent.htm&type=5
- Voice Settings: https://help.salesforce.com/s/articleView?id=ai.agent_configure_voice_settings.htm&type=5
- Monitoring: https://help.salesforce.com/s/articleView?id=ai.monitor_voice_enabled_agents.htm&type=5

### Verified Releases (6 releases from official release notes)
1. English launch (Oct 13, 2025)
2. Billing usage types (Oct 24, 2025)
3. Enable service agents (Winter '26)
4. Key-term prompting (Dec 15, 2025)
5. Voice minutes usage (Release 260)
6. SIP routing (Mar 30, 2026)

---

## ❌ What Was REMOVED (Unverified/Made-up)

### Deleted Structure
- ❌ **Entire parent/children hierarchy** (Voice Engine, Voice Configuration, Telephony Integration, Operations & Monitoring)
- ❌ **"How It Works" flow diagrams** (2 sections removed from App.jsx)
- ❌ **70+ fake documentation links** with `id=sf.*` prefix (all 404 errors)

### Deleted Technical Claims (Not in Official Docs)
- ❌ Specific model versions: "Deepgram Nova-2", "ElevenLabs Turbo v2.5"
- ❌ Latency numbers: "<200ms", "<300ms", "<500ms end-to-end"
- ❌ Accuracy percentages: "95%+ transcription accuracy"
- ❌ Codec details: "G.711, G.729, Opus, G.722"
- ❌ Voice tuning specific ranges: "0.5x-2.0x", "0-100"
- ❌ Granularity claims: "0.1x increments"
- ❌ Default values: "1.0x speed", "50 stability", "75 similarity"
- ❌ Marketing terms: "Multi-region", "Cloud-native", "HD Voice", "Wideband"

### Deleted Features (Not Documented)
- ❌ **Real-time Alerts** - Automated notifications for low confidence/failures (DOES NOT EXIST)
- ❌ **Voice Settings API** - Programmatic configuration via REST API
- ❌ **Compliance Exports** - Scheduled exports with PGP encryption
- ❌ **Usage Analytics** - Detailed metrics dashboards
- ❌ **Call Recording with specific specs** - Storage, retention, encryption details

### Deleted Use Cases (Too Specific/Unverified)
- ❌ "Appointment booking and cancellation over the phone"
- ❌ "Order status inquiries with real-time data lookup"
- ❌ "Account balance and payment questions"
- ❌ "Technical support triage before human escalation"
- ❌ "Multi-turn conversations with context retention"

Replaced with generic verified use cases from official docs.

### Deleted Partner Details
- ❌ Amazon Connect specific specs: "Multi-region", "Built-in failover"
- ❌ Genesys Cloud specs: "Cloud-native", "Automatic failover"
- ❌ CCaaS vendor certification claims

---

## 📊 Summary

| Metric | Before | After |
|---|---|---|
| Type | Parent with 4 children | Standalone tile |
| Lines of code | ~600 lines | ~100 lines |
| Features listed | 24+ features | 12 verified features |
| Documentation links | 70+ links (many 404) | 4 working links |
| Technical specs | 30+ made-up specs | 6 verified specs |
| Children tiles | 4 hierarchical | 0 (simple structure) |

---

## ✅ Verification Method

All kept information was verified using:
1. **Salesforce MCP** - `mcp__salesforce-docs__salesforce_docs_search`
2. **Document Fetch** - `mcp__salesforce-docs__salesforce_docs_fetch`
3. **Direct quotes** - Matched against official help.salesforce.com content
4. **Link validation** - All URLs tested to ensure they exist (not 404)

---

## 🎯 Result

**Agentforce Voice is now a clean, simple, verified-only tile** with:
- ✅ Only documented facts
- ✅ Only working links
- ✅ No speculative features
- ✅ No marketing fluff
- ✅ Easy to maintain

**Everything can be traced back to official Salesforce documentation.**
