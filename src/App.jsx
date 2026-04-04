import React, { useState, useEffect } from 'react';

const CLOUDS = [
  { id: 'service', label: 'Service', accent: '#06A59A', icon: 'customer_support' },
  { id: 'sales', label: 'Sales', accent: '#0176D3', icon: 'trending_up' },
  { id: 'marketing', label: 'Marketing', accent: '#FE9339', icon: 'campaign' },
  { id: 'agentforce', label: 'Agentforce', accent: '#7B5EA7', icon: 'smart_toy' },
];

const CHANNELS = [
  { id: 'cases', label: 'Cases', icon: 'description', tagline: 'Omni-channel case management', counts: { predictive: 3, generative: 2, agentic: 1 } },
  { id: 'messaging', label: 'Messaging', icon: 'chat', tagline: 'Real-time chat & SMS', counts: { predictive: 2, generative: 2, agentic: 2 } },
  { id: 'voice', label: 'Voice', icon: 'phone', tagline: 'AI-powered voice interactions', counts: { predictive: 1, generative: 1, agentic: 1 } },
  { id: 'email', label: 'Email', icon: 'mail', tagline: 'Intelligent email automation', counts: { predictive: 1, generative: 2, agentic: 1 } },
  { id: 'field_service', label: 'Field Service', icon: 'build', tagline: 'Connected mobile workforce', counts: { predictive: 1, generative: 0, agentic: 1 } },
  { id: 'knowledge', label: 'Knowledge', icon: 'book', tagline: 'Smart self-service help', counts: { predictive: 2, generative: 1, agentic: 1 } },
];

