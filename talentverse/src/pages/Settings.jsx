import {Card,Head,Field,inp} from '../components/ui';
import {useApp} from '../context';
const Toggle=({label,k,s,set})=><label className="flex cursor-pointer items-center justify-between py-2 text-sm"><span>{label}</span><input type="checkbox" role="switch" className="h-5 w-5 accent-indigo-600" checked={s[k]} onChange={e=>set({...s,[k]:e.target.checked})}/></label>;
const ACC=[['aurora','Aurora','#14b8a6'],['sunset','Sunset','#f97316'],['violet','Violet','#8b5cf6'],['emerald','Emerald','#10b981']];
export default function SettingsPage(){
  const {settings:s,setSettings:set,toast}=useApp();
  return <div><Head title="Settings" sub="Saved on this device."/><div className="grid max-w-3xl gap-6">
    <Card><h3 className="mb-3 font-bold">Theme</h3><Field label="Theme preference"><select className={inp} value={s.theme} onChange={e=>{set({...s,theme:e.target.value});toast('Theme preference saved.')}}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></Field></Card>
    <Card><h3 className="mb-3 font-bold">Accent color</h3><div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Accent color">{ACC.map(([k,l,c])=>{const on=(s.accent||'aurora')===k;return <button key={k} role="radio" aria-checked={on} onClick={()=>set({...s,accent:k})} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium ${on?'border-indigo-500 bg-indigo-50 text-indigo-700':'border-slate-200 text-slate-700'}`}><span className="h-4 w-4 rounded-full" style={{background:c}}/>{l}</button>})}</div></Card>
    <Card><h3 className="mb-1 font-bold">Notifications</h3><Toggle label="Email updates" k="emailUpdates" s={s} set={set}/><Toggle label="Weekly progress digest" k="weeklyDigest" s={s} set={set}/><Toggle label="Study reminders" k="reminders" s={s} set={set}/></Card>
    <Card><h3 className="mb-1 font-bold">Profile preferences</h3><Toggle label="Show my email on my profile" k="showEmail" s={s} set={set}/></Card></div></div>;
}
