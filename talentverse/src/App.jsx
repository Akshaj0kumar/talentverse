import {useState} from 'react';
import {Routes,Route,NavLink,useLocation} from 'react-router-dom';
import {LayoutDashboard,Sparkles,Wrench,Milestone,FolderGit2,Briefcase,User,Settings as Cog,Search,Bell,Menu,PanelLeftClose,PanelLeftOpen,CheckCircle2,AlertCircle,Hexagon,Sun,Moon} from 'lucide-react';
import {useApp} from './context';
import Overview from './pages/Overview';import Analysis from './pages/Analysis';import Skills from './pages/Skills';import Roadmap from './pages/Roadmap';
import Projects from './pages/Projects';import Opportunities from './pages/Opportunities';import Profile from './pages/Profile';import SettingsPage from './pages/Settings';
const NAV=[['/','Overview',LayoutDashboard,Overview],['/analysis','Career Analysis',Sparkles,Analysis],['/skills','My Skills',Wrench,Skills],['/roadmap','Learning Roadmap',Milestone,Roadmap],['/projects','Projects & Experience',FolderGit2,Projects],['/opportunities','Career Opportunities',Briefcase,Opportunities],['/profile','My Profile',User,Profile],['/settings','Settings',Cog,SettingsPage]];
export default function App(){
  const {toasts,profile,settings,setSettings}=useApp();const dark=settings.theme==='dark';const {pathname}=useLocation();
  const [collapsed,setCollapsed]=useState(false),[open,setOpen]=useState(false),[menu,setMenu]=useState(false);
  const title=(NAV.find(n=>n[0]===pathname)||NAV[0])[1];
  const side=(slim)=><nav aria-label="Main" className="flex h-full flex-col gap-1 p-3">
    <div className="mb-4 flex items-center gap-2 px-2 py-2 text-lg font-bold text-slate-900"><Hexagon className="shrink-0 text-indigo-600" size={26}/>{!slim&&'TalentVerse'}</div>
    {NAV.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)} title={label} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive?'bg-indigo-50 text-indigo-700':'text-slate-600 hover:bg-slate-50'}`}><Icon size={18} className="shrink-0"/>{!slim&&label}</NavLink>)}</nav>;
  return <div className="flex min-h-screen">
    <aside className={`sticky top-0 hidden h-screen shrink-0 border-r border-slate-200 bg-white transition-all md:block ${collapsed?'w-[72px]':'w-64'}`}>{side(collapsed)}</aside>
    {open&&<div className="fixed inset-0 z-40 bg-slate-900/40 md:hidden" onClick={()=>setOpen(false)}><aside className="h-full w-64 bg-white" onClick={e=>e.stopPropagation()}>{side(false)}</aside></div>}
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <button className="md:hidden" aria-label="Open menu" onClick={()=>setOpen(true)}><Menu/></button>
        <button className="hidden md:block" aria-label="Toggle sidebar" onClick={()=>setCollapsed(c=>!c)}>{collapsed?<PanelLeftOpen size={20}/>:<PanelLeftClose size={20}/>}</button>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        <div className="relative ml-auto hidden max-w-xs flex-1 sm:block"><Search size={16} className="absolute left-3 top-2.5 text-slate-400"/><input aria-label="Search" placeholder="Search" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100"/></div>
        <button aria-label={dark?"Switch to light theme":"Switch to dark theme"} onClick={()=>setSettings(s=>({...s,theme:dark?"light":"dark"}))} className="ml-auto rounded-xl p-2 hover:bg-slate-50 sm:ml-0">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
        <button aria-label="Notifications" className="rounded-xl p-2 hover:bg-slate-50"><Bell size={18}/></button>
        <div className="relative"><button onClick={()=>setMenu(m=>!m)} aria-label="Profile menu" className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{profile.name[0]}</button>
          {menu&&<div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 text-sm shadow-lg">{[['/profile','My Profile'],['/settings','Settings']].map(([to,l])=><NavLink key={to} to={to} onClick={()=>setMenu(false)} className="block rounded-lg px-3 py-2 hover:bg-slate-50">{l}</NavLink>)}</div>}</div>
      </header>
      <main className="mx-auto max-w-6xl p-4 md:p-8"><Routes>{NAV.map(([to,,,C])=><Route key={to} path={to} element={<C/>}/>)}<Route path="*" element={<Overview/>}/></Routes></main>
    </div>
    <div className="fixed bottom-4 right-4 z-[60] space-y-2" aria-live="polite">{toasts.map(t=><div key={t.id} className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${t.type==='ok'?'bg-slate-900 text-white':'bg-red-600 text-white'}`}>{t.type==='ok'?<CheckCircle2 size={16}/>:<AlertCircle size={16}/>}{t.msg}</div>)}</div>
  </div>;
}
