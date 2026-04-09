import React, { useState, useEffect } from 'react';
import { AGENTFORCE_TILES } from './AgentforcecapabilitiesData';
import { CAPABILITIES as SERVICE_CAPABILITIES } from './ServicecapabilitiesData';
import { CAPABILITIES as SALES_CAPABILITIES } from './SalescapabilitiesData';

const CLOUDS = [
  { id: 'service', label: 'Service', accent: '#06A59A', icon: 'headset_mic' },
  { id: 'sales', label: 'Sales', accent: '#0176D3', icon: 'trending_up' },
  { id: 'marketing', label: 'Marketing', accent: '#FE9339', icon: 'campaign' },
  { id: 'agentforce', label: 'Agentforce', accent: '#7B5EA7', icon: 'smart_toy' },
];

const SERVICE_CHANNELS = [
  { id: 'cases', label: 'Cases', icon: 'description', tagline: 'Unified case lifecycle', counts: { predictive: 5, generative: 5, agentic: 2 } },
  { id: 'messaging', label: 'Messaging', icon: 'chat', tagline: 'Real-time conversational AI', counts: { predictive: 3, generative: 5, agentic: 3 } },
  { id: 'voice', label: 'Voice', icon: 'phone', tagline: 'AI-infused voice interactions', counts: { predictive: 3, generative: 3, agentic: 1 } },
  { id: 'email', label: 'Email', icon: 'mail', tagline: 'Intelligent automated email', counts: { predictive: 1, generative: 3, agentic: 1 } },
  { id: 'field_service', label: 'Field Service', icon: 'build', tagline: 'Mobile workforce intelligence', counts: { predictive: 2, generative: 2, agentic: 2 } },
  { id: 'knowledge', label: 'Knowledge', icon: 'book', tagline: 'Self-service grounding', counts: { predictive: 1, generative: 3, agentic: 1 } },
];

const SALES_CHANNELS = [
  { id: 'leads', label: 'Leads', icon: 'person_add', tagline: 'Lead generation and qualification', counts: { predictive: 2, generative: 0, agentic: 4 } },
  { id: 'opportunities', label: 'Opportunities', icon: 'attach_money', tagline: 'Deal management and coaching', counts: { predictive: 2, generative: 0, agentic: 4 } },
  { id: 'accounts', label: 'Accounts', icon: 'business', tagline: 'Account strategy and growth', counts: { predictive: 1, generative: 0, agentic: 3 } },
  { id: 'contacts', label: 'Contacts', icon: 'contacts', tagline: 'Relationship intelligence', counts: { predictive: 2, generative: 0, agentic: 0 } },
  { id: 'campaigns', label: 'Campaigns', icon: 'campaign', tagline: 'Marketing effectiveness', counts: { predictive: 4, generative: 0, agentic: 1 } },
  { id: 'activities', label: 'Activities', icon: 'event', tagline: 'Engagement and productivity', counts: { predictive: 4, generative: 0, agentic: 2 } },
  { id: 'forecasting', label: 'Forecasting', icon: 'assessment', tagline: 'Revenue prediction', counts: { predictive: 1, generative: 0, agentic: 0 } },
];

const ERAS = [
  { id: 'all', label: 'All', icon: 'grid_view', color: '#FFFFFF' },
  { id: 'predictive', label: 'Predictive', icon: 'analytics', color: '#0176D3' },
  { id: 'generative', label: 'Generative', icon: 'auto_awesome', color: '#FFDB3C' },
  { id: 'agentic', label: 'Agentic', icon: 'memory', color: '#E31754' },
];