const CAPABILITIES = [
  // Agentic Era
  {
    id: 'as',
    symbol: 'As',
    name: 'Service Agent',
    fullName: 'Agentforce Service Agent — autonomous AI agent handling end-to-end service interactions',
    era: 'agentic',
    channels: ['cases', 'messaging', 'voice', 'email', 'field_service'],
    description: 'Agentforce Service Agent manages the transition from simple chatbots to sophisticated agents. Using advanced reasoning and planning, it breaks down complex customer requests into actionable tasks, coordinating between CRM data and external systems without human intervention.',
    storyline: [
      'Customer initiates request via any channel (Chat, WhatsApp, Voice)',
      'Agentforce reasons over the request and identifies intent',
      'Agent executes actions across CRM and external systems',
      'Resolution is delivered autonomously without human intervention'
    ],
    useCases: [
      'Autonomous returns and order tracking',
      'Booking and rescheduling service appointments',
      'Troubleshooting complex technical issues'
    ],
    specs: { reasoning: 'Atlas Reasoning Engine', knowledge: 'Data Cloud Real-time Sync' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    featured: true,
    icon: 'memory'
  },
  {
    id: 'aa',
    symbol: 'Aa',
    name: 'Svc Assistant',
    fullName: 'Agentforce Service Assistant — agent-assisted experience for service reps',
    era: 'agentic',
    channels: ['cases', 'voice'],
    description: 'Empowers service representatives with proactive AI assistance directly in their workspace, helping them navigate complex cases and provide faster resolutions.',
    storyline: [
      'Agent opens a complex case or answers a voice call',
      'Assistant analyzes live context and suggests "Next Best Action"',
      'Agent confirms and executes suggested automation'
    ],
    useCases: [
      'Guidance for complex insurance claims',
      'Proactive suggestions for up-selling during service'
    ],
    specs: { integration: 'Service Console SDK', assistance: 'Proactive Sidebar' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    featured: false,
    icon: 'memory'
  },
  {
    id: 'ps',
    symbol: 'Ps',
    name: 'Proactive Svc',
    fullName: 'Proactive Service for Self-Service — agent-driven proactive engagement',
    era: 'agentic',
    channels: ['field_service', 'cases'],
    description: 'Anticipates customer needs before they reach out, initiating self-service resolutions or proactive outreach based on business signals.',
    storyline: [
      'An IoT signal detects a failing device or missed appointment',
      'Agentforce triggers a proactive outreach via SMS/Push',
      'Customer chooses a resolution (reschedule/cancel) via Agent interaction'
    ],
    useCases: [
      'Automatic rescheduling for technician delays',
      'Proactive hardware failure notification'
    ],
    specs: { triggers: 'Flow Builder Rules', outreach: 'Multi-channel' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    featured: false,
    icon: 'memory'
  },
  // Generative Era
  {
    id: 'kc',
    symbol: 'Kc',
    name: 'Knowledge Creation',
    fullName: 'Einstein Knowledge Creation — generates knowledge articles from cases/conversations',
    era: 'generative',
    channels: ['knowledge', 'email'],
    description: 'Automatically drafts knowledge articles from resolved cases and customer conversations, accelerating institutional knowledge sharing.',
    storyline: [
      'A unique case is resolved by an agent',
      'Einstein identifies a knowledge gap and drafts an article',
      'Knowledge Manager reviews and publishes the draft'
    ],
    useCases: [
      'Scaling self-service with crowd-sourced knowledge',
      'Drafting FAQs from trending support themes'
    ],
    specs: { language: 'Multi-lingual LLM', source: 'Case & Chat History' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    featured: false,
    icon: 'auto_awesome'
  },
  {
    id: 'es',
    symbol: 'Es',
    name: 'Enhanced Summaries',
    fullName: 'Enhanced Summaries — generates conversation/case summaries',
    era: 'generative',
    channels: ['cases', 'voice'],
    description: 'Provides concise, high-quality summaries of long customer interactions, ensuring agents have instant context when picking up a case.',
    storyline: [
      'Long thread of customer emails or transcripts is selected',
      'Einstein generates a structured summary highlight key issues',
      'Successive agents see the summary instead of reading everything'
    ],
    useCases: [
      'Reducing average handle time during case transfers',
      'Manager overview of escalated cases'
    ],
    specs: { model: 'summarization_optimized', latency: '< 500ms' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    featured: false,
    icon: 'auto_awesome'
  },
  {
    id: 'ws',
    symbol: 'Ws',
    name: 'Work Summaries',
    fullName: 'Einstein Work Summaries — generates post-interaction work summaries',
    era: 'generative',
    channels: ['messaging', 'voice'],
    description: 'Generates wrap-up summaries for agents at the end of an interaction, saving time on administrative tasks.',
    storyline: [
      'Interaction concludes (Chat/Voice)',
      'Einstein drafts the summary, issue, and resolution',
      'Agent saves without manual typing'
    ],
    useCases: [
      'Standardized reporting for call centers',
      'Immediate logging for compliance'
    ],
    specs: { speed: 'Near-instant', format: 'Structured Fields' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    featured: false,
    icon: 'auto_awesome'
  },
  {
    id: 'sg',
    symbol: 'Sg',
    name: 'AI Grounding',
    fullName: 'Service AI Grounding — grounds generative responses with relevant knowledge/data',
    era: 'generative',
    channels: ['knowledge'],
    description: 'Ensures AI-generated responses are accurate and trustworthy by anchoring them in your company\'s verified knowledge and real-time CRM data.',
    storyline: [
      'Agent prompts the AI to draft a response',
      'Einstein searches Data Cloud and Knowledge for ground truth',
      'The response is generated ONLY using the provided source data'
    ],
    useCases: [
      'Safe generative AI for highly regulated industries',
      'Accurate quoting and technical support'
    ],
    specs: { safety: 'Einstein Trust Layer', data: 'Knowledge & Data Cloud' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    featured: false,
    icon: 'auto_awesome'
  },
  {
    id: 'sr',
    symbol: 'Sr',
    name: 'Service Replies',
    fullName: 'Einstein Service Replies — LLM-generated reply drafts grounded in knowledge and case context',
    era: 'generative',
    channels: ['messaging', 'email'],
    description: 'Drafts real-time, context-aware responses for agents across chat, messaging, and email channels.',
    storyline: [
      'Customer asks a complex question in chat',
      'Einstein drafts a full reply with embedded technical details',
      'Agent clicks "Apply" to send the perfectly formatted response'
    ],
    useCases: [
      'Speeding up response times for chat agents',
      'Ensuring consistent brand voice in email'
    ],
    specs: { channels: 'Omni-Channel', tone: 'Brand Aligned' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    featured: false,
    icon: 'auto_awesome'
  },
  // Predictive Era
  {
    id: 'ar',
    symbol: 'Ar',
    name: 'Article Rec',
    fullName: 'Einstein Article Recommendations — predicts relevant articles based on case context',
    era: 'predictive',
    channels: ['knowledge'],
    description: 'Uses machine learning to suggest the most relevant knowledge articles to agents as they work on cases.',
    storyline: [
      'Agent types case subject "Refund policy"',
      'Einstein immediately surfaces the "Standard Refund Policy" article',
      'Agent attaches the article to the case'
    ],
    useCases: [
      'New agent onboarding speed',
      'Improving self-service resolution rates'
    ],
    specs: { model: 'BERT-based ranking', accuracy: '95%+' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    featured: false,
    icon: 'analytics'
  },
  {
    id: 'af',
    symbol: 'Af',
    name: 'Article Flows',
    fullName: 'Einstein Article Recommendations for Flows — predictive article surfacing within Flow automations',
    era: 'predictive',
    channels: ['knowledge'],
    description: 'Easily integrate article recommendations into your custom automated workflows using Flow Builder.',
    storyline: [
      'Customer uses a "Troubleshooter" Flow',
      'Einstein surfaces relevant articles within the Flow screen',
      'Customer resolves the issue before creating a case'
    ],
    useCases: [
      'Automated deflection in self-service portals',
      'Multi-step guided help'
    ],
    specs: { tools: 'Flow Builder', integration: 'No-code' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    featured: false,
    icon: 'analytics'
  },
  {
    id: 'eb',
    symbol: 'Eb',
    name: 'Einstein Bots',
    fullName: 'Einstein Bots — rule/ML-based bots with predictive intent classification',
    era: 'predictive',
    channels: ['messaging'],
    description: 'Deliver instant resolution to common questions with intelligent chatbots powered by natural language understanding.',
    storyline: [
      'Customer types "Where is my order?"',
      'Bot identifies "Order Status" intent',
      'Bot fetches status from ERP and presents it'
    ],
    useCases: [
      'Handling high-volume, low-complexity queries',
      '24/7 basic support coverage'
    ],
    specs: { engine: 'Einstein NLU', capabilities: 'Multi-lingual' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    featured: false,
    icon: 'analytics'
  },
  {
    id: 'ec',
    symbol: 'Ec',
    name: 'Classification',
    fullName: 'Einstein Classification Apps — predicts field values (case category, priority, etc.)',
    era: 'predictive',
    channels: ['cases'],
    description: 'Automatically populates case fields based on historical data, reducing manual entry and improving data consistency.',
    storyline: [
      'New case email arrives',
      'Einstein predicts "Category: Billing" and "Priority: High"',
      'Case is automatically routed to the right queue'
    ],
    useCases: [
      'Eliminating manual triaging',
      'Improving reporting accuracy'
    ],
    specs: { model: 'AutoML', field_types: 'Picklists & Checkboxes' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    featured: false,
    icon: 'analytics'
  },
  {
    id: 'rr',
    symbol: 'Rr',
    name: 'Reply Rec',
    fullName: 'Einstein Reply Recommendations — ML-based ranking of pre-existing reply templates/macros',
    era: 'predictive',
    channels: ['messaging'],
    description: 'Recommends the best chat responses and macros for agents to use when chatting with customers.',
    storyline: [
      'Customer asks about store hours',
      'Einstein suggests "Store Hours Template"',
      'Agent clicks once to send'
    ],
    useCases: [
      'Streamlining chat agent engagement',
      'Promising consistent service language'
    ],
    specs: { language: 'English supported', mode: 'Pilot' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    featured: false,
    icon: 'analytics'
  },
  {
    id: 'cm',
    symbol: 'Cm',
    name: 'Conv Mining',
    fullName: 'Einstein Conversation Mining — surfaces insights from conversations',
    era: 'predictive',
    channels: ['messaging', 'cases'],
    description: 'Analyzes chat and case logs to identify common customer issues and opportunities for automation.',
    storyline: [
      'Manager runs a mining job on 10k transcripts',
      'Einstein identifies 5 new intents for Bots',
      'Manager exports data to jumpstart Bot training'
    ],
    useCases: [
      'Data-driven roadmap for Bot automation',
      'Identifying training gaps for agents'
    ],
    specs: { analysis: 'Unsupervised Learning', visualization: 'Heatmaps' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    featured: false,
    icon: 'analytics'
  },
];

const ERAS = [
  { id: 'predictive', label: 'Predictive Era', subtitle: 'The Foundation', icon: 'analytics', color: 'primary-container' },
  { id: 'generative', label: 'Generative Era', subtitle: 'The Assistant', icon: 'auto_awesome', color: 'secondary-container' },
  { id: 'agentic', label: 'Agentic Era', subtitle: 'Autonomous Force', icon: 'memory', color: 'tertiary-container' },
];

function App() {
  const [activeCloud, setActiveCloud] = useState('service');
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [hoveredCapability, setHoveredCapability] = useState(null);

  useEffect(() => {
    if (selectedCapability) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [selectedCapability]);

  const filteredCapabilities = CAPABILITIES.filter(c => {
    const matchesFilter = activeFilter === 'all' || c.era === activeFilter;
    const matchesChannel = !activeChannel || c.channels.includes(activeChannel);
    return matchesFilter && matchesChannel;
  });

  const handleCapabilityClick = (capability) => {
    if (activeChannel) {
      setHoveredCapability(capability);
    } else {
      setSelectedCapability(capability);
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-8 h-20 shadow-[0_8px_32_0_rgba(1,118,211,0.1)]">
        <div className="flex items-center gap-6">
          <h1 className="font-headline font-black tracking-tighter text-white uppercase text-2xl">
            SALESFORCE <span className="text-primary-container">AI EXPLORER</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8 h-full">
          {CLOUDS.map(cloud => (
            <button
              key={cloud.id}
              onClick={() => { setActiveCloud(cloud.id); setActiveChannel(null); }}
              className={`font-headline font-bold tracking-tight h-full px-2 pt-1 transition-all border-b-2 flex items-center gap-2 relative group ${
                activeCloud === cloud.id 
                  ? 'text-white' 
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
              style={{ borderColor: activeCloud === cloud.id ? cloud.accent : 'transparent' }}
            >
              <span className={`material-symbols-outlined text-xl transition-colors duration-300`} style={{ color: activeCloud === cloud.id ? cloud.accent : 'inherit' }}>{cloud.icon}</span>
              {cloud.label}
              {activeCloud === cloud.id && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] shadow-[0_0_12px] brightness-150" style={{ backgroundColor: cloud.accent, shadowColor: cloud.accent }}></div>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-white/5 transition-all rounded-xl">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant">
            <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7HNdRh4m28X12qumcIYi_5JhrRAv62KzeWHVQtiszYtiWSmgayu7ti-_4Gk_O4k6BOPX7wKXJYQz_Vzr7a3jaGV-PI7EVocqgs__PIZdoQVk4nCQ5qANCqGCeMWcOLbv8PS7-lRIWSNl7IwSVunMPPTdRp-rCeq-cpFLkiU9aPCobDwTTNafwpki27dsRCd2UXOPAIf2cZzUwU1VLpcfXP8APhHeOchTBWuAFvCJI7jcZ15xtTwAweVcZfClHvms9hTr1lno78VF"/>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-20 bg-[#131317] border-r border-white/5 py-8 flex flex-col gap-8">
        <div>
          <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant/40 mb-4">AI Era</p>
          <nav className="flex flex-col gap-1">
            {ERAS.map(era => (
              <button
                key={era.id}
                onClick={() => setActiveFilter(era.id)}
                className={`group px-6 py-2.5 flex items-center gap-4 transition-all text-left ${
                  activeFilter === era.id 
                    ? 'bg-primary-container/10 text-primary-container border-l-4 border-primary-container' 
                    : 'text-slate-500 hover:bg-white/5 border-l-4 border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{era.icon}</span>
                <span className="font-headline text-xs font-bold uppercase tracking-widest">{era.id}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant/40 mb-4">Channel ({activeCloud === 'service' ? 'Service' : 'All'})</p>
          <nav className="flex flex-col gap-1">
            {CHANNELS.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`group px-6 py-2.5 flex items-center gap-4 transition-all text-left ${
                  activeChannel === channel.id 
                    ? 'bg-primary-container/10 text-primary-container border-l-4 border-primary-container' 
                    : 'text-slate-500 hover:bg-white/5 border-l-4 border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{channel.icon}</span>
                <span className="font-headline text-xs font-bold uppercase tracking-widest">{channel.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto px-6">
          <button className="w-full py-4 bg-[#0176D3] text-white font-black rounded-xl shadow-lg shadow-[#0176D3]/20 hover:scale-[1.02] active:scale-95 transition-all uppercase text-[10px] tracking-[0.2em]">
            Explore Use Cases
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-28 p-12 min-h-screen">
        {!activeChannel ? (
          /* Channel Overview Grid */
          <div>
            <header className="mb-12">
              <h2 className="text-5xl font-black tracking-tighter text-white mb-2">Service Cloud</h2>
              <p className="text-on-surface-variant text-lg">AI-powered service delivery across every touchpoint.</p>
            </header>
            
            <div className="grid grid-cols-3 gap-6">
              {CHANNELS.map(channel => (
                <div 
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className="group bg-surface-container-low p-8 rounded-2xl border border-white/5 hover:border-[#0176D3]/30 transition-all duration-500 neon-glow-primary cursor-pointer relative overflow-hidden glass-panel"
                >
                  <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-8xl text-primary-container">{channel.icon}</span>
                  </div>
                  <span className="material-symbols-outlined text-5xl text-primary-container mb-6 block">{channel.icon}</span>
                  <h3 className="text-2xl font-black text-white mb-2">{channel.label}</h3>
                  <p className="text-on-surface-variant text-sm mb-8">{channel.tagline}</p>
                  
                  <div className="flex gap-3">
                    <div className="px-3 py-1 rounded-full bg-primary-container/20 text-[#a4c9ff] text-[10px] font-bold uppercase">{channel.counts.predictive} Predictive</div>
                    <div className="px-3 py-1 rounded-full bg-secondary-container/20 text-[#ffdb3c] text-[10px] font-bold uppercase">{channel.counts.generative} Generative</div>
                    <div className="px-3 py-1 rounded-full bg-tertiary-container/20 text-[#e31754] text-[10px] font-bold uppercase">{channel.counts.agentic} Agentic</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Channel Detail View */
          <div className="flex flex-col h-full">
            <header className="mb-8 flex items-start justify-between">
              <div>
                <button 
                  onClick={() => { setActiveChannel(null); setHoveredCapability(null); }}
                  className="flex items-center gap-2 text-primary-container hover:text-white transition-colors mb-4 group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Back to Roadmap</span>
                </button>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container text-3xl">{CHANNELS.find(c => c.id === activeChannel).icon}</span>
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter text-white capitalize">{activeChannel.replace('_', ' ')}</h2>
                </div>
                <div className="flex gap-3 mt-4">
                  {['all', 'predictive', 'generative', 'agentic'].map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        activeFilter === f ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-on-surface-variant hover:text-white'
                      }`}
                    >
                      {f === 'all' ? 'All capabilities' : `${f} AI`}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <div className="flex gap-8 items-start">
              {/* Left: Periodic Grid */}
              <div className="w-3/5 periodic-grid">
                {ERAS.map(era => {
                  const eraCaps = filteredCapabilities.filter(c => c.era === era.id);
                  if (eraCaps.length === 0) return null;
                  return (
                    <React.Fragment key={era.id}>
                      <div className="col-span-12 mt-4 mb-2 border-l-2 pl-4 py-1 border-white/10">
                        <h3 className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em]">{era.label}</h3>
                      </div>
                      {eraCaps.map(cap => (
                        <div 
                          key={cap.id} 
                          onClick={() => handleCapabilityClick(cap)}
                          className={`${cap.featured ? 'col-span-4' : 'col-span-3'} group cursor-pointer transition-all duration-300 transform hover:-translate-y-1`}
                        >
                          <div className={`bg-surface-container-low p-6 rounded-xl border ${hoveredCapability?.id === cap.id ? 'border-[#0176D3]' : 'border-white/5'} flex flex-col justify-between h-32 relative overflow-hidden transition-all duration-500 ${cap.glowClass}`}>
                            <span className="text-3xl font-black leading-none mb-1" style={{ color: `var(--md-sys-color-${cap.colorClass.replace('-container', '')})` }}>{cap.symbol}</span>
                            <div>
                              <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate">{cap.name}</p>
                              <p className="text-[8px] text-on-surface-variant uppercase font-bold tracking-widest opacity-60">
                                {cap.era}
                              </p>
                            </div>
                            <div className="absolute right-2 top-2 opacity-10">
                              <span className="material-symbols-outlined text-4xl">{cap.icon}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  )
                })}
              </div>

              {/* Right: Storyline Panel */}
              <aside className="w-2/5 sticky top-32 glass-panel border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-[calc(100vh-16rem)]">
                {hoveredCapability ? (
                  <div className="p-8 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-6 mb-8">
                       <span className="text-7xl font-black" style={{ color: `var(--md-sys-color-${hoveredCapability.colorClass.replace('-container', '')})` }}>{hoveredCapability.symbol}</span>
                       <div>
                         <h4 className="text-2xl font-black text-white leading-tight mb-2">{hoveredCapability.fullName.split(' — ')[0]}</h4>
                         <span className="px-3 py-1 rounded-full bg-white/5 text-primary-container text-[10px] font-bold uppercase tracking-widest">{hoveredCapability.era} Era</span>
                       </div>
                    </div>
                    
                    <div className="mb-8">
                      <p className="text-on-surface-variant text-sm leading-relaxed italic border-l-4 border-[#0176D3] pl-4">
                        "{hoveredCapability.fullName.split(' — ')[1]}"
                      </p>
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      <div>
                        <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">history_edu</span>
                          The Storyline
                        </h5>
                        <ul className="space-y-4">
                          {hoveredCapability.storyline?.map((step, idx) => (
                            <li key={idx} className="flex gap-4 group">
                              <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary-container text-[10px] font-bold flex items-center justify-center shrink-0 border border-primary-container/20">{idx + 1}</span>
                              <p className="text-xs text-on-surface-variant leading-normal group-hover:text-white transition-colors">{step}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">rocket_launch</span>
                          Use Cases
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {hoveredCapability.useCases?.map((uc, idx) => (
                            <span key={idx} className="px-3 py-1.5 rounded-lg bg-surface-container text-white text-[10px] font-semibold border border-white/5 hover:border-[#0176D3] transition-colors">{uc}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">hub</span>
                          Related Nodes
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {CAPABILITIES.filter(c => c.era === hoveredCapability.era && c.id !== hoveredCapability.id).slice(0, 3).map(rel => (
                            <button 
                              key={rel.id} 
                              onClick={() => setHoveredCapability(rel)}
                              className="px-2 py-1 rounded bg-white/5 text-[9px] text-on-surface-variant uppercase font-bold border border-white/5 hover:bg-white/10 transition-colors"
                            >
                              {rel.symbol} {rel.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                      <button className="flex-1 py-3 bg-[#0176D3] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">See Demo</button>
                      <button className="flex-1 py-3 bg-white/5 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all border border-white/10">Read Docs</button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-40">
                    <div className="w-20 h-20 rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center mb-6">
                       <span className="material-symbols-outlined text-4xl">ads_click</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tighter">Explore the Era</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Select a capability card on the left to see the interactive storyline and business use cases.</p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* Legacy Modal (still used for direct info) */}
      {selectedCapability && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm transition-all animate-in fade-in duration-300"
          onClick={() => setSelectedCapability(null)}
        >
          <div 
            className="bg-surface-container-low max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[500px]">
              <div className="w-1/3 p-12 flex flex-col justify-between transition-colors duration-500" style={{ backgroundColor: `var(--md-sys-color-${selectedCapability.colorClass.replace('-container', '')})` }}>
                <span className="text-8xl font-black text-white">{selectedCapability.symbol}</span>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">{selectedCapability.fullName.split(' — ')[0]}</h4>
                  <div className="mt-4 flex gap-2">
                    <span className="px-2 py-1 rounded bg-black/20 text-[10px] font-bold text-white uppercase">{selectedCapability.era} Era</span>
                  </div>
                </div>
              </div>
              <div className="w-2/3 p-12 flex flex-col justify-between relative">
                <button 
                  className="absolute top-8 right-8 text-on-surface-variant hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                  onClick={() => setSelectedCapability(null)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Functional Description</p>
                  <h5 className="text-3xl font-bold text-white mb-6 leading-tight">{selectedCapability.fullName.split(' — ')[1] || 'Transforming service with AI intelligence.'}</h5>
                  <p className="text-on-surface-variant leading-relaxed mb-8">
                    {selectedCapability.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedCapability.specs).map(([key, value]) => (
                      <div key={key} className="p-4 bg-surface-container rounded-xl">
                        <p className="text-[10px] text-primary-container font-bold uppercase mb-1">{key.replace('_', ' ')}</p>
                        <p className="text-white text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-primary-container text-white font-bold rounded-xl active:scale-95 transition-transform uppercase text-xs tracking-widest">Config Interface</button>
                  <button className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 active:scale-95 transition-transform uppercase text-xs tracking-widest">View Logs</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

export default App;
