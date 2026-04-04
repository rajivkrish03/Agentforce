import React, { useState, useEffect } from 'react';

const CAPABILITIES = [
  // Agentic Era
  {
    id: 'as',
    symbol: 'As',
    name: 'Service Agent',
    fullName: 'Agentforce Service Agent — autonomous AI agent handling end-to-end service interactions',
    era: 'agentic',
    description: 'Agentforce Service Agent manages the transition from simple chatbots to sophisticated agents. Using advanced reasoning and planning, it breaks down complex customer requests into actionable tasks, coordinating between CRM data and external systems without human intervention.',
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
    description: 'Empowers service representatives with proactive AI assistance directly in their workspace, helping them navigate complex cases and provide faster resolutions.',
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
    description: 'Anticipates customer needs before they reach out, initiating self-service resolutions or proactive outreach based on business signals.',
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
    description: 'Automatically drafts knowledge articles from resolved cases and customer conversations, accelerating institutional knowledge sharing.',
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
    description: 'Provides concise, high-quality summaries of long customer interactions, ensuring agents have instant context when picking up a case.',
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
    description: 'Generates wrap-up summaries for agents at the end of an interaction, saving time on administrative tasks.',
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
    description: 'Ensures AI-generated responses are accurate and trustworthy by anchoring them in your company\'s verified knowledge and real-time CRM data.',
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
    description: 'Drafts real-time, context-aware responses for agents across chat, messaging, and email channels.',
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
    description: 'Uses machine learning to suggest the most relevant knowledge articles to agents as they work on cases.',
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
    description: 'Easily integrate article recommendations into your custom automated workflows using Flow Builder.',
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
    description: 'Deliver instant resolution to common questions with intelligent chatbots powered by natural language understanding.',
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
    description: 'Automatically populates case fields based on historical data, reducing manual entry and improving data consistency.',
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
    description: 'Recommends the best chat responses and macros for agents to use when chatting with customers.',
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
    description: 'Analyzes chat and case logs to identify common customer issues and opportunities for automation.',
    specs: { analysis: 'Unsupervised Learning', visualization: 'Heatmaps' },
    colorClass: 'primary-container',
    glowClass: 'neon-glow-primary',
    featured: false,
    icon: 'analytics'
  },
];

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCapability, setSelectedCapability] = useState(null);

  useEffect(() => {
    if (selectedCapability) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [selectedCapability]);

  const filteredCapabilities = activeFilter === 'all' 
    ? CAPABILITIES 
    : CAPABILITIES.filter(c => c.era === activeFilter);

  const eras = [
    { id: 'predictive', label: 'Predictive Era', subtitle: 'The Foundation', icon: 'analytics', color: 'primary-container' },
    { id: 'generative', label: 'Generative Era', subtitle: 'The Assistant', icon: 'auto_awesome', color: 'secondary-container' },
    { id: 'agentic', label: 'Agentic Era', subtitle: 'Autonomous Force', icon: 'memory', color: 'tertiary-container' },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <div className="bg-background min-h-screen text-on-surface">
      <nav className="fixed top-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-8 h-20 shadow-[0_8px_32_0_rgba(1,118,211,0.1)]">
        <div className="flex items-center gap-6">
          <h1 className="font-headline font-black tracking-tighter text-white uppercase text-2xl">
            SALESFORCE AGENTFORCE <span className="text-primary-container">AI OBSERVATORY</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="font-headline font-bold tracking-tight text-slate-400 hover:text-white transition-colors" href="#">Sales</a>
          <a className="font-headline font-bold tracking-tight text-[#0176D3] border-b-2 border-[#0176D3] pb-1" href="#">Service</a>
          <a className="font-headline font-bold tracking-tight text-slate-400 hover:text-white transition-colors" href="#">Marketing</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-white/5 transition-all rounded-xl active:scale-95">
            <span className="material-symbols-outlined">hub</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-white/5 transition-all rounded-xl active:scale-95">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant">
            <img alt="User Profile" data-alt="professional headshot of a business executive in a modern office with cinematic lighting and shallow depth of field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7HNdRh4m28X12qumcIYi_5JhrRAv62KzeWHVQtiszYtiWSmgayu7ti-_4Gk_O4k6BOPX7wKXJYQz_Vzr7a3jaGV-PI7EVocqgs__PIZdoQVk4nCQ5qANCqGCeMWcOLbv8PS7-lRIWSNl7IwSVunMPPTdRp-rCeq-cpFLkiU9aPCobDwTTNafwpki27dsRCd2UXOPAIf2cZzUwU1VLpcfXP8APhHeOchTBWuAFvCJI7jcZ15xtTwAweVcZfClHvms9hTr1lno78VF"/>
          </div>
        </div>
      </nav>

      <aside className="h-screen w-64 fixed left-0 top-20 bg-[#131317] border-r border-white/5 py-6 flex flex-col gap-4">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">memory</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">AI Eras</p>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">Evolutionary Filters</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => handleFilterClick(era.id)}
              className={`group px-6 py-3 flex items-center gap-4 transition-all text-left ${
                activeFilter === era.id 
                  ? 'bg-primary-container/10 text-primary-container border-r-4 border-primary-container' 
                  : 'text-slate-500 hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined ${activeFilter !== era.id ? 'group-hover:translate-x-1 transition-transform' : ''}`}>
                {era.icon}
              </span>
              <span className="font-headline text-sm font-semibold uppercase tracking-widest">{era.id}</span>
            </button>
          ))}
          <button
            onClick={() => handleFilterClick('all')}
            className={`group px-6 py-3 flex items-center gap-4 transition-all text-left ${
              activeFilter === 'all' 
                ? 'bg-primary-container/10 text-primary-container border-r-4 border-primary-container' 
                : 'text-slate-500 hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">apps</span>
            <span className="font-headline text-sm font-semibold uppercase tracking-widest">All Eras</span>
          </button>
        </nav>
        <div className="mt-auto px-6">
          <button className="w-full py-4 bg-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary-container/20 active:scale-95 transition-transform uppercase text-xs tracking-widest">
            Deploy Agent
          </button>
        </div>
      </aside>

      <main className="ml-64 pt-28 p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-5xl font-extrabold tracking-tighter text-white mb-4">Service Cloud <span className="text-primary-container">Capabilities</span></h2>
            <div className="flex gap-3">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === 'all' ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-on-surface-variant hover:text-white'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('predictive')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === 'predictive' ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-on-surface-variant hover:text-white'
                }`}
              >
                Predictive AI
              </button>
              <button 
                onClick={() => setActiveFilter('generative')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === 'generative' ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-on-surface-variant hover:text-white'
                }`}
              >
                Generative AI
              </button>
              <button 
                onClick={() => setActiveFilter('agentic')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors border border-primary/20 ${
                  activeFilter === 'agentic' ? 'bg-primary-container text-white' : 'bg-surface-container-highest text-on-surface-variant hover:text-white'
                }`}
              >
                Agentic AI
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-1">Status: Operational</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-bold">{filteredCapabilities.length} Active Nodes</span>
            </div>
          </div>
        </header>

        <div className="periodic-grid">
          {eras.map(era => {
            const eraCapabilities = filteredCapabilities.filter(c => c.era === era.id);
            if (eraCapabilities.length === 0) return null;

            return (
              <React.Fragment key={era.id}>
                <div className="col-span-12 mt-8 mb-4 border-l-2 pl-4 py-1 transition-all" style={{ borderColor: `var(--md-sys-color-${era.color === 'primary-container' ? 'primary' : era.color.replace('-container', '')})` }}>
                  <h3 className="text-on-surface-variant text-xs font-black uppercase tracking-[0.3em]">{era.label} / {era.subtitle}</h3>
                </div>
                {eraCapabilities.map(capability => (
                  <div 
                    key={capability.id} 
                    className={`${capability.featured ? 'col-span-3' : 'col-span-2'} group transition-all duration-500`}
                    onClick={() => setSelectedCapability(capability)}
                  >
                    <div className={`bg-surface-container-low ${capability.featured ? 'p-8 h-48' : 'p-6 h-40'} rounded-xl border border-white/5 transition-all duration-500 ${capability.glowClass} cursor-pointer relative overflow-hidden flex flex-col justify-between ${capability.featured ? 'ring-1 ring-tertiary-container/20' : ''}`}>
                      <div className="absolute -right-2 -top-2 opacity-10">
                        <span className={`material-symbols-outlined ${capability.featured ? 'text-9xl' : 'text-8xl'}`}>{capability.icon}</span>
                      </div>
                      <span className={`${capability.featured ? 'text-5xl' : 'text-4xl'} font-black leading-none transition-colors duration-300`} style={{ color: `var(--md-sys-color-${capability.colorClass.replace('-container', '')})` }}>
                        {capability.symbol}
                      </span>
                      <div>
                        <p className={`${capability.featured ? 'text-sm' : 'text-xs'} font-black text-white uppercase tracking-tighter`}>{capability.name}</p>
                        <p className={`${capability.featured ? 'text-xs' : 'text-[10px]'} text-on-surface-variant uppercase font-semibold`}>
                          {capability.fullName.split(' — ')[0].replace('Agentforce ', '').replace('Einstein ', '')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>

        <footer className="mt-16 glass-panel border border-white/5 rounded-2xl p-8 flex items-center justify-between">
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Total Agents</p>
              <p className="text-3xl font-black text-white tracking-tighter">1,204</p>
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Inference Speed</p>
              <p className="text-3xl font-black text-primary tracking-tighter">42ms</p>
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Success Rate</p>
              <p className="text-3xl font-black text-secondary-container tracking-tighter">98.4%</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Observatory Feed</p>
              <p className="text-xs text-white">Live synchronization active</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
            </div>
          </div>
        </footer>
      </main>

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
                        <p className="text-[10px] text-primary font-bold uppercase mb-1">{key.replace('_', ' ')}</p>
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
    </div>
  );
}

export default App;