const VOICE_IMPLEMENTATION_CHECKLIST = [
  {
    id: 'environment',
    title: 'ENVIRONMENT SETUP',
    icon: 'dns',
    color: '#0176D3',
    items: [
      'Get access to all environments (Dev, Prod, Full, etc.)',
      'Set up Service Cloud Voice & Amazon Connect for each environment (each needs a unique root email)',
      'Run latency testing to determine AWS regions (under 200ms average is acceptable)',
      'Resolve all network blocks ASAP — send whitepaper to client IT team with UAT & Prod parameters',
      'Validate agent system requirements (check both Salesforce and Amazon Connect requirements)',
    ]
  },
  {
    id: 'prerequisites',
    title: 'PREREQUISITES & ORG SETUP',
    icon: 'settings',
    color: '#06A59A',
    items: [
      'Enable a custom domain in Salesforce (required before Voice can work)',
      'Enable Omni-Channel in the Salesforce org',
      'Enable Identity Provider (SSO) between Salesforce and Amazon Connect',
      'Confirm SCV deployment model — Bundle (Salesforce-managed AWS) vs BYOA (customer\'s own AWS)',
      'Confirm SCV licenses are purchased and assigned to users',
    ]
  },
  {
    id: 'numbers',
    title: 'NUMBERS & PORTING',
    icon: 'phone_forwarded',
    color: '#FFDB3C',
    items: [
      'Get a full list of all numbers in scope (IVR & direct), including country codes',
      'Understand outbound Caller ID requirements (confirm if dynamic switching is needed — requires custom build)',
      'Collect porting paperwork — US/CA: invoice + account number + address. Other countries vary.',
      'Submit porting cases via AWS Support (from PROD only) — international numbers ASAP, US can wait until Sprint 1–2',
      'Register all new numbers claimed (US numbers — ~1 month, must be done manually)',
    ]
  },
  {
    id: 'design',
    title: 'DESIGN & PLANNING',
    icon: 'architecture',
    color: '#E31754',
    items: [
      'Complete IVR flow designs (caller experience)',
      'Complete agent workflow & screen flow designs (agent experience)',
      'Build a detailed go-live delivery plan (training dates, cutover dates, support bridge times, deployment times)',
      'Align on the cutover date — deploy to Prod first, smoke test a few days, then cut over. Aim for off-hours.',
      'Discuss porting mitigation plan with client (include a fallback number in legacy system)',
    ]
  },
  {
    id: 'aws',
    title: 'AWS CONFIGURATION',
    icon: 'cloud',
    color: '#FF9900',
    items: [
      'Upgrade service limits via AWS Support (2–3 weeks) — default concurrent calls = 10, phone numbers = 5, both need increasing',
      'Enable global outbound dialing via AWS Case (~1 week) — only enable countries the client does business in',
      'If forwarding: claim DID numbers in Prod 1:1 with original numbers and test forwarding ASAP',
      'If forwarding + Caller ID needed: submit AWS case for outbound masking (requires proof of ownership or in-progress porting case)',
    ]
  },
  {
    id: 'salesforce',
    title: 'SALESFORCE CONFIGURATION',
    icon: 'tune',
    color: '#0176D3',
    items: [
      'Assign Permission Sets / Permission Set Groups to all agents',
      'Create Contact Center Groups (Routing Profiles) in Salesforce — enable Contact Center Groups in Voice Setup, then import routing profiles',
      'Import queues and complete queue mapping from Amazon Connect',
      'Set outbound Caller ID, outbound number, and call flow per queue',
      'Do NOT deploy queues via manifest — import through the Contact Center page only',
      'Set up User Presence Mapping (per environment — UAT and Prod)',
      'Create Contact Center Channels for each phone number',
      'Configure call dispositions and wrap-up codes',
      'Configure call transcription preferences (Einstein features, if licensed)',
      'Configure the Softphone Layout for the agent console',
    ]
  },
  {
    id: 'users',
    title: 'USERS & ACCESS',
    icon: 'group',
    color: '#06A59A',
    items: [
      'Add users to the Contact Center and assign Contact Center Groups',
      'In Amazon Connect: assign routing profiles and adjust security profiles per user',
      'Remove previous call center assignments from users if applicable',
    ]
  },
  {
    id: 'testing',
    title: 'TESTING & UAT',
    icon: 'bug_report',
    color: '#7B5EA7',
    items: [
      'Define a formal UAT test plan — test inbound calls, transfers, voicemail, and outbound dialing',
      'Set up call recording settings and confirm storage/retention rules with client',
      'Test forwarding ASAP if forwarding numbers — ensure no issues before go-live',
    ]
  },
  {
    id: 'training',
    title: 'TRAINING & REPORTING',
    icon: 'school',
    color: '#FFDB3C',
    items: [
      'Build and deliver agent training on the SCV softphone and Omni-Channel statuses',
      'Set up the Voice Analytics Dashboard for supervisors',
    ]
  },
  {
    id: 'final',
    title: 'FINAL STEPS',
    icon: 'check_circle',
    color: '#45C65A',
    items: [
      'Import Contact Center Groups again per environment (environment-specific step)',
      'If porting: set up mitigation flow to redirect calls to fallback number in case of early porting issues',
      'Update AWS porting case with the actual confirmed cutover date (requires 5–10 business days notice to change)',
    ]
  },
];

