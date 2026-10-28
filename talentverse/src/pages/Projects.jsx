import {useState} from 'react';
import {Plus,Trash2,ExternalLink} from 'lucide-react';
import {Card,Btn,Badge,Field,inp,Modal,Head,Empty} from '../components/ui';
import {useApp} from '../context';
import {experience} from '../data/mock';
import {projectsFor} from '../services/analysis';
const blank={name:'',description:'',tech:'',github:'',demo:'',status:'Planned'},tone={Planned:'slate','In progress':'amber',Completed:'green'};
const okUrl=u=>!u||/^https?:\/\/.+\..+/.test(u);
export default function Projects(){
  const {projects,setProjects,profile,toast}=useApp();const [f,setF]=useState(null),[e,setE]=useState({});
  const save=()=>{const x={};if(!f.name.trim())x.name='Project name is required.';if(f.description.trim().length<10)x.description='Add a short description (10+ characters).';
    if(!okUrl(f.github))x.github='Enter a valid http(s) URL.';if(!okUrl(f.demo))x.demo='Enter a valid http(s) URL.';setE(x);if(Object.keys(x).length)return;
    setProjects(l=>[...l,{...f,id:Date.now(),tech:f.tech.split(',').map(t=>t.trim()).filter(Boolean)}]);toast('Project added.');setF(null)};
  const s=k=>e=>setF({...f,[k]:e.target.value});
  return <div className="space-y-8"><section><Head title="Projects & Experience" sub="Your portfolio at a glance."><Btn onClick={()=>{setE({});setF(blank)}}><Plus size={16}/>Add project</Btn></Head>
    {projects.length?<div className="grid gap-4 md:grid-cols-2">{projects.map(p=><Card key={p.id}><div className="flex items-start justify-between"><h3 className="font-bold">{p.name}</h3><Badge tone={tone[p.status]}>{p.status}</Badge></div>
      <p className="my-2 text-sm text-slate-600">{p.description}</p><div className="mb-3 flex flex-wrap gap-1.5">{p.tech.map(t=><Badge key={t} tone="indigo">{t}</Badge>)}</div>
      <div className="flex items-center gap-3 text-sm">{p.github&&<a className="flex items-center gap-1 text-indigo-600" href={p.github} target="_blank" rel="noreferrer">GitHub<ExternalLink size={12}/></a>}{p.demo&&<a className="flex items-center gap-1 text-indigo-600" href={p.demo} target="_blank" rel="noreferrer">Live demo<ExternalLink size={12}/></a>}
        <button className="ml-auto text-red-500" aria-label={`Delete ${p.name}`} onClick={()=>{setProjects(l=>l.filter(x=>x.id!==p.id));toast('Project removed.')}}><Trash2 size={16}/></button></div></Card>)}</div>
      :<Empty>No projects yet. Add your first one.</Empty>}</section>
    <section><h2 className="mb-3 text-lg font-bold">Experience <span className="text-sm font-normal text-slate-500">(sample entries)</span></h2><div className="grid gap-4 md:grid-cols-2">{experience.map(x=><Card key={x.id}><h3 className="font-bold">{x.title}</h3><p className="text-sm text-slate-500">{x.org} · {x.period}</p><p className="mt-2 text-sm">{x.note}</p></Card>)}</div></section>
    <section><h2 className="mb-3 text-lg font-bold">Recommended for {profile.targetRole}</h2><div className="grid gap-4 md:grid-cols-3">{projectsFor(profile.targetRole).map(p=><Card key={p}><p className="text-sm font-medium">{p}</p></Card>)}</div></section>
    {f&&<Modal title="Add project" onClose={()=>setF(null)}><div className="space-y-3">
      <Field label="Project name" error={e.name}><input autoFocus className={inp} value={f.name} onChange={s('name')}/></Field>
      <Field label="Description" error={e.description}><textarea rows={3} className={inp} value={f.description} onChange={s('description')}/></Field>
      <Field label="Technologies (comma separated)"><input className={inp} value={f.tech} onChange={s('tech')}/></Field>
      <Field label="GitHub URL" error={e.github}><input className={inp} value={f.github} onChange={s('github')} placeholder="https://github.com/..."/></Field>
      <Field label="Live demo URL" error={e.demo}><input className={inp} value={f.demo} onChange={s('demo')}/></Field>
      <Field label="Status"><select className={inp} value={f.status} onChange={s('status')}>{Object.keys(tone).map(t=><option key={t}>{t}</option>)}</select></Field>
      <Btn onClick={save} className="w-full">Save project</Btn></div></Modal>}</div>;
}
