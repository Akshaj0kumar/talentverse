import {useState} from 'react';
import {Card,Badge,Head,Empty,inp} from '../components/ui';
import {opportunities} from '../data/mock';
import {ROLES} from '../services/analysis';
export default function Opportunities(){
  const [role,setRole]=useState('all'),[type,setType]=useState('all'),[sk,setSk]=useState('');
  const list=opportunities.filter(o=>(role==='all'||o.role===role)&&(type==='all'||o.type===type)&&o.skills.join(' ').toLowerCase().includes(sk.toLowerCase()));
  return <div><Head title="Career Opportunities" sub="Sample listings for demonstration. These are not live jobs."/>
    <div className="mb-4 flex flex-wrap gap-2"><select aria-label="Role" className={`${inp} w-auto`} value={role} onChange={e=>setRole(e.target.value)}><option value="all">All roles</option>{ROLES.map(r=><option key={r}>{r}</option>)}</select>
      <select aria-label="Type" className={`${inp} w-auto`} value={type} onChange={e=>setType(e.target.value)}><option value="all">All types</option><option>Internship</option><option>Entry-level</option></select>
      <input aria-label="Filter by skill" placeholder="Filter by skill" className={`${inp} max-w-xs`} value={sk} onChange={e=>setSk(e.target.value)}/></div>
    {list.length?<div className="grid gap-4 md:grid-cols-2">{list.map(o=><Card key={o.id}><div className="flex items-start justify-between"><h3 className="font-bold">{o.title}</h3><Badge tone={o.type==='Internship'?'indigo':'green'}>{o.type}</Badge></div>
      <p className="my-2 text-sm text-slate-600">{o.desc}</p><div className="mb-3 flex flex-wrap gap-1.5">{o.skills.map(s=><Badge key={s}>{s}</Badge>)}</div>
      <div className="flex items-center justify-between text-sm text-slate-500"><span>Experience: {o.exp}</span><a href="#" onClick={e=>e.preventDefault()} className="font-semibold text-indigo-600">Apply (placeholder)</a></div></Card>)}</div>
      :<Empty>No sample opportunities match these filters.</Empty>}</div>;
}