function App() {
  const [activeCloud, setActiveCloud] = useState('service');
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeAgentforceTile, setActiveAgentforceTile] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [hoveredCapability, setHoveredCapability] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isOverview, setIsOverview] = useState(true);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistStates, setChecklistStates] = useState(() => {
    const saved = localStorage.getItem('voiceChecklistStates');
    return saved ? JSON.parse(saved) : {};
  });

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

  // Switch between Service and Sales data based on activeCloud
  const CURRENT_CAPABILITIES = activeCloud === 'sales' ? SALES_CAPABILITIES : SERVICE_CAPABILITIES;
  const CURRENT_CHANNELS = activeCloud === 'sales' ? SALES_CHANNELS : SERVICE_CHANNELS;

  const channelCounts = CURRENT_CAPABILITIES.reduce((acc, capability) => {
    for (const channel of capability.channels) {
      if (!acc[channel]) {
        acc[channel] = { predictive: 0, generative: 0, agentic: 0 };
      }

      acc[channel][capability.era] += 1;
    }

    return acc;
  }, {});

  const latestChannels = CURRENT_CHANNELS.map(channel => ({
    ...channel,
    counts: channelCounts[channel.id] || { predictive: 0, generative: 0, agentic: 0 },
  }));

  const selectedAgentforceTile = AGENTFORCE_TILES.find((tile) => tile.id === activeAgentforceTile) || null;
  const timelineReleases = selectedAgentforceTile?.releases
    ? [...selectedAgentforceTile.releases].sort((a, b) => new Date(a.date) - new Date(b.date))
    : [];
  const tileStoryline = selectedAgentforceTile?.storyline ?? [];
  const tileUseCases = selectedAgentforceTile?.useCases ?? [];
  const tileSpecs = selectedAgentforceTile?.specs ?? {};

  const getPrimaryLink = (capability) =>
    capability.links?.docs || capability.links?.trailhead || capability.links?.video || null;

  const openCapabilityLink = (capability) => {
    const url = getPrimaryLink(capability);

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const filteredCapabilities = CURRENT_CAPABILITIES.filter(c => {
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

  const toggleChecklistItem = (sectionId, itemIndex) => {
    const key = `${sectionId}-${itemIndex}`;
    const newStates = { ...checklistStates, [key]: !checklistStates[key] };
    setChecklistStates(newStates);
    localStorage.setItem('voiceChecklistStates', JSON.stringify(newStates));
  };

  const getChecklistProgress = () => {
    const totalItems = VOICE_IMPLEMENTATION_CHECKLIST.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = Object.values(checklistStates).filter(Boolean).length;
    return { total: totalItems, completed: completedItems, percentage: Math.round((completedItems / totalItems) * 100) };
  };

  const currentEra = ERAS.find(e => e.id === activeFilter);

  return (
    <div className={`min-h-screen ${theme} bg-[var(--background)] text-[var(--on-surface)] transition-colors duration-500`}>
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--nav-bg)] backdrop-blur-2xl border-b border-[var(--border)] flex justify-between items-center px-10 h-24 shadow-2xl transition-all duration-500">
        <div className="flex items-center gap-8">
          <h1 className="font-headline font-black tracking-tighter text-[var(--on-surface)] uppercase text-xl flex items-center gap-1 shrink-0">
            <span className="text-[#0176D3]">AGENTFORCE</span> <span className="text-[var(--on-surface-variant)]">CAPABILITIES NAVIGATOR</span>
          </h1>
          
          <div className="h-8 w-px bg-[var(--border)]"></div>

          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            {CLOUDS.map(cloud => (
              <button
                key={cloud.id}
                onClick={() => {
                  setActiveCloud(cloud.id);
                  setActiveChannel(null);
                  setActiveFilter('all');
                  setHoveredCapability(null);
                  setIsOverview(true);
                  setActiveAgentforceTile(null);
                  setSelectedParent(null);
                  setSelectedChild(null);
                }}
                className={`font-headline font-bold tracking-tight px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 group relative whitespace-nowrap ${
                  activeCloud === cloud.id 
                    ? 'text-[var(--on-surface)] bg-on-surface/5' 
                    : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'
                }`}
              >
                <div 
                  className={`p-1.5 rounded-lg transition-transform duration-500 ${activeCloud === cloud.id ? 'scale-110 shadow-lg' : 'opacity-60 grayscale group-hover:grayscale-0'}`}
                  style={{ backgroundColor: activeCloud === cloud.id ? `${cloud.accent}20` : 'transparent', border: activeCloud === cloud.id ? `1px solid ${cloud.accent}40` : '1px solid transparent' }}
                >
                  <span className="material-symbols-outlined text-xl" style={{ color: cloud.accent }}>{cloud.icon}</span>
                </div>
                <span className={`text-xs uppercase tracking-widest ${activeCloud === cloud.id ? 'font-bold' : 'opacity-80'}`}>{cloud.label}</span>
                {activeCloud === cloud.id && (
                  <div className="absolute -bottom-[26px] left-0 w-full h-[3px] rounded-full scale-x-75" style={{ backgroundColor: cloud.accent }}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl border border-[var(--border)] hover:bg-on-surface/5 transition-all text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] flex items-center justify-center bg-[var(--surface-container)]"
          >
            <span className="material-symbols-outlined text-xl">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-[var(--surface-container)] overflow-hidden border border-[var(--border)] p-0.5 shadow-lg shrink-0">
            <img className="w-full h-full rounded-xl object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7HNdRh4m28X12qumcIYi_5JhrRAv62KzeWHVQtiszYtiWSmgayu7ti-_4Gk_O4k6BOPX7wKXJYQz_Vzr7a3jaGV-PI7EVocqgs__PIZdoQVk4nCQ5qANCqGCeMWcOLbv8PS7-lRIWSNl7IwSVunMPPTdRp-rCeq-cpFLkiU9aPCobDwTTNafwpki27dsRCd2UXOPAIf2cZzUwU1VLpcfXP8APhHeOchTBWuAFvCJI7jcZ15xtTwAweVcZfClHvms9hTr1lno78VF"/>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-24 bg-[var(--surface-container)] border-r border-[var(--border)] pt-8 flex flex-col transition-colors duration-500 shadow-xl z-40">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-8 flex flex-col gap-8">
          {activeCloud === 'agentforce' ? (
            <div>
              {selectedParent ? (
                <>
                  <button
                    onClick={() => {
                      setSelectedParent(null);
                      setSelectedChild(null);
                    }}
                    className="flex items-center gap-2 text-[#7B5EA7] hover:text-[var(--on-surface)] transition-colors mb-4 px-6 group"
                  >
                    <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Back to Tiles</span>
                  </button>
                  <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/40 mb-4">Children</p>
                  <nav className="flex flex-col gap-1 px-3">
                    {selectedParent.children?.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setSelectedChild(child)}
                        className={`group px-3 py-3 rounded-xl flex items-center justify-between transition-all text-left ${
                          selectedChild?.id === child.id
                            ? 'bg-on-surface/5 text-[var(--on-surface)] ring-1 ring-[var(--border)]'
                            : 'text-[var(--on-surface-variant)] hover:bg-on-surface/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg" style={{ color: child.accent }}>{child.icon}</span>
                          <span className="font-headline text-[11px] font-black uppercase tracking-widest">{child.label}</span>
                        </div>
                      </button>
                    ))}
                  </nav>
                </>
              ) : (
                <>
                  <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/40 mb-4">Agentforce Hub</p>
                  <nav className="flex flex-col gap-1 px-3">
                    {AGENTFORCE_TILES.map((tile) => (
                      <button
                        key={tile.id}
                        onClick={() => {
                          if (tile.type === 'parent') {
                            setSelectedParent(tile);
                            setSelectedChild(null);
                          } else {
                            setActiveAgentforceTile(tile.id);
                          }
                        }}
                        className={`group px-3 py-3 rounded-xl flex items-center justify-between transition-all text-left ${
                          activeAgentforceTile === tile.id
                            ? 'bg-on-surface/5 text-[var(--on-surface)] ring-1 ring-[var(--border)]'
                            : 'text-[var(--on-surface-variant)] hover:bg-on-surface/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg" style={{ color: tile.accent }}>{tile.icon}</span>
                          <span className="font-headline text-[11px] font-black uppercase tracking-widest">{tile.label}</span>
                        </div>
                        {tile.type === 'parent' ? (
                          <span className="material-symbols-outlined text-sm text-[var(--on-surface-variant)]">chevron_right</span>
                        ) : (
                          <span className="text-[10px] font-bold text-[var(--on-surface-variant)]/60">{tile.releases?.length || 0}</span>
                        )}
                      </button>
                    ))}
                  </nav>
                </>
              )}
            </div>
          ) : (
            <>
              <div>
                <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/40 mb-4">AI Eras</p>
                <nav className="flex flex-col gap-1 px-3">
                  {ERAS.map(era => (
                    <button
                      key={era.id}
                      onClick={() => { setActiveFilter(era.id); setIsOverview(false); }}
                      className={`group px-3 py-3 rounded-xl flex items-center justify-between transition-all text-left ${
                        activeFilter === era.id 
                          ? 'bg-on-surface/5 text-[var(--on-surface)] ring-1 ring-[var(--border)]' 
                          : 'text-[var(--on-surface-variant)] hover:bg-on-surface/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-lg transition-colors ${activeFilter === era.id ? 'opacity-100' : 'opacity-40'}`} style={{ color: activeFilter === era.id ? era.color : 'inherit' }}>{era.icon}</span>
                        <span className="font-headline text-[11px] font-black uppercase tracking-widest">{era.label}</span>
                      </div>
                      {activeFilter === era.id && (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: era.color }}></span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div>
                <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/40 mb-4">
                  Channel ({activeCloud === 'service' ? 'Service' : activeCloud === 'sales' ? 'Sales' : 'All'})
                </p>
                <nav className="flex flex-col gap-1">
                  {latestChannels.map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => { setActiveChannel(channel.id); setIsOverview(false); }}
                      className={`group px-6 py-2.5 flex items-center gap-4 transition-all text-left ${
                        activeChannel === channel.id 
                          ? 'bg-primary-container/10 text-primary-container border-l-4 border-primary-container' 
                          : 'text-[var(--on-surface-variant)] hover:bg-on-surface/5 border-l-4 border-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">{channel.icon}</span>
                      <span className="font-headline text-xs font-bold uppercase tracking-widest">{channel.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>

        <div className="mt-auto px-6 pb-6">
          <button className="w-full py-4 bg-[#0176D3] text-white font-black rounded-xl shadow-lg shadow-[#0176D3]/20 hover:scale-[1.02] active:scale-95 transition-all uppercase text-[10px] tracking-[0.2em]">
            Deploy Agent
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-32 p-12 min-h-screen transition-colors duration-500">
        {activeCloud === 'agentforce' ? (
          selectedChild ? (
            /* Level 3: Child Capabilities View */
            <div className="animate-in fade-in duration-700">
              <header className="mb-12">
                <button
                  onClick={() => setSelectedChild(null)}
                  className="flex items-center gap-2 text-[#7B5EA7] hover:text-[var(--on-surface)] transition-colors mb-6 group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Back to Children</span>
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: selectedChild.accent }}>{selectedChild.label}</p>
                <h2 className="text-5xl font-black tracking-tighter text-[var(--on-surface)] mb-3 uppercase italic">{selectedChild.name}</h2>
                <p className="text-[var(--on-surface-variant)] text-lg font-medium max-w-3xl mb-8">
                  {selectedChild.description}
                </p>
              </header>

              {/* Channel Support Section */}
              {selectedChild.capabilities?.channelSupport && (
                <div className="mb-12">
                  <h3 className="text-2xl font-black text-[var(--on-surface)] mb-6 uppercase tracking-tight">Channel Support</h3>
                  <div className="grid grid-cols-5 gap-6">
                    {selectedChild.capabilities.channelSupport.map((channel) => (
                      <div
                        key={channel.name}
                        className="bg-[var(--surface-container-low)] p-6 rounded-2xl border border-[var(--border)] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl text-center"
                      >
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${channel.accent}20` }}>
                          <span className="material-symbols-outlined text-3xl" style={{ color: channel.accent }}>{channel.icon}</span>
                        </div>
                        <h4 className="text-sm font-black text-[var(--on-surface)] uppercase tracking-tight mb-2">{channel.name}</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${channel.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {channel.available ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features Section */}
              {selectedChild.capabilities?.features && (
                <div>
                  <h3 className="text-2xl font-black text-[var(--on-surface)] mb-6 uppercase tracking-tight">Features</h3>
                  <div className="grid grid-cols-3 gap-6">
                    {selectedChild.capabilities.features.map((feature) => (
                      <div
                        key={feature.name}
                        className="bg-[var(--surface-container-low)] p-6 rounded-2xl border border-[var(--border)] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl text-center"
                      >
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${feature.accent}20` }}>
                          <span className="material-symbols-outlined text-3xl" style={{ color: feature.accent }}>{feature.icon}</span>
                        </div>
                        <h4 className="text-sm font-black text-[var(--on-surface)] uppercase tracking-tight mb-2">{feature.name}</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${feature.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {feature.available ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline Section */}
              {selectedChild.releases && selectedChild.releases.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-black text-[var(--on-surface)] mb-8 uppercase tracking-tight">Release Timeline</h3>
                  <div className="relative pl-10">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]"></div>
                    <div className="space-y-8">
                      {[...selectedChild.releases].sort((a, b) => new Date(a.date) - new Date(b.date)).map((release) => (
                        <div key={release.id} className="relative">
                          <div className="absolute -left-[2.35rem] top-8 w-4 h-4 rounded-full border-4 border-[var(--background)]" style={{ backgroundColor: release.accent }}></div>
                          <div className="glass-panel rounded-[28px] border border-[var(--border)] p-8 shadow-xl">
                            <div className="flex items-start justify-between gap-6 mb-5">
                              <div>
                                <div className="flex flex-wrap gap-3 mb-3">
                                  <span
                                    className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border"
                                    style={{ color: release.accent, borderColor: `${release.accent}55`, backgroundColor: `${release.accent}12` }}
                                  >
                                    {release.dateLabel}
                                  </span>
                                </div>
                                <h3 className="text-2xl font-black text-[var(--on-surface)] leading-tight mb-3">{release.title}</h3>
                                <p className="text-[var(--on-surface-variant)] leading-relaxed">{release.summary}</p>
                              </div>
                              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${release.accent}20` }}>
                                <span className="material-symbols-outlined text-2xl" style={{ color: release.accent }}>{release.icon}</span>
                              </div>
                            </div>
                            <a
                              href={release.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-[0.16em] text-white"
                              style={{ backgroundColor: release.accent }}
                            >
                              Open Release Note
                              <span className="material-symbols-outlined text-base">north_east</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : selectedParent ? (
            /* Level 2: Parent Children View */
            <div className="animate-in fade-in duration-700">
              <header className="mb-12">
                <button
                  onClick={() => setSelectedParent(null)}
                  className="flex items-center gap-2 text-[#7B5EA7] hover:text-[var(--on-surface)] transition-colors mb-6 group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Back to Tiles</span>
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#7B5EA7] mb-4">{selectedParent.label}</p>
                <h2 className="text-5xl font-black tracking-tighter text-[var(--on-surface)] mb-3 uppercase italic">{selectedParent.name}</h2>
                <p className="text-[var(--on-surface-variant)] text-lg font-medium max-w-3xl">
                  {selectedParent.description}
                </p>
              </header>

              <div className="grid grid-cols-2 gap-8">
                {selectedParent.children?.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChild(child)}
                    className="text-left group bg-[var(--surface-container-low)] p-8 rounded-2xl border border-[var(--border)] hover:-translate-y-1 transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at top right, ${child.accent}22, transparent 50%)` }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10" style={{ backgroundColor: `${child.accent}20` }}>
                          <span className="material-symbols-outlined text-3xl" style={{ color: child.accent }}>{child.icon}</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-[var(--on-surface)] mb-3">{child.label}</h3>
                      <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed mb-6">{child.tagline}</p>
                      <p className="text-sm text-[var(--on-surface)]/80 leading-relaxed mb-8">{child.description}</p>
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/60">
                        <span>View capabilities</span>
                        <span className="material-symbols-outlined" style={{ color: child.accent }}>arrow_forward</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : !selectedAgentforceTile ? (
            /* Level 1: Top-Level Tiles Grid */
            <div className="animate-in fade-in duration-700">
              <header className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#7B5EA7] mb-4">Agentforce Hub</p>
                <h2 className="text-5xl font-black tracking-tighter text-[var(--on-surface)] mb-3 uppercase italic">Agentforce Hub</h2>
                <p className="text-[var(--on-surface-variant)] text-lg font-medium max-w-3xl">
                  Pick the Agentforce lens you want to inspect. Each tile opens the timeline view for that area.
                </p>
              </header>

              <div className="grid grid-cols-3 gap-8">
                {AGENTFORCE_TILES.map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => {
                      if (tile.type === 'parent') {
                        setSelectedParent(tile);
                      } else {
                        setActiveAgentforceTile(tile.id);
                      }
                    }}
                    className="text-left group bg-[var(--surface-container-low)] p-8 rounded-2xl border border-[var(--border)] hover:-translate-y-1 transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at top right, ${tile.accent}22, transparent 50%)` }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10" style={{ backgroundColor: `${tile.accent}20` }}>
                          <span className="material-symbols-outlined text-3xl" style={{ color: tile.accent }}>{tile.icon}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--border)] text-[var(--on-surface-variant)]">
                          {tile.type === 'parent' ? `${tile.children?.length || 0} children` : `${tile.releases?.length || 0} updates`}
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-[var(--on-surface)] mb-3">{tile.label}</h3>
                      <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed mb-6">{tile.tagline}</p>
                      <p className="text-sm text-[var(--on-surface)]/80 leading-relaxed mb-8">{tile.description}</p>
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/60">
                        <span>{tile.type === 'parent' ? 'View children' : 'View timeline'}</span>
                        <span className="material-symbols-outlined" style={{ color: tile.accent }}>arrow_forward</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="mb-12">
                <button
                  onClick={() => {
                    setActiveAgentforceTile(null);
                    setIsOverview(true);
                    setSelectedParent(null);
                    setSelectedChild(null);
                  }}
                  className="flex items-center gap-2 text-[#7B5EA7] hover:text-[var(--on-surface)] transition-colors mb-6 group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Back to Tiles</span>
                </button>
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-4" style={{ color: selectedAgentforceTile.accent }}>{selectedAgentforceTile.label}</p>
                    <h2 className="text-5xl font-black tracking-tighter text-[var(--on-surface)] mb-3">{selectedAgentforceTile.name}</h2>
                    <p className="text-lg text-[var(--on-surface-variant)] max-w-3xl leading-relaxed">{selectedAgentforceTile.description}</p>
                  </div>
                  <div className="glass-panel rounded-3xl px-6 py-5 border border-[var(--border)] min-w-[260px]">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--on-surface-variant)]/50 mb-2">Timeline Count</p>
                    <p className="text-3xl font-black text-[var(--on-surface)]">{timelineReleases.length}</p>
                    <p className="text-sm text-[var(--on-surface-variant)]">feature updates</p>
                  </div>
                </div>
              </header>

              <div className="relative pl-10">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]"></div>
                <div className="space-y-8">
                  {timelineReleases.map((release) => (
                    <div key={release.id} className="relative">
                      <div className="absolute -left-[2.35rem] top-8 w-4 h-4 rounded-full border-4 border-[var(--background)]" style={{ backgroundColor: release.accent }}></div>
                      <div className="glass-panel rounded-[28px] border border-[var(--border)] p-8 shadow-xl">
                        <div className="flex items-start justify-between gap-6 mb-5">
                          <div>
                            <div className="flex flex-wrap gap-3 mb-3">
                              <span
                                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border"
                                style={{ color: release.accent, borderColor: `${release.accent}55`, backgroundColor: `${release.accent}12` }}
                              >
                                {release.dateLabel}
                              </span>
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--border)] text-[var(--on-surface-variant)]">
                                {release.category}
                              </span>
                            </div>
                            <h3 className="text-2xl font-black text-[var(--on-surface)] leading-tight mb-3">{release.title}</h3>
                            <p className="text-[var(--on-surface-variant)] leading-relaxed">{release.summary}</p>
                          </div>
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${release.accent}20` }}>
                            <span className="material-symbols-outlined text-2xl" style={{ color: release.accent }}>{release.icon}</span>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <a
                            href={release.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-[0.16em] text-white"
                            style={{ backgroundColor: release.accent }}
                          >
                            Open Release Note
                            <span className="material-symbols-outlined text-base">north_east</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 sticky top-32">
                <div className="glass-panel border-[var(--border)] rounded-3xl p-8 min-h-[500px] flex flex-col relative overflow-hidden shadow-2xl">
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-on-surface/5 border border-[var(--border)]">
                            <span className="material-symbols-outlined text-2xl" style={{ color: selectedAgentforceTile.accent }}>{selectedAgentforceTile.icon}</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-on-surface/5 border border-[var(--border)] text-[var(--on-surface-variant)]">
                            Featured Tile
                          </span>
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter text-[var(--on-surface)] mb-2 leading-tight">
                          {selectedAgentforceTile.name}
                        </h3>
                        <p className="text-[var(--on-surface-variant)] text-sm font-medium leading-relaxed max-w-sm">
                          {selectedAgentforceTile.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8 mt-4 pt-8 border-t border-[var(--border)] overflow-y-auto max-h-[40vh] pr-4 custom-scrollbar">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-container mb-4">Functional Storyline</h4>
                        <div className="space-y-6 relative">
                          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-on-surface/5"></div>
                          {tileStoryline.map((step, idx) => (
                            <div key={idx} className="flex gap-6 items-start relative">
                              <div className="w-6 h-6 rounded-full bg-surface border-2 border-[var(--border)] flex items-center justify-center relative z-10 shrink-0 mt-1">
                                <span className="text-[10px] font-black text-[var(--on-surface)]">{idx + 1}</span>
                              </div>
                              <p className="text-sm text-[var(--on-surface)] font-medium pt-1">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0176D3]/60 mb-3 italic">Business Value</h4>
                          <ul className="space-y-2">
                            {tileUseCases.map((useCase, idx) => (
                              <li key={idx} className="text-xs text-[var(--on-surface-variant)] flex items-start gap-2">
                                <span className="text-[#0176D3] mt-0.5">•</span> {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9c40ff]/60 mb-3 italic">Tech Specs</h4>
                          <div className="space-y-2">
                            {Object.entries(tileSpecs).map(([key, val], idx) => (
                              <div key={idx} className="flex flex-col">
                                <span className="text-[8px] uppercase tracking-widest text-[var(--on-surface-variant)]/40 font-bold">{key}</span>
                                <span className="text-xs text-[var(--on-surface)]/80 font-medium">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-[var(--border)] flex gap-4">
                      <button
                        onClick={() => window.open(selectedAgentforceTile.releases[0]?.url, '_blank', 'noopener,noreferrer')}
                        disabled={!selectedAgentforceTile.releases[0]?.url}
                        className="flex-1 py-3 bg-[#7B5EA7]/15 border border-[#7B5EA7]/30 text-[#c6b0e3] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#7B5EA7] hover:text-white transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        View Documentation
                      </button>
                    </div>
                  </div>

                  <div className="absolute -top-10 -right-10 w-40 h-40" style={{ backgroundColor: `${selectedAgentforceTile.accent}0D` }}></div>
                </div>
              </div>
            </div>
          )
        ) : activeCloud === 'marketing' ? (
          /* Placeholder for Marketing cloud */
          <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="w-32 h-32 rounded-3xl bg-[var(--surface-container-low)] border border-[var(--border)] flex items-center justify-center mb-10 shadow-2xl relative group">
               <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all"></div>
               <span className="material-symbols-outlined text-7xl relative z-10" style={{ color: CLOUDS.find(c => c.id === activeCloud).accent }}>
                 {CLOUDS.find(c => c.id === activeCloud).icon}
               </span>
            </div>
            <h2 className="text-6xl font-black text-[var(--on-surface)] tracking-tighter uppercase mb-4 italic">
              Marketing <span className="text-[var(--on-surface-variant)]/40">Command Center</span>
            </h2>
            <div className="flex items-center gap-3 justify-center mb-8">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
               <p className="text-sm font-bold uppercase tracking-[0.4em] text-primary">Intelligence Nodes incoming</p>
            </div>
            <p className="text-[var(--on-surface-variant)] max-w-md mx-auto text-lg leading-relaxed mb-12">
              We are currently mapping the AI capabilities for the {activeCloud} ecosystem. Check back soon for the full node discovery experience.
            </p>
            <button
              onClick={() => setActiveCloud('service')}
              className="px-10 py-4 bg-primary-container text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xs tracking-widest uppercase"
            >
              Return to Service Cloud
            </button>
          </div>
        ) : isOverview ? (
          /* Channel Overview Grid (Default Landing) */
          <div className="animate-in fade-in duration-700">
            <header className="mb-12">
              <h2 className="text-5xl font-black tracking-tighter text-[var(--on-surface)] mb-2 uppercase italic">
                {activeCloud === 'sales' ? 'Sales' : 'Service'} <span className="text-[#0176D3]">Command Center</span>
              </h2>
              <p className="text-[var(--on-surface-variant)] text-lg font-medium">
                {activeCloud === 'sales'
                  ? 'AI-powered revenue generation and customer acquisition.'
                  : 'AI-powered service delivery across every touchpoint.'}
              </p>
            </header>
            
            <div className="grid grid-cols-3 gap-8">
              {latestChannels.map(channel => (
                <div 
                  key={channel.id}
                  onClick={() => { setActiveChannel(channel.id); setIsOverview(false); }}
                  className="group bg-[var(--surface-container-low)] p-8 rounded-2xl border border-[var(--border)] hover:border-[#0176D3]/30 transition-all duration-500 neon-glow-primary cursor-pointer relative overflow-hidden glass-panel shadow-sm hover:shadow-xl"
                >
                  <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-8xl text-primary-container">{channel.icon}</span>
                  </div>
                  <span className="material-symbols-outlined text-5xl text-primary-container mb-6 block">{channel.icon}</span>
                  <h3 className="text-2xl font-black text-[var(--on-surface)] mb-2">{channel.label}</h3>
                  <p className="text-[var(--on-surface-variant)] text-sm mb-8 font-medium">{channel.tagline}</p>
                  
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
                  onClick={() => { setActiveChannel(null); setActiveFilter('all'); setHoveredCapability(null); setIsOverview(true); }}
                  className="flex items-center gap-2 text-primary-container hover:text-[var(--on-surface)] transition-colors mb-4 group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Back to Overview</span>
                </button>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container text-3xl">
                      {activeChannel ? latestChannels.find(c => c.id === activeChannel).icon : currentEra.icon}
                    </span>
                  </div>
                  <div>
                     <h2 className="text-4xl font-black tracking-tighter text-[var(--on-surface)] capitalize leading-none">
                       {activeChannel ? activeChannel.replace('_', ' ') : `${activeFilter} AI Nodes`}
                     </h2>
                     <p className="text-[var(--on-surface-variant)] text-xs mt-2 font-bold uppercase tracking-widest">
                       {activeChannel ? `${activeCloud === 'sales' ? 'Sales' : 'Service'} Channel` : 'Global Discovery'}
                     </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  {ERAS.map(e => (
                    <button
                      key={e.id}
                      onClick={() => setActiveFilter(e.id)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                        activeFilter === e.id
                          ? 'bg-[var(--on-surface)] text-[var(--surface)] shadow-lg scale-105'
                          : 'bg-on-surface/5 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] border border-[var(--border)]'
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
                      className={`bg-[var(--surface-container-low)] p-6 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between h-40 relative group/card`}
                      style={{ 
                        borderColor: hoveredCapability?.id === cap.id ? (ERAS.find(e => e.id === cap.era).color) : 'var(--border)',
                        boxShadow: hoveredCapability?.id === cap.id ? `0 0 40px ${ERAS.find(e => e.id === cap.era).color}20` : 'none'
                      }}
                    >
                      <span className="text-4xl font-black leading-none mb-1 transition-transform group-hover/card:scale-110" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{cap.symbol}</span>
                      <div>
                        <p className="text-xs font-black text-[var(--on-surface)] uppercase tracking-tighter truncate mb-0.5">{cap.name}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[10px]" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{ERAS.find(e => e.id === cap.era).icon}</span>
                          <p className="text-[10px] text-[var(--on-surface-variant)] uppercase font-bold tracking-widest opacity-60">
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

                {/* Implementation Checklist (Voice Channel Only) */}
                {activeChannel === 'voice' && (
                  <div className="col-span-12 mt-8">
                    <button
                      onClick={() => setShowChecklist(!showChecklist)}
                      className="w-full bg-[var(--surface-container-low)] border border-[var(--border)] rounded-2xl p-6 hover:border-primary-container transition-all duration-300 hover:shadow-lg group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary-container/20 border border-primary-container/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-primary-container">checklist</span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-black text-[var(--on-surface)] uppercase tracking-tight">Implementation Checklist</h3>
                            <p className="text-xs text-[var(--on-surface-variant)] font-medium">
                              {getChecklistProgress().completed} of {getChecklistProgress().total} steps completed ({getChecklistProgress().percentage}%)
                            </p>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-2xl text-[var(--on-surface-variant)] transition-transform ${showChecklist ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 h-2 bg-on-surface/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-container to-[#45C65A] transition-all duration-500 rounded-full"
                          style={{ width: `${getChecklistProgress().percentage}%` }}
                        />
                      </div>
                    </button>

                    {/* Checklist Sections */}
                    {showChecklist && (
                      <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {VOICE_IMPLEMENTATION_CHECKLIST.map((section) => (
                          <div key={section.id} className="bg-[var(--surface-container-low)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--border)] transition-all">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${section.color}20`, border: `1px solid ${section.color}40` }}>
                                <span className="material-symbols-outlined text-lg" style={{ color: section.color }}>{section.icon}</span>
                              </div>
                              <h4 className="text-sm font-black text-[var(--on-surface)] uppercase tracking-wide">{section.title}</h4>
                              <span className="ml-auto text-xs font-bold text-[var(--on-surface-variant)]">
                                {section.items.filter((_, idx) => checklistStates[`${section.id}-${idx}`]).length}/{section.items.length}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {section.items.map((item, idx) => (
                                <label key={idx} className="flex items-start gap-3 cursor-pointer group/item">
                                  <input
                                    type="checkbox"
                                    checked={checklistStates[`${section.id}-${idx}`] || false}
                                    onChange={() => toggleChecklistItem(section.id, idx)}
                                    className="mt-1 w-4 h-4 rounded border-2 border-[var(--border)] checked:bg-primary-container checked:border-primary-container cursor-pointer transition-all"
                                  />
                                  <span className={`text-sm leading-relaxed transition-all ${
                                    checklistStates[`${section.id}-${idx}`]
                                      ? 'text-[var(--on-surface-variant)] line-through opacity-60'
                                      : 'text-[var(--on-surface)] group-hover/item:text-primary-container'
                                  }`}>
                                    {item}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
                             <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-on-surface/5 border border-[var(--border)] text-[var(--on-surface-variant)]">
                               {hoveredCapability.era} AI Node
                             </span>
                          </div>
                          <h3 className="text-4xl font-black tracking-tighter text-[var(--on-surface)] mb-2 leading-tight">
                            {hoveredCapability.fullName.split(' — ')[0]}
                          </h3>
                          <p className="text-[var(--on-surface-variant)] text-sm font-medium leading-relaxed max-w-sm">
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
                                <div className="w-6 h-6 rounded-full bg-surface border-2 border-[var(--border)] flex items-center justify-center relative z-10 shrink-0 mt-1 transition-all group-hover/panel:border-primary">
                                  <span className="text-[10px] font-black text-[var(--on-surface)]">{idx + 1}</span>
                                </div>
                                <p className="text-sm text-[var(--on-surface)] font-medium pt-1 hover:text-primary transition-colors">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div>
                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0176D3]/60 mb-3 italic">Business Value</h4>
                             <ul className="space-y-2">
                               {hoveredCapability.useCases.map((useCase, idx) => (
                                 <li key={idx} className="text-xs text-[var(--on-surface-variant)] flex items-start gap-2">
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
                                   <span className="text-[8px] uppercase tracking-widest text-[var(--on-surface-variant)]/40 font-bold">{key}</span>
                                   <span className="text-xs text-[var(--on-surface)]/80 font-medium">{val}</span>
                                 </div>
                               ))}
                             </div>
                           </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-[var(--border)] flex gap-4">
                        <button
                          onClick={() => openCapabilityLink(hoveredCapability)}
                          disabled={!getPrimaryLink(hoveredCapability)}
                          className="flex-1 py-3 bg-[#0176D3]/10 border border-[#0176D3]/30 text-[#0176D3] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#0176D3] hover:text-white transition-all shadow-lg hover:shadow-[#0176D3]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0176D3]/10 disabled:hover:text-[#0176D3]"
                        >
                          View Documentation
                        </button>
                        <button className="flex-1 py-3 bg-on-surface/5 border border-[var(--border)] text-[var(--on-surface)] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-on-surface/10 transition-all">
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
            className="bg-[var(--surface-container-low)] max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
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
              <div className="w-2/3 p-12 flex flex-col justify-between relative bg-[var(--surface)] rounded-r-2xl border-l border-[var(--border)]">
                <button 
                  className="absolute top-8 right-8 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors p-2 rounded-full hover:bg-[var(--on-surface)]/5"
                  onClick={() => setSelectedCapability(null)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div>
                  <p className="text-[var(--on-surface-variant)] text-xs font-bold uppercase tracking-widest mb-4">Functional Description</p>
                  <h5 className="text-3xl font-bold text-[var(--on-surface)] mb-6 leading-tight">{selectedCapability.name}</h5>
                  <p className="text-[var(--on-surface-variant)] leading-relaxed mb-8">
                    {selectedCapability.description}
                  </p>
                  {selectedCapability.setupRequirements && (
                    <div className="mb-8 p-4 bg-[var(--surface-container)] rounded-xl border border-[var(--border)]">
                      <p className="text-[10px] text-primary-container font-black uppercase tracking-widest mb-2 opacity-80">Setup Requirements</p>
                      <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">{selectedCapability.setupRequirements}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedCapability.specs).map(([key, value]) => (
                      <div key={key} className="p-4 bg-[var(--surface-container)] rounded-xl border border-[var(--border)]">
                        <p className="text-[10px] text-primary-container font-black uppercase tracking-widest mb-1 opacity-80">{key.replace('_', ' ')}</p>
                        <p className="text-[var(--on-surface)] font-bold text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => openCapabilityLink(selectedCapability)}
                    disabled={!getPrimaryLink(selectedCapability)}
                    className="flex-1 py-4 bg-primary-container text-white font-black rounded-xl active:scale-95 transition-transform uppercase text-[10px] tracking-widest shadow-lg shadow-primary-container/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    View Documentation
                  </button>
                  <button
                    onClick={() => selectedCapability?.links?.video && window.open(selectedCapability.links.video, '_blank', 'noopener,noreferrer')}
                    disabled={!selectedCapability?.links?.video}
                    className="flex-1 py-4 bg-[var(--on-surface)]/5 text-[var(--on-surface)] font-black rounded-xl hover:bg-[var(--on-surface)]/10 border border-[var(--border)] active:scale-95 transition-transform uppercase text-[10px] tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="ml-64 mt-auto py-8 px-12 border-t border-[var(--border)] bg-[var(--surface-container-low)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 rounded-full" style={{ backgroundColor: CLOUDS.find(c => c.id === activeCloud)?.accent || '#0176D3' }}></div>
            <div>
              <p className="text-sm font-bold text-[var(--on-surface)] tracking-tight">
                Designed & Developed by <span className="text-[#0176D3]">Rajivkrishnan Jeyaram</span>
              </p>
              <p className="text-xs text-[var(--on-surface-variant)] font-medium tracking-wide">
                Forward Deployed Engineer Senior · Salesforce
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[var(--on-surface-variant)]">
            <span className="material-symbols-outlined text-sm">copyright</span>
            <span className="text-xs font-medium">2026 Agentforce Capabilities Navigator</span>
          </div>
        </div>
      </footer>

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
