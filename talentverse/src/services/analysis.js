// MOCK analysis. Replace generateAnalysis with a real API call once the backend supports it.
export const ROLES=['Full-Stack Developer','AI Engineer','Data Analyst','Software Development Engineer'];
const REQ={
 'Full-Stack Developer':[['TypeScript','High'],['PostgreSQL','High'],['Docker','Medium'],['Testing','Medium'],['CI/CD','Low'],['React','High'],['Node.js','High']],
 'AI Engineer':[['Python','High'],['PyTorch','High'],['Machine Learning','High'],['LLM APIs','Medium'],['MLOps','Low'],['SQL','Medium']],
 'Data Analyst':[['SQL','High'],['Python','High'],['Power BI','Medium'],['Statistics','High'],['Excel','Low']],
 'Software Development Engineer':[['Data Structures','High'],['System Design','High'],['Git','Medium'],['Testing','Medium'],['Java','Medium'],['Docker','Low']]};
const PROJ={
 'Full-Stack Developer':['Job tracker with auth and REST API','Real-time chat app','E-commerce store with test-mode payments'],
 'AI Engineer':['RAG chatbot over course notes','Image classifier with a small web UI','Resume-to-job matcher'],
 'Data Analyst':['Sales dashboard in Power BI','Exploratory analysis of a public dataset','A/B test analysis write-up'],
 'Software Development Engineer':['Rate limiter library','URL shortener with caching','Mini key-value store']};
export const suggestedSkills=r=>(REQ[r]||REQ[ROLES[0]]).map(x=>x[0]);
export const projectsFor=r=>PROJ[r]||PROJ[ROLES[0]];
export async function generateAnalysis({targetRole,skills,hoursPerWeek}){
  await new Promise(r=>setTimeout(r,1200));
  const req=REQ[targetRole]||REQ[ROLES[0]],have=skills.map(s=>s.toLowerCase());
  const gaps=req.filter(([s])=>!have.includes(s.toLowerCase())).map(([skill,priority])=>({skill,priority}));
  const matched=req.length-gaps.length;
  return{id:Date.now(),role:targetRole,date:new Date().toISOString().slice(0,10),demo:true,
    fit:Math.min(95,35+Math.round(60*matched/req.length)),
    strengths:skills.filter(s=>req.some(([r])=>r.toLowerCase()===s.toLowerCase())).concat(skills).filter((v,i,a)=>a.indexOf(v)===i).slice(0,5),
    gaps,tech:gaps.slice(0,4).map(g=>g.skill),projects:projectsFor(targetRole),
    weeks:Math.max(4,Math.round(gaps.length*20/Math.max(+hoursPerWeek||5,1)))};
}
