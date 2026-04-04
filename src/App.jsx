import React, { useState, useEffect } from 'react';

const CLOUDS = [
  { id: 'service', label: 'Service', accent: '#06A59A', icon: 'customer_support' },
  { id: 'sales', label: 'Sales', accent: '#0176D3', icon: 'trending_up' },
  { id: 'marketing', label: 'Marketing', accent: '#FE9339', icon: 'campaign' },
  { id: 'agentforce', label: 'Agentforce', accent: '#7B5EA7', icon: 'smart_toy' },
];

const CHANNELS = [
  { id: 'cases', label: 'Cases', icon: 'description', tagline: 'Unified case lifecycle', counts: { predictive: 5, generative: 5, agentic: 2 } },
  { id: 'messaging', label: 'Messaging', icon: 'chat', tagline: 'Real-time conversational AI', counts: { predictive: 2, generative: 4, agentic: 2 } },
  { id: 'voice', label: 'Voice', icon: 'phone', tagline: 'AI-infused voice interactions', counts: { predictive: 3, generative: 3, agentic: 1 } },
  { id: 'email', label: 'Email', icon: 'mail', tagline: 'Intelligent automated email', counts: { predictive: 2, generative: 4, agentic: 1 } },
  { id: 'field_service', label: 'Field Service', icon: 'build', tagline: 'Mobile workforce intelligence', counts: { predictive: 2, generative: 2, agentic: 2 } },
  { id: 'knowledge', label: 'Knowledge', icon: 'book', tagline: 'Self-service grounding', counts: { predictive: 1, generative: 3, agentic: 1 } },
];

