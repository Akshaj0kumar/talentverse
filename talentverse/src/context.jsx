import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import {storage} from './services/storage';
import * as M from './data/mock';
const Ctx=createContext();
export const useApp=()=>useContext(Ctx);
function usePersisted(k,d){const [v,s]=useState(()=>storage.get(k,d));useEffect(()=>{storage.set(k,v)},[k,v]);return [v,s]}
export function AppProvider({children}){
  const [skills,setSkills]=usePersisted('skills',M.skills);
  const [done,setDone]=usePersisted('roadmapDone',['0-0','0-1','1-0']);
  const [projects,setProjects]=usePersisted('projects',M.projects);
  const [profile,setProfile]=usePersisted('profile',M.profile);
  const [settings,setSettings]=usePersisted('settings',M.settings);
  useEffect(()=>{const mq=window.matchMedia('(prefers-color-scheme: dark)');const apply=()=>document.documentElement.classList.toggle('dark',settings.theme==='dark'||(settings.theme==='system'&&mq.matches));apply();mq.addEventListener('change',apply);return()=>mq.removeEventListener('change',apply)},[settings.theme]);
  useEffect(()=>{document.documentElement.dataset.accent=settings.accent||'aurora'},[settings.accent]);
  const [analyses,setAnalyses]=usePersisted('analyses',M.analyses);
  const [roadmap,setRoadmap]=usePersisted('roadmap',M.roadmap);
  const [roadmapMeta,setRoadmapMeta]=usePersisted('roadmapMeta',{ai:false,role:'Full-Stack Developer'});
  const [toasts,setToasts]=useState([]);
  const toast=useCallback((msg,type='ok')=>{const id=Math.random();setToasts(t=>[...t,{id,msg,type}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3500)},[]);
  const total=roadmap.reduce((n,w)=>n+w[3].length,0);
  const progress=Math.round(100*done.length/total);
  return <Ctx.Provider value={{skills,setSkills,done,setDone,projects,setProjects,profile,setProfile,settings,setSettings,analyses,setAnalyses,roadmap,setRoadmap,roadmapMeta,setRoadmapMeta,toasts,toast,progress}}>{children}</Ctx.Provider>;
}
