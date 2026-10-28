import {useState} from 'react';
import {Plus,Pencil,Trash2} from 'lucide-react';
import {Card,Btn,Badge,Progress,Field,inp,Modal,Head,Empty} from '../components/ui';
import {useApp} from '../context';
import {suggestedSkills} from '../services/analysis';
const LV={Beginner:33,Intermediate:66,Advanced:100},blank={name:'',type:'technical',category:'',level:'Beginner'};
export default function Skills(){
  const {skills,setSkills,profile,toast}=useApp();
  const [q,setQ]=useState(''),[type,setType]=useState('all'),[lv,setLv]=useState('all'),[edit,setEdit]=useState(null),[err,setErr]=useState('');
  const list=skills.filter(s=>(type==='all'||s.type===type)&&(lv==='all'||s.level===lv)&&(s.name+s.category).toLowerCase().includes(q.toLowerCase()));
  const have=skills.map(s=>s.name.toLowerCase()),sug=suggestedSkills(profile.targetRole).filter(s=>!have.includes(s.toLowerCase()));
  const save=()=>{const n=edit.name.trim();if(!n)return setErr('Skill name is required.');
    if(skills.some(s=>s.id!==edit.id&&s.name.toLowerCase()===n.toLowerCase()))return setErr('This skill already exists.');
    const s={...edit,name:n,category:edit.category.trim()||'General'};
    setSkills(l=>edit.id?l.map(x=>x.id===edit.id?s:x):[...l,{...s,id:Date.now()}]);toast(edit.id?'Skill updated.':'Skill added.');setEdit(null);setErr('')};
  const open=s=>{setErr('');setEdit(s)};
  return <div><Head title="My Skills" sub="Keep your skills current so analyses stay useful."><Btn onClick={()=>open(blank)}><Plus size={16}/>Add skill</Btn></Head>
    <div className="mb-4 flex flex-wrap gap-2"><input aria-label="Search skills" placeholder="Search skills" className={`${inp} max-w-xs`} value={q} onChange={e=>setQ(e.target.value)}/>
      <select aria-label="Filter by type" className={`${inp} w-auto`} value={type} onChange={e=>setType(e.target.value)}><option value="all">All types</option><option value="technical">Technical</option><option value="soft">Soft</option></select>
      <select aria-label="Filter by level" className={`${inp} w-auto`} value={lv} onChange={e=>setLv(e.target.value)}><option value="all">All levels</option>{Object.keys(LV).map(l=><option key={l}>{l}</option>)}</select></div>
    {list.length?<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(s=><Card key={s.id}><div className="flex items-start justify-between"><div><h3 className="font-bold">{s.name}</h3><p className="text-xs text-slate-500">{s.category}</p></div><Badge tone={s.type==='soft'?'indigo':'slate'}>{s.type}</Badge></div>
      <div className="my-3"><div className="mb-1 text-xs text-slate-500">{s.level}</div><Progress value={LV[s.level]}/></div>
      <div className="flex gap-2"><Btn v="ghost" onClick={()=>open(s)} aria-label={`Edit ${s.name}`}><Pencil size={14}/></Btn><Btn v="danger" aria-label={`Remove ${s.name}`} onClick={()=>{setSkills(l=>l.filter(x=>x.id!==s.id));toast('Skill removed.')}}><Trash2 size={14}/></Btn></div></Card>)}</div>
      :<Empty>No skills match. Clear filters or add a new skill.</Empty>}
    <Card className="mt-6"><h3 className="mb-1 font-bold">Suggested for {profile.targetRole}</h3><p className="mb-3 text-sm text-slate-500">From a sample checklist. Click to add.</p>
      <div className="flex flex-wrap gap-2">{sug.length?sug.map(s=><button key={s} onClick={()=>open({...blank,name:s})} className="rounded-full border border-dashed border-indigo-300 px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-50">+ {s}</button>):<Badge tone="green">You have all suggested skills</Badge>}</div></Card>
    {edit&&<Modal title={edit.id?'Edit skill':'Add skill'} onClose={()=>setEdit(null)}><div className="space-y-3">
      <Field label="Name" error={err}><input autoFocus className={inp} value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})}/></Field>
      <Field label="Category"><input className={inp} value={edit.category} onChange={e=>setEdit({...edit,category:e.target.value})} placeholder="e.g. Frontend"/></Field>
      <Field label="Type"><select className={inp} value={edit.type} onChange={e=>setEdit({...edit,type:e.target.value})}><option value="technical">Technical</option><option value="soft">Soft</option></select></Field>
      <Field label="Proficiency"><select className={inp} value={edit.level} onChange={e=>setEdit({...edit,level:e.target.value})}>{Object.keys(LV).map(l=><option key={l}>{l}</option>)}</select></Field>
      <Btn onClick={save} className="w-full">Save skill</Btn></div></Modal>}</div>;
}