const CAPABILITIES = [
  // CASES
  {
    id: 'ecc',
    symbol: 'Ec',
    name: 'Case Classification',
    fullName: 'Einstein Case Classification — predicts field values based on historical data',
    era: 'predictive',
    channels: ['cases'],
    description: 'Predicts picklist and checkbox field values on new cases based on past cases to reduce manual entry.',
    storyline: ['Case arrives', 'Einstein analyzes subject/description', 'Fields are predicted automatically'],
    useCases: ['Faster case triaging', 'Improved data quality'],
    specs: { model: 'AutoML', target: 'Case Fields' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'ecr',
    symbol: 'Er',
    name: 'Case Routing',
    fullName: 'Einstein Case Routing — routes cases based on predicted values',
    era: 'predictive',
    channels: ['cases'],
    description: 'Uses predicted field values to ensure cases reach the right agent or queue immediately.',
    storyline: ['Einstein predicts case category', 'Omni-Channel uses prediction to find expert', 'Case is pushed to agent'],
    useCases: ['Reducing transfers', 'Faster first response'],
    specs: { logic: 'Omni-Channel', trigger: 'Classification' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'ecw',
    symbol: 'Ew',
    name: 'Case Wrap-Up',
    fullName: 'Einstein Case Wrap-Up — predicts closing values for cases',
    era: 'predictive',
    channels: ['cases'],
    description: 'Suggests values for fields like "Resolution" or "Root Cause" when an agent is closing a case.',
    storyline: ['Agent begins closing case', 'Einstein suggests wrap-up values', 'Agent confirms and saves'],
    useCases: ['Streamlined closing', 'Better trend reporting'],
    specs: { trigger: 'Status: Closed', feedback: 'Real-time' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'ear',
    symbol: 'Ar',
    name: 'Article Recs',
    fullName: 'Einstein Article Recommendations — surfaces relevant knowledge articles',
    era: 'predictive',
    channels: ['cases', 'messaging', 'voice', 'email', 'knowledge'],
    description: 'Automatically finds and recommends the best knowledge articles to resolve cases faster.',
    storyline: ['Agent views case', 'Einstein searches knowledge base', 'Top articles are surfaced in sidebar'],
    useCases: ['Agent enablement', 'Consistency in support'],
    specs: { tech: 'Vectorized Search', accuracy: 'High' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'ecm',
    symbol: 'Em',
    name: 'Conv Mining',
    fullName: 'Einstein Conversation Mining — extracts intents from logs',
    era: 'predictive',
    channels: ['cases', 'messaging', 'voice'],
    description: 'Analyzes case and chat transcripts to uncover common customer problems and automation opportunities.',
    storyline: ['Manager selects transcripts', 'Einstein extracts recurring patterns', 'New bot intents are identified'],
    useCases: ['Data-driven bot strategy', 'Process optimization'],
    specs: { insight: 'Unsupervised ML', output: 'Intent Map' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'ews',
    symbol: 'Ws',
    name: 'Work Summaries',
    fullName: 'Einstein Work Summaries — generates post-interaction summaries',
    era: 'generative',
    channels: ['cases', 'messaging', 'voice', 'field_service'],
    description: 'Automatically drafts case summaries, issues, and resolutions based on interaction history.',
    storyline: ['Interaction ends', 'Einstein drafts the wrap-up summary', 'Agent saves to record'],
    useCases: ['Reduced after-call work', 'Standardized logging'],
    specs: { model: 'LLM Generative', speed: 'Near-instant' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'esc',
    symbol: 'Gs',
    name: 'Enhanced Summaries',
    fullName: 'Enhanced Summaries (Case) — summarized context for long records',
    era: 'generative',
    channels: ['cases'],
    description: 'Provides agents with a concise overview of complex, long-running cases they are inheriting.',
    storyline: ['Agent opens old case', 'GenAI summarizes 20+ emails/notes', 'Agent is briefed in seconds'],
    useCases: ['Faster case transfers', 'Manager escalation reviews'],
    specs: { volume: 'Multi-document', length: 'Concise' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'ekc',
    symbol: 'Kc',
    name: 'Knowledge Creation',
    fullName: 'Einstein Knowledge Creation — drafts articles from cases',
    era: 'generative',
    channels: ['cases', 'messaging', 'email', 'knowledge'],
    description: 'Drafts articles directly from resolved cases to grow the company knowledge base organically.',
    storyline: ['Success! Case resolved', 'Einstein drafts a "How-to"', 'Article is reviewed for publishing'],
    useCases: ['Closing knowledge gaps', 'Crowdsourced expertise'],
    specs: { workflow: 'Integrated Review', source: 'Case + Conversations' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'esre',
    symbol: 'Sr',
    name: 'Service Replies',
    fullName: 'Einstein Service Replies — LLM-generated email/message drafts',
    era: 'generative',
    channels: ['cases', 'messaging', 'email'],
    description: 'Generates personalized, grounded drafts for agents to use when replying to customers.',
    storyline: ['Customer sends query', 'Einstein drafts perfect response', 'Agent clicks send'],
    useCases: ['Speeding up replies', 'Consistent brand voice'],
    specs: { base: 'Knowledge Articles', grounding: 'CRM Data' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'esa',
    symbol: 'Sa',
    name: 'Search Answers',
    fullName: 'Einstein Search Answers — direct answers from knowledge search',
    era: 'generative',
    channels: ['cases', 'knowledge'],
    description: 'Provides a direct, generated answer at the top of search results instead of just listing links.',
    storyline: ['Agent searches "Policy"', 'Einstein reads top article', 'Einstein generates summary answer'],
    useCases: ['Faster information retrieval', 'Reduced reading time'],
    specs: { tech: 'RAG', trust: 'Einstein Trust Layer' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'asa',
    symbol: 'Aa',
    name: 'Svc Assistant',
    fullName: 'Agentforce Service Assistant — co-pilot experience for service reps',
    era: 'agentic',
    channels: ['cases', 'messaging'],
    description: 'An intelligent companion in the Service Console that plans actions and assists agents in real-time.',
    storyline: ['Agent asks "Can you help?"', 'Assistant plans investigation', 'Assistant suggests deep actions'],
    useCases: ['Expert guidance for all agents', 'Workflow automation'],
    specs: { engine: 'Atlas Reasoning', interface: 'Sidepanel' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    icon: 'memory'
  },
  {
    id: 'asp',
    symbol: 'Ap',
    name: 'Service Planner',
    fullName: 'Agentforce Service Planner — autonomous planning for complex service tasks',
    era: 'agentic',
    channels: ['cases'],
    description: 'The reasoning engine that breaks down high-level service goals into granular steps.',
    storyline: ['Complex goal identified', 'Planner maps dependencies', 'Planner coordinates execution'],
    useCases: ['Managing multi-step resolutions', 'Coordination of CRM tasks'],
    specs: { tech: 'Dynamic Reasoning', outcome: 'Goal-oriented' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    icon: 'memory'
  },
  // MESSAGING (New & Unique to Messaging)
  {
    id: 'ebots',
    symbol: 'Eb',
    name: 'Einstein Bots',
    fullName: 'Einstein Bots — rule/ML based conversational bots',
    era: 'predictive',
    channels: ['messaging'],
    description: 'Intelligent chatbots that automate common tasks and deflect basic queries via messaging.',
    storyline: ['Customer types "Hello"', 'Bot identifies intent', 'Bot executes automated flow'],
    useCases: ['24/7 basic support', 'Handling high volumes'],
    specs: { engine: 'NLU', tools: 'Flow Builder' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'cs',
    symbol: 'Cs',
    name: 'Conv Summaries',
    fullName: 'Conversation Summaries — real-time interaction summaries',
    era: 'generative',
    channels: ['messaging', 'voice'],
    description: 'Generates concise summaries of ongoing or completed conversations for faster context.',
    storyline: ['Chat reaches 50+ lines', 'Einstein creates contextual snippet', 'New agent reads it in 2 seconds'],
    useCases: ['Improved hand-offs', 'Supervisor monitoring'],
    specs: { latency: 'Real-time', precision: 'Detailed' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'cc',
    symbol: 'Cc',
    name: 'Conv Catch-Up',
    fullName: 'Conversation Catch-Up — brief for agents joining a chat',
    era: 'generative',
    channels: ['messaging', 'voice'],
    description: 'Provides a "catch-up" summary specifically for agents being transferred into a live chat.',
    storyline: ['Agent 1 transfers chat', 'Agent 2 gets "Catch-up" alert', 'Agent 2 responds with full context'],
    useCases: ['Eliminating repetitive questions', 'Seamless transfers'],
    specs: { trigger: 'Transfer event', speed: 'Instant' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'asa_m',
    symbol: 'As',
    name: 'Service Agent',
    fullName: 'Agentforce Service Agent — autonomous conversational agent',
    era: 'agentic',
    channels: ['messaging', 'email', 'knowledge'],
    description: 'Fully autonomous AI agent that manages entire customer interactions across messaging channels.',
    storyline: ['Customer asks for refund', 'Agent reasons over policy', 'Agent initiates refund securely'],
    useCases: ['End-to-end automation', 'Scaling without hiring'],
    specs: { logic: 'Atlas Engine', safety: ' Einstein Trust Layer' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    icon: 'memory'
  },
  {
    id: 'psss',
    symbol: 'Ps',
    name: 'Proactive Svc',
    fullName: 'Proactive Service for Self-Service — anticipatory customer assistance',
    era: 'agentic',
    channels: ['messaging'],
    description: 'Initiates self-service help proactively based on business signals (e.g., shipment delay).',
    storyline: ['Event: Item out of stock', 'Agent triggers messaging outreach', 'Customer resolves via Bot'],
    useCases: ['Reducing inbound inquiries', 'Improving CSAT'],
    specs: { trigger: 'Data Cloud Signals', outreach: 'Digital' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    icon: 'memory'
  },
  // VOICE
  {
    id: 'cis',
    symbol: 'Ci',
    name: 'Conv Intelligence',
    fullName: 'Conversation Intelligence Service (Pilot) — predictive voice insights',
    era: 'predictive',
    channels: ['voice'],
    description: 'Finds key moments, action items, and trends in voice call transcripts.',
    storyline: ['Call recorded & transcribed', 'Einstein finds "Cancellation" trend', 'Manager adjusts policy'],
    useCases: ['Quality assurance automation', 'Coaching reps'],
    specs: { status: 'Pilot', tech: 'Audio processing' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'av',
    symbol: 'Av',
    name: 'Agentforce Voice',
    fullName: 'Agentforce Voice — AI-driven voice conversation handling',
    era: 'agentic',
    channels: ['voice'],
    description: 'Enables autonomous AI to conduct voice-based customer support with natural language understanding.',
    storyline: ['Phone rings', 'Vocal agent answers fluently', 'Task resolved via voice command'],
    useCases: ['High-scale phone support', 'Personalized IVR'],
    specs: { tech: 'VoiceBot', NLP: 'Deep Learning' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    icon: 'memory'
  },
  // EMAIL (Unique/Different)
  {
    id: 'eet',
    symbol: 'Et',
    name: 'Email Templates',
    fullName: 'Einstein Email Templates — gen-AI template generation',
    era: 'generative',
    channels: ['email'],
    description: 'Helps admins generate beautiful, context-relevant email templates in seconds.',
    storyline: ['Admin needs "Renewal" template', 'Einstein drafts HTML & text', 'Template deployed across org'],
    useCases: ['Faster setup', 'Better formatting'],
    specs: { type: 'Content creation', grounding: 'Org Metadata' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  // FIELD SERVICE
  {
    id: 'nba',
    symbol: 'Nb',
    name: 'Next Best Action',
    fullName: 'Einstein Next Best Action — predictive recommendations for field reps',
    era: 'predictive',
    channels: ['field_service'],
    description: 'Recommends optimal up-sell and cross-sell opportunities at the moment of job completion.',
    storyline: ['Technician finishes repair', 'Einstein suggests "Battery Upgrade"', 'Technician adds to work order'],
    useCases: ['Increasing field revenue', 'Proactive maintenance'],
    specs: { tech: 'Recommendation Engine', UI: 'App & Console' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'erb',
    symbol: 'Rb',
    name: 'Recommend Builder',
    fullName: 'Einstein Recommendation Builder — custom predictions for Field Service',
    era: 'predictive',
    channels: ['field_service'],
    description: 'Allows builds of custom recommendation models to predict parts, skills, or objects for field jobs.',
    storyline: ['Historical work orders analyzed', 'Einstein predicts "Skill: HVAC Senior"', 'Dispatcher assigns correctly'],
    useCases: ['Optimizing first-time fix rates', 'Resource allocation'],
    specs: { tool: 'Declarative Builder', target: 'Any Standard Object' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    icon: 'analytics'
  },
  {
    id: 'pwb',
    symbol: 'Pb',
    name: 'Pre-Work Brief',
    fullName: 'Pre-Work Brief (GenAI) — summarized brief for field technicians',
    era: 'generative',
    channels: ['field_service'],
    description: 'Gathers all customer history and asset info into a short, easy-to-read brief for a mobile technician.',
    storyline: ['Technician arrives on site', 'Opens mobile phone', 'GenAI gives 3-point summary of the asset history'],
    useCases: ['Better prepared technicians', 'Enhanced customer experience'],
    specs: { output: 'Mobile Optimized', source: 'Asset & Case History' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
  },
  {
    id: 'afsa',
    symbol: 'Af',
    name: 'FS Agent',
    fullName: 'Agentforce Field Service Agent — autonomous help for field crews',
    era: 'agentic',
    channels: ['field_service'],
    description: 'An autonomous agent that manages technician questions and administrative field tasks.',
    storyline: ['Technician asks "How many bolts?"', 'Agent checks PDF manual', 'Agent supplies specs instantly'],
    useCases: ['Mobile self-sufficiency', 'Reduced back-office calls'],
    specs: { tech: 'Retrieval Augmented Plan', UI: 'FSL Mobile App' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    icon: 'memory'
  },
  {
    id: 'asa_sched',
    symbol: 'As',
    name: 'Scheduling Agent',
    fullName: 'Agentforce Scheduling Agent — autonomous appointment management',
    era: 'agentic',
    channels: ['field_service'],
    description: 'Manages complex rescheduling and scheduling tasks autonomously for customers.',
    storyline: ['Customer texts "Can\'t make it"', 'Agent finds new slot', 'Agent updates job in FSL'],
    useCases: ['Appointment flexibility', 'Dispatcher relief'],
    specs: { logic: 'Optimization Engine', flow: 'Conversational' },
    colorClass: 'tertiary-container',
    glowClass: 'neon-glow-tertiary',
    icon: 'memory'
  },
  // KNOWLEDGE
  {
    id: 'eke',
    symbol: 'Ke',
    name: 'Knowledge Edits',
    fullName: 'Einstein Knowledge Edits — gen-AI assisted editing',
    era: 'generative',
    channels: ['knowledge'],
    description: 'Helps knowledge managers rewrite, shorten, or change the tone of existing articles.',
    storyline: ['Clunky article text highlighted', 'Einstein rewrites for clarity', 'Manager publishes professional version'],
    useCases: ['Faster article lifecycle', 'Better readability'],
    specs: { feature: 'Tone & Style control', tool: 'Knowledge Console' },
    colorClass: 'secondary-container',
    glowClass: 'neon-glow-secondary',
    icon: 'auto_awesome'
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
