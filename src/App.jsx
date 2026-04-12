import React, { useState, useEffect } from 'react';
import { AGENTFORCE_TILES } from './AgentforcecapabilitiesData';
import { CAPABILITIES as SERVICE_CAPABILITIES } from './ServicecapabilitiesData';
import { CAPABILITIES as SALES_CAPABILITIES } from './SalescapabilitiesData';
import { JOBS } from './JobsData';
import { JOURNEYS } from './JourneysData';
import { MATURITY_MODEL } from './MaturityModelData';

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

const TELEPHONY_PROVIDERS = [
  {
    id: 'amazon-connect',
    name: 'Service Cloud Voice with Amazon Connect',
    shortName: 'Amazon Connect',
    icon: 'cloud',
    color: '#FF9900',
    description: 'Native integration with AWS Amazon Connect',
    hasChecklist: true,
  },
  {
    id: 'partner-telephony',
    name: 'Service Cloud Voice with Partner Telephony',
    shortName: 'Partner Telephony',
    icon: 'settings_phone',
    color: '#06A59A',
    description: 'Integrate with certified telephony partners',
    hasChecklist: false,
  },
  {
    id: 'partner-from-connect',
    name: 'Service Cloud Voice with Partner Telephony from Amazon Connect',
    shortName: 'Partner from Connect',
    icon: 'swap_horiz',
    color: '#7B5EA7',
    description: 'Migrate from Amazon Connect to Partner Telephony',
    hasChecklist: false,
  },
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
  const [isOverview, setIsOverview] = useState(true);
  const [checklistStates, setChecklistStates] = useState(() => {
    const saved = localStorage.getItem('voiceChecklistStates');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedTelephony, setSelectedTelephony] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [viewMode, setViewMode] = useState('capabilities'); // 'capabilities' | 'journey'
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showRoadmap, setShowRoadmap] = useState(null); // null or { cloud, channel }
  const [jobsExpanded, setJobsExpanded] = useState(false); // For collapsible Jobs to Be Done
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For mobile sidebar

  useEffect(() => {
    // Set dark mode permanently
    document.documentElement.className = 'dark';
  }, []);

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
    const matchesJobs = selectedJobs.length === 0 || selectedJobs.some(job => c.jobsToBeDone?.includes(job));
    return matchesFilter && matchesChannel && matchesJobs;
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

  const getChecklistProgress = (phaseId = null) => {
    if (phaseId) {
      const phase = VOICE_IMPLEMENTATION_CHECKLIST.find(p => p.id === phaseId);
      if (!phase) return { total: 0, completed: 0, percentage: 0 };
      const total = phase.items.length;
      const completed = phase.items.filter((_, idx) => checklistStates[`${phaseId}-${idx}`]).length;
      return { total, completed, percentage: Math.round((completed / total) * 100) };
    }
    const totalItems = VOICE_IMPLEMENTATION_CHECKLIST.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = Object.values(checklistStates).filter(Boolean).length;
    return { total: totalItems, completed: completedItems, percentage: Math.round((completedItems / totalItems) * 100) };
  };

  const currentEra = ERAS.find(e => e.id === activeFilter);

  return (
    <div className="min-h-screen dark bg-[var(--background)] text-[var(--on-surface)]">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--nav-bg)] backdrop-blur-2xl border-b border-[var(--border)] flex justify-between items-center px-4 sm:px-6 lg:px-10 h-16 sm:h-20 lg:h-24 shadow-2xl transition-all duration-500">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
          <h1 className="font-headline font-black tracking-tighter text-[var(--on-surface)] uppercase text-xs sm:text-sm lg:text-xl flex items-center gap-1 shrink-0">
            <span className="text-[#0176D3]">AGENTFORCE</span> <span className="hidden sm:inline text-[var(--on-surface-variant)]">CAPABILITIES NAVIGATOR</span>
          </h1>
          
          <div className="hidden lg:block h-8 w-px bg-[var(--border)]"></div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
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
                  setMobileMenuOpen(false);
                }}
                className={`font-headline font-bold tracking-tight px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all flex items-center gap-2 group relative whitespace-nowrap ${
                  activeCloud === cloud.id
                    ? 'text-[var(--on-surface)] bg-on-surface/5'
                    : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg transition-transform duration-500 ${activeCloud === cloud.id ? 'scale-110 shadow-lg' : 'opacity-60 grayscale group-hover:grayscale-0'}`}
                  style={{ backgroundColor: activeCloud === cloud.id ? `${cloud.accent}20` : 'transparent', border: activeCloud === cloud.id ? `1px solid ${cloud.accent}40` : '1px solid transparent' }}
                >
                  <span className="material-symbols-outlined text-base sm:text-xl" style={{ color: cloud.accent }}>{cloud.icon}</span>
                </div>
                <span className={`text-[10px] sm:text-xs uppercase tracking-widest ${activeCloud === cloud.id ? 'font-bold' : 'opacity-80'}`}>{cloud.label}</span>
                {activeCloud === cloud.id && (
                  <div className="absolute -bottom-[20px] sm:-bottom-[26px] left-0 w-full h-[3px] rounded-full scale-x-75" style={{ backgroundColor: cloud.accent }}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[var(--border)] hover:bg-on-surface/5 transition-all text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] flex items-center justify-center bg-[var(--surface-container)]"
          >
            <span className="material-symbols-outlined text-lg">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <div className="hidden sm:block w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[var(--surface-container)] overflow-hidden border border-[var(--border)] p-0.5 shadow-lg shrink-0">
            <img className="w-full h-full rounded-xl object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7HNdRh4m28X12qumcIYi_5JhrRAv62KzeWHVQtiszYtiWSmgayu7ti-_4Gk_O4k6BOPX7wKXJYQz_Vzr7a3jaGV-PI7EVocqgs__PIZdoQVk4nCQ5qANCqGCeMWcOLbv8PS7-lRIWSNl7IwSVunMPPTdRp-rCeq-cpFLkiU9aPCobDwTTNafwpki27dsRCd2UXOPAIf2cZzUwU1VLpcfXP8APhHeOchTBWuAFvCJI7jcZ15xtTwAweVcZfClHvms9hTr1lno78VF"/>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: fixed left, Mobile: slide-over from left */}
      <aside className={`h-screen w-80 sm:w-64 fixed left-0 bg-[var(--surface-container)] border-r border-[var(--border)] pt-8 flex flex-col transition-all duration-300 shadow-xl z-50 ${
        mobileMenuOpen ? 'top-16 sm:top-20' : 'top-16 sm:top-20 lg:top-24'
      } ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
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
                        onClick={() => { setSelectedChild(child); setMobileMenuOpen(false); }}
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
                          setMobileMenuOpen(false);
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
                      onClick={() => { setActiveFilter(era.id); setIsOverview(false); setMobileMenuOpen(false); }}
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

              {/* Jobs to Be Done Section - Collapsible */}
              <div>
                <button
                  onClick={() => setJobsExpanded(!jobsExpanded)}
                  className="w-full px-6 py-3 text-left flex items-center justify-between hover:bg-on-surface/5 transition-all rounded-xl"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/40">
                    Jobs to Be Done
                  </p>
                  <span className="material-symbols-outlined text-sm text-[var(--on-surface-variant)]">
                    {jobsExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {jobsExpanded && (
                  <nav className="flex flex-col gap-1 px-3 mt-2 pb-4">
                    {JOBS.map(job => {
                      const isSelected = selectedJobs.includes(job.id);
                      const matchCount = CURRENT_CAPABILITIES.filter(c =>
                        c.jobsToBeDone?.includes(job.id) &&
                        (activeFilter === 'all' || c.era === activeFilter) &&
                        (!activeChannel || c.channels.includes(activeChannel))
                      ).length;

                      return (
                        <button
                          key={job.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedJobs(selectedJobs.filter(j => j !== job.id));
                            } else {
                              setSelectedJobs([...selectedJobs, job.id]);
                            }
                          }}
                          className={`group px-3 py-2.5 rounded-xl flex items-center justify-between transition-all text-left ${
                            isSelected
                              ? 'bg-on-surface/5 text-[var(--on-surface)] ring-1 ring-[var(--border)]'
                              : 'text-[var(--on-surface-variant)] hover:bg-on-surface/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                              isSelected ? 'bg-primary-container border-primary-container' : 'border-[var(--border)]'
                            }`}>
                              {isSelected && <span className="material-symbols-outlined text-white text-xs">check</span>}
                            </div>
                            <span className="material-symbols-outlined text-base" style={{ color: job.color }}>{job.icon}</span>
                            <span className="font-headline text-[10px] font-black uppercase tracking-widest">{job.label}</span>
                          </div>
                          <span className="text-[9px] font-bold text-[var(--on-surface-variant)]/60 bg-on-surface/5 px-1.5 py-0.5 rounded">
                            {matchCount}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                )}
              </div>

              <div>
                <p className="px-6 text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/40 mb-4">
                  Channel ({activeCloud === 'service' ? 'Service' : activeCloud === 'sales' ? 'Sales' : 'All'})
                </p>
                <nav className="flex flex-col gap-1">
                  {latestChannels.map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => { setActiveChannel(channel.id); setIsOverview(false); setMobileMenuOpen(false); }}
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

              {/* View Mode & Roadmap Controls - Only show when a channel is selected */}
              {activeChannel && !isOverview && (
                <div className="px-3 mt-6 pt-6 border-t border-[var(--border)]">
                  <p className="px-3 text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/40 mb-3">
                    View Options
                  </p>
                  <div className="flex items-center gap-2">
                    {/* Capabilities View Button */}
                    <button
                      onClick={() => setViewMode('capabilities')}
                      className={`group relative flex-1 p-3 rounded-xl transition-all flex items-center justify-center ${
                        viewMode === 'capabilities'
                          ? 'bg-primary-container/10 text-primary-container ring-1 ring-primary-container'
                          : 'bg-on-surface/5 text-[var(--on-surface-variant)] hover:bg-on-surface/10'
                      }`}
                      title="Capabilities View"
                    >
                      <span className="material-symbols-outlined text-xl">grid_view</span>
                      {/* Tooltip - bottom positioned to avoid cutoff */}
                      <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
                        Capabilities
                      </span>
                    </button>

                    {/* Journey View Button */}
                    <button
                      onClick={() => setViewMode('journey')}
                      className={`group relative flex-1 p-3 rounded-xl transition-all flex items-center justify-center ${
                        viewMode === 'journey'
                          ? 'bg-primary-container/10 text-primary-container ring-1 ring-primary-container'
                          : 'bg-on-surface/5 text-[var(--on-surface-variant)] hover:bg-on-surface/10'
                      }`}
                      title="Journey View"
                    >
                      <span className="material-symbols-outlined text-xl">route</span>
                      {/* Tooltip - bottom positioned to avoid cutoff */}
                      <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
                        Journey
                      </span>
                    </button>

                    {/* Roadmap Button - Only show if roadmap exists for this cloud/channel */}
                    {MATURITY_MODEL[activeCloud]?.[activeChannel] && (
                      <button
                        onClick={() => {
                          console.log('Roadmap clicked:', { cloud: activeCloud, channel: activeChannel });
                          setShowRoadmap({ cloud: activeCloud, channel: activeChannel });
                        }}
                        className="group relative flex-1 p-3 rounded-xl transition-all flex items-center justify-center bg-on-surface/5 text-[var(--on-surface-variant)] hover:bg-on-surface/10"
                        title="Implementation Roadmap"
                      >
                        <span className="material-symbols-outlined text-xl">account_tree</span>
                        {/* Tooltip - bottom positioned to avoid cutoff */}
                        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
                          Roadmap
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}
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
      <main className="lg:ml-64 pt-20 sm:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12 min-h-screen transition-colors duration-500">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                       {activeChannel ? activeChannel.replace('_', ' ') : `${activeFilter} AI`}
                     </h2>
                     <p className="text-[var(--on-surface-variant)] text-xs mt-2 font-bold uppercase tracking-widest">
                       {activeChannel ? `${activeCloud === 'sales' ? 'Sales' : 'Service'} Channel` : 'Global Discovery'}
                     </p>
                  </div>
                </div>

                {/* Active Jobs Pills */}
                {selectedJobs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 p-3 rounded-xl bg-on-surface/5 border border-[var(--border)]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[var(--on-surface-variant)] mr-2">Filtering by:</span>
                    {selectedJobs.map(jobId => {
                      const job = JOBS.find(j => j.id === jobId);
                      return (
                        <div
                          key={jobId}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wide transition-all"
                          style={{ borderColor: `${job.color}40`, backgroundColor: `${job.color}15`, color: job.color }}
                        >
                          <span className="material-symbols-outlined text-xs">{job.icon}</span>
                          {job.label}
                          <button
                            onClick={() => setSelectedJobs(selectedJobs.filter(j => j !== jobId))}
                            className="ml-1 hover:opacity-70 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

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

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              {/* Journey Swimlanes View - Only when channel is selected */}
              {activeChannel && viewMode === 'journey' && JOURNEYS[activeCloud]?.[activeChannel] ? (
                <div className="w-full pb-24">
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-[var(--on-surface)] mb-2 uppercase tracking-tight">
                      {JOURNEYS[activeCloud][activeChannel].name}
                    </h3>
                    <p className="text-sm text-[var(--on-surface-variant)]">
                      {JOURNEYS[activeCloud][activeChannel].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
                    {JOURNEYS[activeCloud][activeChannel].phases.map((phase) => {
                      const phaseCapabilities = JOURNEYS[activeCloud][activeChannel].mapping[phase.id] || [];
                      const capabilities = phaseCapabilities
                        .map(id => CURRENT_CAPABILITIES.find(c => c.id === id))
                        .filter(c => c && (activeFilter === 'all' || c.era === activeFilter) && (selectedJobs.length === 0 || selectedJobs.some(job => c.jobsToBeDone?.includes(job))));

                      return (
                        <div key={phase.id} className="flex flex-col">
                          {/* Phase Header */}
                          <div className="mb-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-container-low)] text-center">
                            <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${phase.color}20` }}>
                              <span className="material-symbols-outlined text-lg" style={{ color: phase.color }}>{phase.icon}</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--on-surface)]">{phase.label}</p>
                            <span className="text-[9px] text-[var(--on-surface-variant)]">{capabilities.length}</span>
                          </div>

                          {/* Phase Capabilities */}
                          <div className="space-y-3 flex-1">
                            {capabilities.length === 0 ? (
                              <div className="p-3 rounded-lg border border-dashed border-[var(--border)] text-center text-[9px] text-[var(--on-surface-variant)]">
                                No capabilities
                              </div>
                            ) : (
                              capabilities.map((cap) => (
                                <div
                                  key={cap.id}
                                  onClick={() => handleCapabilityClick(cap)}
                                  onMouseEnter={() => setHoveredCapability(cap)}
                                  className="group cursor-pointer p-3 rounded-lg border transition-all duration-300 bg-[var(--surface-container-low)] hover:-translate-y-1"
                                  style={{
                                    borderColor: hoveredCapability?.id === cap.id ? ERAS.find(e => e.id === cap.era).color : 'var(--border)',
                                    boxShadow: hoveredCapability?.id === cap.id ? `0 0 20px ${ERAS.find(e => e.id === cap.era).color}20` : 'none'
                                  }}
                                >
                                  <span className="text-2xl font-black leading-none block mb-1" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{cap.symbol}</span>
                                  <p className="text-[9px] font-bold text-[var(--on-surface)] uppercase tracking-tight leading-tight">{cap.name}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="material-symbols-outlined text-[8px]" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{ERAS.find(e => e.id === cap.era).icon}</span>
                                    <p className="text-[8px] text-[var(--on-surface-variant)] uppercase font-bold opacity-60">{cap.era}</p>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Feature Grid */
                <div className="w-full lg:w-3/5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4 pb-24 auto-rows-max">
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

                {/* Telephony Provider Banner (Voice Channel Only) */}
                {activeChannel === 'voice' && (
                  <div className="col-span-12 mt-8">
                    <div className="bg-gradient-to-r from-[#0176D3]/10 via-[#FF9900]/10 to-[#06A59A]/10 border border-[var(--border)] rounded-2xl p-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#0176D3]/20 border border-[#0176D3]/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xl text-[#0176D3]">campaign</span>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider text-[var(--on-surface-variant)]">Product Rename Notice</p>
                          <h3 className="text-sm font-bold text-[var(--on-surface)]">
                            <span className="line-through opacity-60">Service Cloud Voice</span>
                            <span className="mx-2">→</span>
                            <span className="text-[#0176D3]">Salesforce Voice</span>
                          </h3>
                        </div>
                      </div>

                      <div className="border-t border-[var(--border)] pt-5 mt-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--on-surface-variant)] mb-3">Select Telephony Provider</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {TELEPHONY_PROVIDERS.map((provider) => (
                            <button
                              key={provider.id}
                              onClick={() => {
                                setSelectedTelephony(provider.id);
                                if (!provider.hasChecklist) {
                                  setShowChecklist(false);
                                }
                              }}
                              className={`group relative p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                                selectedTelephony === provider.id
                                  ? 'border-[var(--on-surface)] bg-on-surface/5 shadow-lg scale-[1.02]'
                                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border)] hover:shadow-md hover:-translate-y-1'
                              }`}
                              style={{
                                borderColor: selectedTelephony === provider.id ? provider.color : undefined,
                                boxShadow: selectedTelephony === provider.id ? `0 0 24px ${provider.color}30` : undefined,
                              }}
                            >
                              <div className="flex items-start gap-3 mb-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                                  style={{
                                    backgroundColor: `${provider.color}20`,
                                    border: `1px solid ${provider.color}40`,
                                  }}
                                >
                                  <span className="material-symbols-outlined text-base" style={{ color: provider.color }}>
                                    {provider.icon}
                                  </span>
                                </div>
                                {selectedTelephony === provider.id && (
                                  <span className="material-symbols-outlined text-sm ml-auto" style={{ color: provider.color }}>
                                    check_circle
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs font-black text-[var(--on-surface)] uppercase tracking-tight leading-tight mb-2">
                                {provider.shortName}
                              </h4>
                              <p className="text-[10px] text-[var(--on-surface-variant)] leading-relaxed">
                                {provider.description}
                              </p>
                              {provider.hasChecklist && (
                                <div className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: provider.color }}>
                                  <span className="material-symbols-outlined text-xs">checklist</span>
                                  <span>Checklist Available</span>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Implementation Phases (Voice Channel + Amazon Connect Only) */}
                {activeChannel === 'voice' && selectedTelephony === 'amazon-connect' && (
                  <div className="col-span-12 mt-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-black text-[var(--on-surface)] uppercase tracking-tight">Implementation Roadmap</h3>
                          <p className="text-xs text-[var(--on-surface-variant)] font-medium mt-1">
                            {getChecklistProgress().completed} of {getChecklistProgress().total} steps completed ({getChecklistProgress().percentage}%)
                          </p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-[#45C65A]/20 border border-[#45C65A]/30">
                          <span className="text-sm font-black text-[#45C65A]">{VOICE_IMPLEMENTATION_CHECKLIST.length} Phases</span>
                        </div>
                      </div>
                      <div className="h-2 bg-on-surface/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0176D3] via-[#FF9900] to-[#45C65A] transition-all duration-500 rounded-full"
                          style={{ width: `${getChecklistProgress().percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {VOICE_IMPLEMENTATION_CHECKLIST.map((phase, index) => {
                        const progress = getChecklistProgress(phase.id);
                        return (
                          <button
                            key={phase.id}
                            onClick={() => setSelectedPhase(phase)}
                            className="group relative p-5 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface-container-low)] hover:border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
                            style={{
                              boxShadow: `0 0 0 0 ${phase.color}30`,
                            }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                style={{
                                  backgroundColor: `${phase.color}20`,
                                  border: `1px solid ${phase.color}40`,
                                }}
                              >
                                <span className="material-symbols-outlined text-xl" style={{ color: phase.color }}>
                                  {phase.icon}
                                </span>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--on-surface-variant)]/60">
                                  Phase {index + 1}
                                </span>
                                <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                                  progress.percentage === 100
                                    ? 'bg-[#45C65A]/20 text-[#45C65A]'
                                    : progress.percentage > 0
                                    ? 'bg-[#FF9900]/20 text-[#FF9900]'
                                    : 'bg-on-surface/5 text-[var(--on-surface-variant)]'
                                }`}>
                                  {progress.completed}/{progress.total}
                                </div>
                              </div>
                            </div>
                            <h4 className="text-xs font-black text-[var(--on-surface)] uppercase tracking-tight leading-tight mb-3">
                              {phase.title}
                            </h4>
                            <div className="h-1.5 bg-on-surface/5 rounded-full overflow-hidden mb-3">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${progress.percentage}%`,
                                  backgroundColor: phase.color,
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: phase.color }}>
                              <span className="material-symbols-outlined text-xs">arrow_forward</span>
                              <span>View Details</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                </div>
              )}

              {/* Storyline Panel (Right Side) - Hide on mobile when no capability hovered, hide when in Journey view */}
              {!(activeChannel && viewMode === 'journey') && (
              <div className={`flex-1 lg:sticky top-32 ${!hoveredCapability ? 'hidden lg:flex' : 'flex'}`}>
                <div className="glass-panel border-[var(--border)] rounded-3xl p-6 sm:p-8 min-h-[400px] sm:min-h-[500px] flex flex-col relative overflow-hidden group/panel shadow-2xl w-full">
                  {hoveredCapability ? (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 rounded-lg bg-on-surface/5 border border-[var(--border)]">
                               <span className="material-symbols-outlined text-2xl" style={{ color: ERAS.find(e => e.id === hoveredCapability.era).color }}>{hoveredCapability.icon}</span>
                             </div>
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
              )}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

      {/* Implementation Phase Modal */}
      {selectedPhase && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm transition-all animate-in fade-in duration-300"
          onClick={() => setSelectedPhase(null)}
        >
          <div
            className="bg-[var(--surface-container-low)] max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] animate-in zoom-in-95 duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="p-8 border-b border-[var(--border)] relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${selectedPhase.color}15, ${selectedPhase.color}05)`,
              }}
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-on-surface/5 hover:bg-on-surface/10 border border-[var(--border)] text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all flex items-center justify-center group"
                onClick={() => setSelectedPhase(null)}
              >
                <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
              </button>

              <div className="flex items-start gap-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${selectedPhase.color}20`,
                    border: `2px solid ${selectedPhase.color}40`,
                  }}
                >
                  <span className="material-symbols-outlined text-3xl" style={{ color: selectedPhase.color }}>
                    {selectedPhase.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-on-surface/10 border border-[var(--border)] text-[var(--on-surface-variant)]">
                      Implementation Phase
                    </span>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      getChecklistProgress(selectedPhase.id).percentage === 100
                        ? 'bg-[#45C65A]/20 text-[#45C65A] border border-[#45C65A]/30'
                        : getChecklistProgress(selectedPhase.id).percentage > 0
                        ? 'bg-[#FF9900]/20 text-[#FF9900] border border-[#FF9900]/30'
                        : 'bg-on-surface/5 text-[var(--on-surface-variant)] border border-[var(--border)]'
                    }`}>
                      {getChecklistProgress(selectedPhase.id).completed}/{getChecklistProgress(selectedPhase.id).total} Complete
                    </div>
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter text-[var(--on-surface)] mb-3 uppercase">
                    {selectedPhase.title}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <div className="h-2 bg-on-surface/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${getChecklistProgress(selectedPhase.id).percentage}%`,
                            backgroundColor: selectedPhase.color,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-black text-[var(--on-surface)]">
                      {getChecklistProgress(selectedPhase.id).percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body - Checklist Items */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-4">
                {selectedPhase.items.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-on-surface/5 cursor-pointer group/item transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={checklistStates[`${selectedPhase.id}-${idx}`] || false}
                      onChange={() => toggleChecklistItem(selectedPhase.id, idx)}
                      className="mt-1 w-5 h-5 rounded border-2 border-[var(--border)] checked:bg-primary-container checked:border-primary-container cursor-pointer transition-all shrink-0"
                    />
                    <div className="flex-1">
                      <span
                        className={`text-sm leading-relaxed transition-all block ${
                          checklistStates[`${selectedPhase.id}-${idx}`]
                            ? 'text-[var(--on-surface-variant)] line-through opacity-60'
                            : 'text-[var(--on-surface)] group-hover/item:text-primary-container'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[var(--border)] bg-[var(--surface-container)] flex items-center justify-between">
              <div className="text-xs text-[var(--on-surface-variant)]">
                <span className="font-bold">{selectedPhase.items.length} tasks</span> in this phase
              </div>
              <button
                onClick={() => setSelectedPhase(null)}
                className="px-6 py-3 rounded-xl bg-primary-container/10 border border-primary-container/30 text-primary-container font-bold text-sm uppercase tracking-wider hover:bg-primary-container hover:text-white transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Roadmap Modal */}
      {showRoadmap && (() => {
        console.log('Modal check:', { showRoadmap, hasData: !!MATURITY_MODEL[showRoadmap.cloud]?.[showRoadmap.channel] });
        return MATURITY_MODEL[showRoadmap.cloud]?.[showRoadmap.channel];
      })() && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm transition-all animate-in fade-in duration-300"
          onClick={() => setShowRoadmap(null)}
        >
          <div
            className="bg-[var(--surface-container-low)] max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] animate-in zoom-in-95 duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-8 border-b border-[var(--border)] bg-gradient-to-r from-primary-container/10 to-secondary-container/10">
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-on-surface/5 hover:bg-on-surface/10 border border-[var(--border)] text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all flex items-center justify-center group"
                onClick={() => setShowRoadmap(null)}
              >
                <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">close</span>
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center" style={{ backgroundColor: CLOUDS.find(c => c.id === showRoadmap.cloud).accent + '20' }}>
                  <span className="material-symbols-outlined text-2xl" style={{ color: CLOUDS.find(c => c.id === showRoadmap.cloud).accent }}>
                    {latestChannels.find(ch => ch.id === showRoadmap.channel)?.icon || 'route'}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--on-surface-variant)]/60">
                    Implementation Roadmap
                  </p>
                  <h2 className="text-3xl font-black tracking-tighter text-[var(--on-surface)]">
                    {MATURITY_MODEL[showRoadmap.cloud][showRoadmap.channel].name}
                  </h2>
                </div>
              </div>

              <p className="text-sm text-[var(--on-surface-variant)]">
                Follow this roadmap to progressively implement AI capabilities from foundation to autonomous
              </p>
            </div>

            {/* Modal Body - Maturity Levels */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-6">
                {MATURITY_MODEL[showRoadmap.cloud][showRoadmap.channel].levels.map((level, idx) => {
                  const isCompleted = false; // TODO: Track completion state
                  const isLocked = idx > 0 && false; // TODO: Check if previous level is complete

                  return (
                    <div
                      key={level.id}
                      className="glass-panel rounded-2xl border border-[var(--border)] p-6 transition-all duration-300"
                      style={{
                        opacity: isLocked ? 0.5 : 1,
                        borderColor: isCompleted ? level.color : 'var(--border)',
                      }}
                    >
                      {/* Level Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border-2"
                            style={{
                              backgroundColor: `${level.color}20`,
                              borderColor: `${level.color}40`,
                            }}
                          >
                            <span className="material-symbols-outlined text-2xl" style={{ color: level.color }}>
                              {level.icon}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-black text-[var(--on-surface)] uppercase tracking-tight">
                                Level {level.order}: {level.name}
                              </h3>
                              {isLocked && (
                                <span className="px-2 py-1 rounded-full text-[9px] font-bold uppercase bg-on-surface/10 text-[var(--on-surface-variant)] flex items-center gap-1">
                                  <span className="material-symbols-outlined text-xs">lock</span>
                                  Locked
                                </span>
                              )}
                              {isCompleted && (
                                <span className="px-2 py-1 rounded-full text-[9px] font-bold uppercase bg-green-500/20 text-green-400 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-xs">check_circle</span>
                                  Complete
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[var(--on-surface-variant)]">{level.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-[var(--on-surface-variant)] mb-1">Time to Value</p>
                          <p className="text-sm font-bold text-[var(--on-surface)]">{level.timeToValue}</p>
                        </div>
                      </div>

                      {/* Prerequisites */}
                      {level.prerequisites && level.prerequisites.length > 0 && (
                        <div className="mb-4 p-3 rounded-lg bg-on-surface/5 border border-[var(--border)]">
                          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--on-surface-variant)] mb-2">Prerequisites</p>
                          <ul className="space-y-1">
                            {level.prerequisites.map((prereq, i) => (
                              <li key={i} className="text-xs text-[var(--on-surface)] flex items-start gap-2">
                                <span className="text-[var(--on-surface-variant)] mt-0.5">•</span>
                                {prereq}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Capabilities */}
                      <div className="mb-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-[var(--on-surface-variant)] mb-3">Capabilities to Implement</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {level.capabilities.map((capId) => {
                            const cap = CURRENT_CAPABILITIES.find(c => c.id === capId);
                            if (!cap) return null;

                            return (
                              <div
                                key={capId}
                                className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-on-surface/5 transition-all cursor-pointer"
                                onClick={() => {
                                  setSelectedCapability(cap);
                                  setShowRoadmap(null);
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl font-black" style={{ color: ERAS.find(e => e.id === cap.era).color }}>{cap.symbol}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-[var(--on-surface)] truncate">{cap.name}</p>
                                    <p className="text-[9px] text-[var(--on-surface-variant)] uppercase">{cap.era} AI</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-4">
                        {level.outcomes.map((outcome, i) => (
                          <div key={i} className="p-3 rounded-lg bg-on-surface/5 border border-[var(--border)] text-center">
                            <p className="text-[10px] text-[var(--on-surface)] leading-tight">{outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[var(--border)] bg-[var(--surface-container)] flex items-center justify-between">
              <div className="text-xs text-[var(--on-surface-variant)]">
                <span className="font-bold">{MATURITY_MODEL[showRoadmap.cloud][showRoadmap.channel].levels.length} maturity levels</span> from foundation to autonomous
              </div>
              <button
                onClick={() => setShowRoadmap(null)}
                className="px-6 py-3 rounded-xl bg-primary-container/10 border border-primary-container/30 text-primary-container font-bold text-sm uppercase tracking-wider hover:bg-primary-container hover:text-white transition-all"
              >
                Close
              </button>
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
