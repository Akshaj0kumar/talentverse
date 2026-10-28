// DEMO DATA ONLY - not produced by real AI analysis.
export const skills=[
 {id:1,name:'JavaScript',type:'technical',category:'Languages',level:'Intermediate'},
 {id:2,name:'React',type:'technical',category:'Frontend',level:'Intermediate'},
 {id:3,name:'Node.js',type:'technical',category:'Backend',level:'Beginner'},
 {id:4,name:'Git',type:'technical',category:'Tools',level:'Intermediate'},
 {id:5,name:'Tailwind CSS',type:'technical',category:'Frontend',level:'Advanced'},
 {id:6,name:'MongoDB',type:'technical',category:'Databases',level:'Beginner'},
 {id:7,name:'Communication',type:'soft',category:'Interpersonal',level:'Advanced'},
 {id:8,name:'Teamwork',type:'soft',category:'Interpersonal',level:'Intermediate'},
 {id:9,name:'Problem Solving',type:'soft',category:'Thinking',level:'Intermediate'}];
export const profile={name:'Archi',degree:'B.Tech Computer Science',university:'Sample University',gradYear:'2027',interests:'Web development, AI products',skills:['JavaScript','React','Node.js'],targetRole:'Full-Stack Developer',hours:8};
export const settings={theme:'dark',emailUpdates:true,weeklyDigest:true,reminders:false,showEmail:false};
export const analyses=[{id:1,role:'Full-Stack Developer',date:'2026-10-20',fit:68,demo:true},{id:2,role:'AI Engineer',date:'2026-10-12',fit:44,demo:true}];
export const projects=[
 {id:1,name:'TalentVerse',description:'Career intelligence platform for students.',tech:['React','Express','MongoDB'],github:'',demo:'',status:'In progress'},
 {id:2,name:'Pathsense',description:'Scene description app for accessibility.',tech:['Lovable'],github:'',demo:'',status:'Completed'}];
export const experience=[
 {id:1,title:'Web Development Intern (sample)',org:'Sample Company',period:'Jun - Aug 2026',note:'Replace with your own experience.'},
 {id:2,title:'Hackathon Participant (sample)',org:'Sample Event',period:'Mar 2026',note:'Built a prototype in 24 hours.'}];
// [title, skills, resource, [[task, hours],...]]
export const roadmap=[
 ['TypeScript basics',['TypeScript'],'TypeScript Handbook (typescriptlang.org)',[['Read the handbook basics',3],['Convert one JS utility file to TS',2]]],
 ['TypeScript in React',['TypeScript','React'],'React TypeScript Cheatsheet',[['Type props and state in 3 components',3],['Type an API service layer',2]]],
 ['SQL fundamentals',['PostgreSQL'],'PostgreSQL Tutorial',[['Complete 15 SELECT/JOIN exercises',4],['Design a schema for a job tracker',2]]],
 ['PostgreSQL in Node',['PostgreSQL','Node.js'],'node-postgres docs',[['Connect Express to Postgres',3],['Build CRUD endpoints',4]]],
 ['Testing basics',['Testing'],'Jest docs',[['Write unit tests for utilities',3],['Test one API route',3]]],
 ['Frontend testing',['Testing','React'],'Testing Library docs',[['Test a form component',3],['Add a coverage report',1]]],
 ['Docker essentials',['Docker'],'Docker Get Started',[['Containerize the backend',3],['Write a docker-compose file',3]]],
 ['Auth and security',['Node.js'],'OWASP Cheat Sheets',[['Add JWT auth to the API',4],['Review inputs with Zod',2]]],
 ['CI/CD',['CI/CD'],'GitHub Actions docs',[['Run tests on every push',3],['Deploy a preview build',3]]],
 ['Performance',['React'],'web.dev Learn Performance',[['Audit with Lighthouse',2],['Fix two slow renders',3]]],
 ['Capstone build',['Full stack'],'Your own project',[['Ship a feature end to end',6],['Write the project README',2]]],
 ['Portfolio and interviews',['Communication'],'Pramp / your own notes',[['Polish resume and GitHub',3],['Do 2 mock interviews',3]]]];
export const opportunities=[
 {id:1,title:'Frontend Intern',type:'Internship',role:'Full-Stack Developer',skills:['React','JavaScript'],exp:'0-1 years',desc:'Build UI features with a small product team.'},
 {id:2,title:'Backend Intern',type:'Internship',role:'Full-Stack Developer',skills:['Node.js','MongoDB'],exp:'0-1 years',desc:'Design REST endpoints and write tests.'},
 {id:3,title:'Junior Full-Stack Developer',type:'Entry-level',role:'Full-Stack Developer',skills:['React','Node.js','SQL'],exp:'0-2 years',desc:'Ship features across the stack.'},
 {id:4,title:'ML Engineering Intern',type:'Internship',role:'AI Engineer',skills:['Python','PyTorch'],exp:'0-1 years',desc:'Train and evaluate small models.'},
 {id:5,title:'Associate AI Engineer',type:'Entry-level',role:'AI Engineer',skills:['Python','LLM APIs'],exp:'0-2 years',desc:'Prototype LLM-powered features.'},
 {id:6,title:'Data Analyst Intern',type:'Internship',role:'Data Analyst',skills:['SQL','Excel'],exp:'0-1 years',desc:'Clean data and build weekly reports.'},
 {id:7,title:'Junior Data Analyst',type:'Entry-level',role:'Data Analyst',skills:['SQL','Power BI','Python'],exp:'0-2 years',desc:'Own dashboards for a business team.'},
 {id:8,title:'Software Development Engineer I',type:'Entry-level',role:'Software Development Engineer',skills:['Java','Data Structures'],exp:'0-2 years',desc:'Build and maintain backend services.'}];
export const weekly=[['Mon',2],['Tue',1.5],['Wed',3],['Thu',0.5],['Fri',2.5],['Sat',4],['Sun',1]].map(([d,h])=>({d,h}));
