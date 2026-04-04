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
  // MESSAGING
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
    specs: { logic: 'Atlas Engine', safety: 'Einstein Trust Layer' },
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
  // EMAIL
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
  { id: 'all', label: 'All', icon: 'grid_view', color: '#FFFFFF' },
  { id: 'predictive', label: 'Predictive', icon: 'analytics', color: '#0176D3' },
  { id: 'generative', label: 'Generative', icon: 'auto_awesome', color: '#FFDB3C' },
  { id: 'agentic', label: 'Agentic', icon: 'memory', color: '#E31754' },
];

function App() {
  const [activeCloud, setActiveCloud] = useState('service');
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [hoveredCapability, setHoveredCapability] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

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
    if (activeChannel || activeFilter !== 'all') {
      setHoveredCapability(capability);
    } else {
      setSelectedCapability(capability);
    }
  };

  const currentEra = ERAS.find(e => e.id === activeFilter);

  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--nav-bg)] backdrop-blur-2xl border-b border-[var(--border)] flex justify-between items-center px-10 h-24 shadow-2xl transition-colors duration-500">
        <div className="flex items-center gap-12">
          <h1 className="font-headline font-black tracking-tighter text-on-surface uppercase text-2xl flex items-center gap-1">
            SALESFORCE <span className="text-[#0176D3]">AI EXPLORER</span>
          </h1>
          
          <div className="flex items-center gap-1">
            <span className="font-mono text-[#06A59A] text-lg tracking-widest font-light opacity-80 uppercase">CUSTOMER_</span>
            <div className="flex items-center gap-8 ml-4">
              {CLOUDS.map(cloud => (
                <button
                  key={cloud.id}
                  onClick={() => {
                    if (cloud.id !== 'service') {
                      alert(`${cloud.label} Cloud AI nodes coming soon!`);
                    } else {
                      setActiveCloud(cloud.id);
                      setActiveChannel(null);
                    }
                  }}
                  className={`font-headline font-bold tracking-tight px-4 py-2 rounded-xl transition-all flex items-center gap-2 group relative overflow-hidden ${
                    activeCloud === cloud.id 
                      ? 'text-on-surface bg-on-surface/5' 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl transition-all duration-500 ${activeCloud === cloud.id ? 'scale-110 opacity-100' : 'opacity-40 group-hover:opacity-100'}`} style={{ color: cloud.accent }}>{cloud.icon}</span>
                  <span className="text-xs uppercase tracking-widest">{cloud.label}</span>
                  {activeCloud === cloud.id && (
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-[2px] shadow-[0_0_12px] brightness-150" style={{ backgroundColor: cloud.accent }}></div>
                  )}
                  {cloud.id !== 'service' && (
                    <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-40 transition-opacity">
                      <span className="material-symbols-outlined text-[8px]">lock</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl border border-[var(--border)] hover:bg-on-surface/5 transition-all text-on-surface-variant hover:text-on-surface flex items-center justify-center bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-xl">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          
          <div className="flex flex-col items-right text-right">
             <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Global Status</span>
             <span className="text-[10px] font-bold text-[#06A59A] uppercase tracking-widest animate-pulse flex items-center gap-2 justify-end">
               <span className="w-1.5 h-1.5 rounded-full bg-[#06A59A]"></span> Live Updates
             </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-surface-container-low overflow-hidden border border-[var(--border)] p-0.5 shadow-lg">
            <img className="w-full h-full rounded-xl object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7HNdRh4m28X12qumcIYi_5JhrRAv62KzeWHVQtiszYtiWSmgayu7ti-_4Gk_O4k6BOPX7wKXJYQz_Vzr7a3jaGV-PI7EVocqgs__PIZdoQVk4nCQ5qANCqGCeMWcOLbv8PS7-lRIWSNl7IwSVunMPPTdRp-rCeq-cpFLkiU9aPCobDwTTNafwpki27dsRCd2UXOPAIf2cZzUwU1VLpcfXP8APhHeOchTBWuAFvCJI7jcZ15xtTwAweVcZfClHvms9hTr1lno78VF"/>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-24 bg-surface-container-low border-r border-[var(--border)] py-8 flex flex-col gap-8 transition-colors duration-500 shadow-xl overflow-hidden">
        <div>
          <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant/40 mb-4">AI Era</p>
          <nav className="flex flex-col gap-1">
            {ERAS.map(era => (
              <button
                key={era.id}
                onClick={() => setActiveFilter(era.id)}
                className={`group px-6 py-3 flex items-center gap-4 transition-all text-left ${
                  activeFilter === era.id 
                    ? 'bg-surface-container-high text-on-surface border-l-2 border-primary' 
                    : 'text-on-surface-variant hover:bg-on-surface/5 border-l-2 border-transparent'
                }`}
              >
                <span className={`material-symbols-outlined text-xl transition-colors ${activeFilter === era.id ? 'opacity-100' : 'opacity-40'}`} style={{ color: activeFilter === era.id ? era.color : 'inherit' }}>{era.icon}</span>
                <span className="font-headline text-xs font-bold uppercase tracking-widest" style={{ color: activeFilter === era.id ? 'var(--on-surface)' : 'inherit' }}>{era.label}</span>
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

        <div className="mt-auto px-6 pb-24">
          <button className="w-full py-4 bg-[#0176D3] text-white font-black rounded-xl shadow-lg shadow-[#0176D3]/20 hover:scale-[1.02] active:scale-95 transition-all uppercase text-[10px] tracking-[0.2em]">
            Deploy Agent
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-32 p-12 min-h-screen transition-colors duration-500">
        {(!activeChannel && activeFilter === 'all') ? (
          /* Channel Overview Grid (Default Landing) */
          <div className="animate-in fade-in duration-700">
            <header className="mb-12">
              <h2 className="text-5xl font-black tracking-tighter text-on-surface mb-2 uppercase italic">Service Cloud <span className="text-[#0176D3]">Observatory</span></h2>
              <p className="text-on-surface-variant text-lg font-medium">AI-powered service delivery across every touchpoint.</p>
            </header>
            
            <div className="grid grid-cols-3 gap-8">
              {CHANNELS.map(channel => (
                <div 
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className="group bg-surface-container-low p-8 rounded-2xl border border-[var(--border)] hover:border-[#0176D3]/30 transition-all duration-500 neon-glow-primary cursor-pointer relative overflow-hidden glass-panel shadow-sm hover:shadow-xl"
                >
                  <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-8xl text-primary-container">{channel.icon}</span>
                  </div>
                  <span className="material-symbols-outlined text-5xl text-primary-container mb-6 block">{channel.icon}</span>
                  <h3 className="text-2xl font-black text-on-surface mb-2">{channel.label}</h3>
                  <p className="text-on-surface-variant text-sm mb-8 font-medium">{channel.tagline}</p>
                  
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
          /* Flat Feature Grid (Era or Channel Selective) */
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10 flex items-start justify-between">
              <div>
                <button 
                  onClick={() => { setActiveChannel(null); setActiveFilter('all'); setHoveredCapability(null); }}
                  className="flex items-center gap-2 text-primary-container hover:text-white transition-colors mb-4 group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Back to Overview</span>
                </button>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container text-3xl">
                      {activeChannel ? CHANNELS.find(c => c.id === activeChannel).icon : currentEra.icon}
                    </span>
                  </div>
                  <div>
                     <h2 className="text-4xl font-black tracking-tighter text-white capitalize leading-none">
                       {activeChannel ? activeChannel.replace('_', ' ') : `${activeFilter} AI Nodes`}
                     </h2>
                     <p className="text-on-surface-variant text-xs mt-2 font-bold uppercase tracking-widest">{activeChannel ? 'Service Channel' : 'Global Discovery'}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  {ERAS.map(e => (
                    <button
                      key={e.id}
                      onClick={() => setActiveFilter(e.id)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                        activeFilter === e.id 
                          ? 'bg-white text-black shadow-lg scale-105' 
                          : 'bg-white/5 text-on-surface-variant hover:text-white border border-white/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm" style={{ color: activeFilter === e.id ? e.color : 'inherit' }}>{e.icon}</span>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <div className="flex gap-10 items-start">
              {/* Feature Grid */}
              <div className="w-3/5 grid grid-cols-12 gap-x-4 gap-y-4 pb-24 auto-rows-max">
                {filteredCapabilities.map(cap => (
                  <div 
                    key={cap.id} 
                    onClick={() => handleCapabilityClick(cap)}
                    onMouseEnter={() => setHoveredCapability(cap)}
                    className={`${cap.featured ? 'col-span-4' : 'col-span-3'} group cursor-pointer transition-all duration-300 transform hover:-translate-y-2`}
                  >
                    <div 
                      className={`bg-surface-container-low p-6 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between h-40 relative group/card`}
                      style={{ 
                        borderColor: hoveredCapability?.id === cap.id ? (ERAS.find(e => e.id === cap.era).color) : 'rgba(255,255,255,0.05)',
                        boxShadow: hoveredCapability?.id === cap.id ? `0 0 40px ${ERAS.find(e => e.id === cap.era).color}20` : 'none'
                      }}
                    >
                      <span className="text-4xl font-black leading-none mb-1 transition-transform group-hover/card:scale-110" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{cap.symbol}</span>
                      <div>
                        <p className="text-xs font-black text-on-surface uppercase tracking-tighter truncate mb-0.5">{cap.name}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[10px]" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{ERAS.find(e => e.id === cap.era).icon}</span>
                          <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest opacity-60">
                            {cap.era}
                          </p>
                        </div>
                      </div>
                      
                      {/* Decorative background icon */}
                      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover/card:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-[120px] leading-none" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{cap.icon}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Storyline Panel (Right Side) */}
              <div className="flex-1 sticky top-32">
                <div className="glass-panel border-[var(--border)] rounded-3xl p-8 min-h-[500px] flex flex-col relative overflow-hidden group/panel shadow-2xl">
                  {hoveredCapability ? (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 rounded-lg bg-on-surface/5 border border-[var(--border)]">
                               <span className="material-symbols-outlined text-2xl" style={{ color: ERAS.find(e => e.id === hoveredCapability.era).color }}>{hoveredCapability.icon}</span>
                             </div>
                             <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-on-surface/5 border border-[var(--border)] text-on-surface-variant">
                               {hoveredCapability.era} AI Node
                             </span>
                          </div>
                          <h3 className="text-4xl font-black tracking-tighter text-on-surface mb-2 leading-tight">
                            {hoveredCapability.fullName.split(' — ')[0]}
                          </h3>
                          <p className="text-on-surface-variant text-sm font-medium leading-relaxed max-w-sm">
                            {hoveredCapability.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-8 mt-4 pt-8 border-t border-[var(--border)] overflow-y-auto max-h-[40vh] pr-4 custom-scrollbar">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-container mb-4">Functional Storyline</h4>
                          <div className="space-y-6 relative">
                            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-on-surface/5"></div>
                            {hoveredCapability.storyline.map((step, idx) => (
                              <div key={idx} className="flex gap-6 items-start relative">
                                <div className="w-6 h-6 rounded-full bg-background border-2 border-[var(--border)] flex items-center justify-center relative z-10 shrink-0 mt-1 transition-all group-hover/panel:border-primary">
                                  <span className="text-[10px] font-black text-on-surface">{idx + 1}</span>
                                </div>
                                <p className="text-sm text-on-surface-variant/80 font-medium pt-1 hover:text-on-surface transition-colors">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div>
                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0176D3]/60 mb-3 italic">Business Value</h4>
                             <ul className="space-y-2">
                               {hoveredCapability.useCases.map((useCase, idx) => (
                                 <li key={idx} className="text-xs text-on-surface-variant flex items-start gap-2">
                                   <span className="text-[#0176D3] mt-0.5">•</span> {useCase}
                                 </li>
                               ))}
                             </ul>
                           </div>
                           <div>
                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9c40ff]/60 mb-3 italic">Tech Specs</h4>
                             <div className="space-y-2">
                               {Object.entries(hoveredCapability.specs).map(([key, val], idx) => (
                                 <div key={idx} className="flex flex-col">
                                   <span className="text-[8px] uppercase tracking-widest text-on-surface-variant/40 font-bold">{key}</span>
                                   <span className="text-xs text-on-surface/80 font-medium">{val}</span>
                                 </div>
                               ))}
                             </div>
                           </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-[var(--border)] flex gap-4">
                        <button className="flex-1 py-3 bg-[#0176D3]/10 border border-[#0176D3]/30 text-[#0176D3] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#0176D3] hover:text-white transition-all shadow-lg hover:shadow-[#0176D3]/20">
                          View Documentation
                        </button>
                        <button className="flex-1 py-3 bg-on-surface/5 border border-[var(--border)] text-on-surface font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-on-surface/10 transition-all">
                          Demo Studio
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-30 animate-pulse">
                      <span className="material-symbols-outlined text-8xl mb-4 text-primary-container">explore</span>
                      <p className="text-sm font-bold uppercase tracking-[0.3em]">Select a node to explore<br/>the storyline</p>
                    </div>
                  )}

                  {/* Decorative element */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0176D3]/5 blur-[80px] pointer-events-none"></div>
                </div>
              </div>
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
              <div className="w-1/3 p-12 flex flex-col justify-between transition-colors duration-500" style={{ backgroundColor: `var(--md-sys-color-primary)` }}>
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
          background: var(--on-surface-variant);
          opacity: 0.2;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }
      `}</style>
    </div>
  );
}

export default App;
