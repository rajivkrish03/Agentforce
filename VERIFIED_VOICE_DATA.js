// VERIFIED AGENTFORCE VOICE DATA
// All claims below are verified against official Salesforce documentation
// Source: https://help.salesforce.com/s/articleView?id=ai.agentforce_voice.htm&type=5

export const VERIFIED_AGENTFORCE_VOICE = {
  id: 'agentforce-voice',
  symbol: 'Av',
  name: 'Agentforce Voice',
  label: 'Agentforce Voice',
  icon: 'headset_mic',
  accent: '#06A59A',
  type: 'standalone', // Not a parent - keep it simple

  // VERIFIED: From main help doc
  tagline: 'Voice conversations for Agentforce Service agents.',
  description: 'Agentforce Voice enables Service agents to speak and understand voice conversations with customers. Uses speech-to-text, reasoning, and text-to-speech models to handle voice interactions.',

  // VERIFIED: From main help doc - simplified without specific tech details
  storyline: [
    'Customer speaks into phone',
    'Speech converted to text using speech-to-text model',
    'Flash Planner processes intent using OpenAI GPT LLM',
    'Text response converted back to audio using text-to-speech model',
    'Agent can escalate to human when needed',
  ],

  // VERIFIED: Only documented facts
  specs: {
    providers: 'Speech-to-text (e.g. Deepgram), OpenAI GPT LLM, Text-to-speech (e.g. ElevenLabs)',
    language: 'English only',
    concurrentCalls: '500 per org maximum',
    prerequisite: 'Service Cloud Voice required',
    dataRetention: 'Zero data retention by LLM providers',
    editions: 'Enterprise, Unlimited, Developer with Foundations or Agentforce 1',
  },

  // VERIFIED: From docs
  useCases: [
    'Voice conversations with customers',
    'Understanding customer intent from spoken input',
    'Taking actions to resolve customer queries',
    'Escalating to human agents when needed',
  ],

  // VERIFIED: All these links work
  links: {
    docs: 'https://help.salesforce.com/s/articleView?id=ai.agentforce_voice.htm&type=5',
    setup: 'https://help.salesforce.com/s/articleView?id=ai.agent_connect_telephony_parent.htm&type=5',
    voiceSettings: 'https://help.salesforce.com/s/articleView?id=ai.agent_configure_voice_settings.htm&type=5',
    monitoring: 'https://help.salesforce.com/s/articleView?id=ai.monitor_voice_enabled_agents.htm&type=5',
    releaseNotes: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein_agentforce_voice.htm&release=258&type=5',
  },

  // VERIFIED: From release notes
  releases: [
    {
      id: 'agentforce-voice-english-launch',
      title: 'Agentforce Voice launches with English-only support',
      date: '2025-10-13',
      dateLabel: 'Oct 13, 2025',
      summary: 'Agentforce Voice enables voice conversations for Agentforce Service agents.',
      url: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein_agentforce_voice.htm&release=258&type=5',
      accent: '#06A59A',
      icon: 'language',
    },
    {
      id: 'agentforce-voice-keyterm-prompting',
      title: 'Key-term prompting for voice agents',
      date: '2025-12-15',
      dateLabel: 'Week of Dec 15, 2025',
      summary: 'Improve transcription accuracy by highlighting important phrases (limit: 100 keywords).',
      url: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_agentforce_agent_voice_keyterm_prompting.htm&release=258&type=5',
      accent: '#06A59A',
      icon: 'settings_voice',
    },
    {
      id: 'agentforce-voice-sip-routing',
      title: 'Route Agentforce Voice calls using SIP',
      date: '2026-03-30',
      dateLabel: 'Mar 30, 2026',
      summary: 'Route calls using Session Initiation Protocol (SIP) in addition to PSTN.',
      url: 'https://help.salesforce.com/s/articleView?id=release-notes.rn_agentforce_voice_with_sip.htm&release=260&type=5',
      accent: '#06A59A',
      icon: 'network_cell',
    },
  ],

  // VERIFIED FEATURES ONLY
  features: [
    {
      name: 'Speech-to-Text',
      description: 'Converts spoken words to text using models such as Deepgram',
      verified: true,
      source: 'ai.agentforce_voice.htm',
    },
    {
      name: 'LLM Reasoning',
      description: 'Flash Planner processes intent using OpenAI GPT large language model',
      verified: true,
      source: 'ai.agentforce_voice.htm',
    },
    {
      name: 'Text-to-Speech',
      description: 'Converts text responses back to audio using models such as ElevenLabs',
      verified: true,
      source: 'ai.agentforce_voice.htm',
    },
    {
      name: 'Key-term Prompting',
      description: 'Highlight up to 100 keywords to improve transcription of specific terms',
      verified: true,
      source: 'ai.agent_configure_voice_settings.htm',
    },
    {
      name: 'Pronunciation Dictionary',
      description: 'Define custom pronunciations using IPA or CMU phonetic spelling',
      verified: true,
      source: 'ai.agent_configure_voice_settings.htm',
    },
    {
      name: 'Voice Tuning',
      description: 'Adjust voice speed, similarity, and stability settings',
      verified: true,
      source: 'ai.agent_configure_voice_settings.htm',
    },
    {
      name: 'Zero Data Retention',
      description: 'Third-party LLM providers enforce zero data retention policies',
      verified: true,
      source: 'ai.agentforce_voice.htm',
    },
    {
      name: 'Failover Strategy',
      description: 'Automatic failover to provider infrastructure if rate limits are reached',
      verified: true,
      source: 'ai.agentforce_voice.htm',
    },
    {
      name: 'PSTN Routing',
      description: 'Route calls using Public Switched Telephone Network',
      verified: true,
      source: 'rn_agentforce_voice_with_sip.htm',
    },
    {
      name: 'SIP Routing',
      description: 'Route calls using Session Initiation Protocol over internet',
      verified: true,
      source: 'rn_agentforce_voice_with_sip.htm',
    },
    {
      name: 'Omni-Channel Routing',
      description: 'Route calls using Omni-Channel flows',
      verified: true,
      source: 'ai.agent_call_routing_escalation.htm',
    },
    {
      name: 'Service Cloud Voice Integration',
      description: 'Requires Service Cloud Voice with Amazon Connect or Partner Telephony',
      verified: true,
      source: 'ai.agent_connect_telephony_parent.htm',
    },
    {
      name: 'Omni Supervisor Monitoring',
      description: 'Supervisors can monitor call transcripts in real-time via Omni Supervisor',
      verified: true,
      source: 'ai.monitor_voice_enabled_agents.htm',
    },
  ],

  // REMOVED: All made-up claims including:
  // - Specific model versions (Nova-2, Turbo v2.5)
  // - Latency numbers (<200ms, <500ms, etc.)
  // - Accuracy percentages (95%+)
  // - Codec details (G.711, G.729, Opus, G.722)
  // - Voice tuning ranges (0.5x-2.0x, 0-100)
  // - Real-time Alerts (doesn't exist)
  // - Voice Settings API (not documented)
  // - Multi-region/Cloud-native marketing terms
  // - Any hierarchical children structure
};
