import {useNavigate} from 'react-router-dom';
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer} from 'recharts';
import {Card,Btn,Ring,Progress,Badge,Demo} from '../components/ui';
import {useApp} from '../context';
import {weekly} from '../data/mock';
import {projectsFor,suggestedSkills} from '../services/analysis';
const LV={Beginner:33,Intermediate:66,Advanced:100};
export default function Overview(){
  const nav=useNavigate(),{skills,done,progress,profile,analyses,roadmap}=useApp();
  const req=suggestedSkills(profile.targetRole),have=skills.map(s=>s.name.toLowerCase());
  const gaps=req.filter(s=>!have.includes(s.toLowerCase()));
  const readiness=Math.round(100*(req.length-gaps.length)/req.length);
  const next=roadmap.flatMap((w,wi)=>w[3].map((t,ti)=>({id:`${wi}-${ti}`,week:wi+1,t:t[0],h:t[1]}))).filter(t=>!done.includes(t.id)).slice(0,3);
  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-bold">Welcome back, <span className="accent-text">{profile.name}</span>!</h1><p className="mt-1 text-slate-500">Your next career milestone starts here.</p></div>
      <div className="flex flex-wrap gap-2"><Btn onClick={()=>nav('/analysis')}>Analyze My Career</Btn><Btn v="ghost" onClick={()=>nav('/skills')}>Update Skills</Btn><Btn v="ghost" onClick={()=>nav('/roadmap')}>View Roadmap</Btn></div></div>
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="flex items-center gap-5"><Ring value={readiness}/><div><div className="flex items-center gap-2"><h3 className="font-bold">Career Readiness</h3><Demo/></div><p className="mt-1 text-sm text-slate-500">Skills you list vs. a sample {profile.targetRole} checklist. Not an AI score.</p></div></Card>
      <Card><h3 className="font-bold">Target role</h3><p className="mt-1 text-xl font-bold text-indigo-600">{profile.targetRole}</p><p className="mt-1 text-sm text-slate-500">{profile.hours} hrs/week available</p><h3 className="mt-4 font-bold">Skill gaps ({gaps.length})</h3><div className="mt-2 flex flex-wrap gap-1.5">{gaps.length?gaps.map(g=><Badge key={g} tone="red">{g}</Badge>):<Badge tone="green">No gaps against the sample checklist</Badge>}</div></Card>
      <Card><h3 className="font-bold">Roadmap progress</h3><p className="my-2 text-3xl font-bold text-slate-900">{progress}%</p><Progress value={progress}/><p className="mt-2 text-sm text-slate-500">{done.length} tasks done (sample roadmap)</p></Card></div>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><h3 className="mb-3 font-bold">Skill proficiency</h3><div className="space-y-3">{skills.filter(s=>s.type==='technical').slice(0,6).map(s=><div key={s.id}><div className="mb-1 flex justify-between text-sm"><span>{s.name}</span><span className="text-slate-500">{s.level}</span></div><Progress value={LV[s.level]}/></div>)}</div></Card>
      <Card><div className="mb-3 flex items-center gap-2"><h3 className="font-bold">Weekly learning (hours)</h3><Demo/></div><div className="h-52"><ResponsiveContainer><BarChart data={weekly}><XAxis dataKey="d" tickLine={false} axisLine={false}/><YAxis width={28} tickLine={false} axisLine={false}/><Tooltip/><Bar dataKey="h" fill="#6366f1" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></Card></div>
    <div className="grid gap-6 lg:grid-cols-3">
      <Card><h3 className="mb-3 font-bold">Continue learning</h3>{next.length?next.map(t=><div key={t.id} className="mb-2 rounded-xl bg-slate-50 p-3 text-sm"><p className="font-medium">{t.t}</p><p className="text-slate-500">Week {t.week} · {t.h} h</p></div>):<p className="text-sm text-slate-500">All sample tasks complete.</p>}</Card>
      <Card><h3 className="mb-3 font-bold">Recommended projects</h3><ul className="space-y-2 text-sm">{projectsFor(profile.targetRole).map(p=><li key={p} className="rounded-xl bg-slate-50 p-3">{p}</li>)}</ul></Card>
      <Card><h3 className="mb-3 font-bold">Recent analyses</h3><ul className="space-y-2 text-sm">{analyses.slice(0,4).map(a=><li key={a.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>{a.role}<span className="block text-xs text-slate-500">{a.date}</span></span><Badge tone="indigo">{a.fit}% fit</Badge></li>)}</ul></Card></div>
  </div>;
}
