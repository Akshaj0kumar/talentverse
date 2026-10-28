import {useState} from 'react';
import {Card,Btn,Field,inp,Head,TagInput} from '../components/ui';
import {useApp} from '../context';
import {ROLES} from '../services/analysis';
export default function Profile(){
  const {profile,setProfile,toast}=useApp();const [f,setF]=useState(profile),[e,setE]=useState({});
  const s=k=>v=>setF(x=>({...x,[k]:v.target?v.target.value:v}));
  const save=()=>{const x={};if(!f.name.trim())x.name='Name is required.';if(!/^(19|20)\d{2}$/.test(f.gradYear))x.gradYear='Enter a 4-digit year.';if(!(+f.hours>0&&+f.hours<=80))x.hours='Enter 1-80 hours.';
    setE(x);if(Object.keys(x).length)return toast('Fix the highlighted fields.','err');setProfile({...f,hours:+f.hours});toast('Profile saved.')};
  return <div><Head title="My Profile" sub="Sample data. Edit it to match you."/><Card className="max-w-3xl space-y-4"><div className="grid gap-4 md:grid-cols-2">
    <Field label="Student name" error={e.name}><input className={inp} value={f.name} onChange={s('name')}/></Field>
    <Field label="Degree"><input className={inp} value={f.degree} onChange={s('degree')}/></Field>
    <Field label="University"><input className={inp} value={f.university} onChange={s('university')}/></Field>
    <Field label="Graduation year" error={e.gradYear}><input className={inp} value={f.gradYear} onChange={s('gradYear')}/></Field>
    <Field label="Target job role"><select className={inp} value={f.targetRole} onChange={s('targetRole')}>{ROLES.map(r=><option key={r}>{r}</option>)}</select></Field>
    <Field label="Weekly learning hours" error={e.hours}><input type="number" className={inp} value={f.hours} onChange={s('hours')}/></Field></div>
    <Field label="Career interests"><input className={inp} value={f.interests} onChange={s('interests')}/></Field>
    <Field label="Technical skills"><TagInput tags={f.skills} onChange={s('skills')} placeholder="Add a skill"/></Field>
    <Btn onClick={save}>Save profile</Btn></Card></div>;
}
