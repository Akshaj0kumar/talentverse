const BASE=import.meta.env.VITE_API_BASE_URL||'http://localhost:5000';
/** POST /api/career/profiles -> {ok,data} | {ok:false,type:'validation'|'network',message,details} */
export async function submitCareerProfile({targetRole,skills,experienceSummary}){
  try{
    const r=await fetch(`${BASE}/api/career/profiles`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({targetRole,skills,experienceSummary})});
    const d=await r.json().catch(()=>null);
    if(!r.ok)return{ok:false,type:'validation',message:d?.message||d?.error||`Request failed (${r.status})`,details:d?.errors||d?.details||null};
    return{ok:true,data:d};
  }catch{return{ok:false,type:'network',message:`Cannot reach the backend at ${BASE}. Is it running?`}}
}

/** POST /api/career/analyze -> {ok,data} | {ok:false,message}. Needs the backend /analyze route + GEMINI_API_KEY. */
export async function analyzeCareer(p){
  try{
    const r=await fetch(`${BASE}/api/career/analyze`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({targetRole:p.targetRole,skills:p.skills,softSkills:p.soft,experienceSummary:p.experienceSummary,education:p.education,industry:p.industry,hoursPerWeek:+p.hoursPerWeek})});
    const d=await r.json().catch(()=>null);
    return r.ok&&d?.analysis?{ok:true,data:d.analysis}:{ok:false,message:d?.message||`Request failed (${r.status})`};
  }catch{return{ok:false,message:'Cannot reach the backend.'}}
}

/** POST /api/career/roadmap -> {ok,data:[[title,skills,resource,[[task,hours],...]],...]} | {ok:false,message} */
export async function generateRoadmap({targetRole,skills,gaps,hoursPerWeek}){
  try{
    const r=await fetch(`${BASE}/api/career/roadmap`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({targetRole,skills,gaps,hoursPerWeek})});
    const d=await r.json().catch(()=>null);
    if(!r.ok||!d?.roadmap)return{ok:false,message:d?.message||`Request failed (${r.status})`};
    return{ok:true,data:d.roadmap.weeks.map(w=>[w.title,w.skills,w.resource,w.tasks.map(t=>[t.text,t.hours])])};
  }catch{return{ok:false,message:'Cannot reach the backend.'}}
}
