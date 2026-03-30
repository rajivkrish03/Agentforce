import React from 'react';

function App() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-8 h-20 shadow-[0_8px_32px_0_rgba(1,118,211,0.1)]">
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
          <a className="group px-6 py-3 flex items-center gap-4 text-slate-500 hover:bg-white/5 transition-all" href="#">
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">analytics</span>
            <span className="font-headline text-sm font-semibold uppercase tracking-widest">Predictive</span>
          </a>
          <a className="group px-6 py-3 flex items-center gap-4 text-slate-500 hover:bg-white/5 transition-all" href="#">
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">auto_awesome</span>
            <span className="font-headline text-sm font-semibold uppercase tracking-widest">Generative</span>
          </a>
          <a className="group px-6 py-3 flex items-center gap-4 bg-[#0176D3]/10 text-[#0176D3] border-r-4 border-[#0176D3]" href="#">
            <span className="material-symbols-outlined">memory</span>
            <span className="font-headline text-sm font-semibold uppercase tracking-widest">Agentic</span>
          </a>
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
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary-container text-white cursor-pointer uppercase tracking-widest">All</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-surface-container-highest text-on-surface-variant hover:text-white cursor-pointer uppercase tracking-widest transition-colors">Predictive AI</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-surface-container-highest text-on-surface-variant hover:text-white cursor-pointer uppercase tracking-widest transition-colors">Generative AI</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-surface-container-highest text-on-surface-variant hover:text-white cursor-pointer uppercase tracking-widest transition-colors border border-primary/20">Agentic AI</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-1">Status: Operational</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-bold">142 Active Nodes</span>
            </div>
          </div>
        </header>

        <div className="periodic-grid">
          <div className="col-span-12 mb-4 border-l-2 border-primary/30 pl-4 py-1">
            <h3 className="text-on-surface-variant text-xs font-black uppercase tracking-[0.3em]">Predictive Era / The Foundation</h3>
          </div>
          <div className="col-span-2 group">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-primary cursor-pointer relative overflow-hidden h-40 flex flex-col justify-between">
              <div className="absolute -right-2 -top-2 opacity-10">
                <span className="material-symbols-outlined text-8xl">analytics</span>
              </div>
              <span className="text-4xl font-black text-primary leading-none">Pr</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Propensity</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Modeling</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-primary cursor-pointer relative overflow-hidden h-40 flex flex-col justify-between">
              <span className="text-4xl font-black text-primary leading-none">Cs</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Case</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Classification</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-primary cursor-pointer relative overflow-hidden h-40 flex flex-col justify-between">
              <span className="text-4xl font-black text-primary leading-none">Rt</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Routing</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Intelligence</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 mt-12 mb-4 border-l-2 border-secondary-container/30 pl-4 py-1">
            <h3 className="text-on-surface-variant text-xs font-black uppercase tracking-[0.3em]">Generative Era / The Assistant</h3>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-secondary cursor-pointer relative overflow-hidden h-40 flex flex-col justify-between">
              <div className="absolute -right-2 -top-2 opacity-10">
                <span className="material-symbols-outlined text-8xl">auto_awesome</span>
              </div>
              <span className="text-4xl font-black text-secondary-container leading-none">Sm</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Service</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Summaries</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-secondary cursor-pointer relative overflow-hidden h-40 flex flex-col justify-between">
              <span className="text-4xl font-black text-secondary-container leading-none">Kb</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Knowledge</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Creation</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-secondary cursor-pointer relative overflow-hidden h-40 flex flex-col justify-between">
              <span className="text-4xl font-black text-secondary-container leading-none">Ra</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Reply</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Assist</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-secondary cursor-pointer relative overflow-hidden h-40 flex flex-col justify-between">
              <span className="text-4xl font-black text-secondary-container leading-none">Ep</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Email</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Personalization</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 mt-12 mb-4 border-l-2 border-tertiary-container/30 pl-4 py-1">
            <h3 className="text-on-surface-variant text-xs font-black uppercase tracking-[0.3em]">Agentic Era / Autonomous Force</h3>
          </div>
          <div className="col-span-3">
            <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 transition-all duration-300 neon-glow-tertiary cursor-pointer relative overflow-hidden h-48 flex flex-col justify-between ring-1 ring-tertiary-container/20">
              <div className="absolute -right-4 -top-4 opacity-10">
                <span className="material-symbols-outlined text-9xl">memory</span>
              </div>
              <span className="text-5xl font-black text-tertiary-container leading-none">Af</span>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-widest">Agentforce</p>
                <p className="text-xs text-on-surface-variant uppercase font-semibold">Autonomous Core</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-tertiary cursor-pointer relative overflow-hidden h-48 flex flex-col justify-between">
              <span className="text-4xl font-black text-tertiary-container leading-none">Ar</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Auto</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Resolution</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-tertiary cursor-pointer relative overflow-hidden h-48 flex flex-col justify-between">
              <span className="text-4xl font-black text-tertiary-container leading-none">Pa</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Proactive</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Action</p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 transition-all duration-300 neon-glow-tertiary cursor-pointer relative overflow-hidden h-48 flex flex-col justify-between">
              <span className="text-4xl font-black text-tertiary-container leading-none">Me</span>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Multi-modal</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Engagement</p>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="bg-surface-container-low/50 p-6 rounded-xl border border-dashed border-white/10 flex flex-col justify-center items-center text-center h-48 opacity-40">
              <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Extended Nodes Coming Soon</p>
            </div>
          </div>
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

      <div className="hidden fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm">
        <div className="bg-surface-container-low max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="flex h-[500px]">
            <div className="w-1/3 bg-tertiary-container p-12 flex flex-col justify-between">
              <span className="text-8xl font-black text-white">Af</span>
              <div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">Agentforce Autonomous Core</h4>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 rounded bg-black/20 text-[10px] font-bold text-white uppercase">Agentic Era</span>
                </div>
              </div>
            </div>
            <div className="w-2/3 p-12 flex flex-col justify-between relative">
              <button className="absolute top-8 right-8 text-on-surface-variant hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <div>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Functional Description</p>
                <h5 className="text-3xl font-bold text-white mb-6">The heartbeat of autonomous service orchestration.</h5>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  Agentforce Core manages the transition from simple chatbots to sophisticated agents. Using advanced reasoning and planning, it breaks down complex customer requests into actionable tasks, coordinating between CRM data and external systems without human intervention.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-container rounded-xl">
                    <p className="text-[10px] text-primary font-bold uppercase mb-1">Reasoning Model</p>
                    <p className="text-white text-sm">Atlas Reasoning Engine</p>
                  </div>
                  <div className="p-4 bg-surface-container rounded-xl">
                    <p className="text-[10px] text-secondary-container font-bold uppercase mb-1">Knowledge Base</p>
                    <p className="text-white text-sm">Data Cloud Real-time Sync</p>
                  </div>
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
    </>
  );
}

export default App;
