import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Loader2} from 'lucide-react';
import {Card,Btn,Badge,Ring,Field,inp,Head,TagInput,Demo} from '../components/ui';
import {useApp} from '../context';
import {ROLES,generateAnalysis} from '../services/analysis';
import {submitCareerProfile,analyzeCareer,generateRoadmap} from '../services/api';
const tone={High:'red',Medium:'amber',Low:'slate'};
export default function Analysis(){
  const nav=useNavigate(),{profile,setAnalyses,toast,setRoadmap,setRoadmapMeta,setDone}=useApp();
  const [f,setF]=useState({targetRole:profile.targetRole,skills:profile.skills,soft:[],experienceSummary:'',education:'Undergraduate',industry:'',hoursPerWeek:profile.hours});
  const [err,setErr]=useState({}),[busy,setBusy]=useState(false),[res,setRes]=useState(null),[gen,setGen]=useState(false);
  const set=k=>v=>setF(s=>({...s,[k]:v}));
  const validate=()=>{const e={};if(!f.targetRole)e.targetRole='Choose a target role.';if(!f.skills.length)e.skills='Add at least one technical skill.';
    if(f.experienceSummary.trim().length<10)e.experienceSummary='Describe your experience in at least 10 characters.';if(!(+f.hoursPerWeek>0&&+f.hoursPerWeek<=80))e.hoursPerWeek='Enter 1-80 hours.';return e};
  async function makeRoadmap(){
    setGen(true);
    const r=await generateRoadmap({targetRole:res.role,skills:f.skills,gaps:res.gaps,hoursPerWeek:+f.hoursPerWeek});
    setGen(false);
    if(r.ok){setRoadmap(r.data);setDone([]);setRoadmapMeta({ai:true,role:res.role});toast('Roadmap generated.')}
    else toast('Roadmap generation failed: '+r.message+' Showing the existing roadmap.','err');
    nav('/roadmap');
  }
  async function run(){
    const e=validate();setErr(e);if(Object.keys(e).length)return toast('Fix the highlighted fields.','err');
    setBusy(true);
    const [saved,ai]=await Promise.all([submitCareerProfile({targetRole:f.targetRole,skills:f.skills,experienceSummary:f.experienceSummary}),analyzeCareer(f)]);
    const a=ai.ok?{...ai.data,id:Date.now(),role:f.targetRole,date:new Date().toISOString().slice(0,10),demo:false}:await generateAnalysis(f);
    setBusy(false);setRes(a);setAnalyses(l=>[{id:a.id,role:a.role,date:a.date,fit:a.fit,demo:a.demo},...l]);
    if(!ai.ok)toast('AI analysis unavailable: '+ai.message+' Showing sample results.','err');if(saved.ok)toast('Profile saved to backend.');else{toast(saved.message,'err');if(saved.details)setErr({server:JSON.stringify(saved.details)})}
  }
  if(res)return <div className="space-y-6"><Head title="Analysis results" sub={res.role}><div className="flex items-center gap-2">{res.demo&&<Demo/>}<Btn v="ghost" onClick={()=>setRes(null)}>Edit inputs</Btn></div></Head>
    {res.demo&&<p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">Sample analysis computed in the browser. It is not AI output.</p>}
    <div className="grid gap-6 md:grid-cols-3"><Card className="flex flex-col items-center"><Ring value={res.fit}/><p className="mt-2 font-bold">Career fit</p></Card>
      <Card><h3 className="mb-2 font-bold">Strengths</h3><div className="flex flex-wrap gap-1.5">{res.strengths.map(s=><Badge key={s} tone="green">{s}</Badge>)}</div></Card>
      <Card><h3 className="mb-2 font-bold">Estimated timeline</h3><p className="text-3xl font-bold text-indigo-600">{res.weeks} weeks</p><p className="text-sm text-slate-500">at {f.hoursPerWeek} hrs/week</p></Card></div>
    <div className="grid gap-6 md:grid-cols-2"><Card><h3 className="mb-3 font-bold">Missing skills</h3>{res.gaps.length?res.gaps.map(g=><div key={g.skill} className="mb-2 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">{g.skill}<Badge tone={tone[g.priority]}>{g.priority} priority</Badge></div>):<p className="text-sm text-slate-500">No gaps found against the sample checklist.</p>}</Card>
      <Card><h3 className="mb-3 font-bold">Technologies to learn</h3><div className="mb-4 flex flex-wrap gap-1.5">{res.tech.map(t=><Badge key={t} tone="indigo">{t}</Badge>)}</div><h3 className="mb-2 font-bold">Suggested projects</h3><ul className="list-disc space-y-1 pl-5 text-sm">{res.projects.map(p=><li key={p}>{p}</li>)}</ul></Card></div>
    <Btn onClick={makeRoadmap} disabled={gen}>{gen&&<Loader2 size={16} className="animate-spin"/>}{gen?'Generating roadmap...':'Generate learning roadmap'}</Btn></div>;
  return <div><Head title="Career Analysis" sub="Tell us where you are and where you want to go."/>
    <Card className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Target job role" error={err.targetRole}><select className={inp} value={f.targetRole} onChange={e=>set('targetRole')(e.target.value)}>{ROLES.map(r=><option key={r}>{r}</option>)}</select></Field>
        <Field label="Education level"><select className={inp} value={f.education} onChange={e=>set('education')(e.target.value)}>{['High school','Undergraduate','Postgraduate','Other'].map(r=><option key={r}>{r}</option>)}</select></Field>
        <Field label="Preferred industry"><input className={inp} value={f.industry} onChange={e=>set('industry')(e.target.value)} placeholder="e.g. Fintech, Healthcare"/></Field>
        <Field label="Learning hours per week" error={err.hoursPerWeek}><input type="number" className={inp} value={f.hoursPerWeek} onChange={e=>set('hoursPerWeek')(e.target.value)}/></Field></div>
      <Field label="Technical skills (press Enter to add)" error={err.skills}><TagInput tags={f.skills} onChange={set('skills')} placeholder="Add a skill"/></Field>
      <Field label="Soft skills"><TagInput tags={f.soft} onChange={set('soft')} placeholder="Add a soft skill"/></Field>
      <Field label="Experience summary" error={err.experienceSummary}><textarea rows={4} className={inp} value={f.experienceSummary} onChange={e=>set('experienceSummary')(e.target.value)} placeholder="Built a React frontend and learned to create REST APIs using Node.js."/></Field>
      {err.server&&<p role="alert" className="text-sm text-red-600">Server validation: {err.server}</p>}
      <Btn onClick={run} disabled={busy}>{busy&&<Loader2 size={16} className="animate-spin"/>}{busy?'Analyzing...':'Analyze My Career'}</Btn></Card></div>;
}
