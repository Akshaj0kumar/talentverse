import 'dotenv/config';
import express from 'express';import cors from 'cors';import mongoose from 'mongoose';
import helmet from 'helmet';import rateLimit from 'express-rate-limit';
import career from './routes/career.js';
const app=express();
app.set('trust proxy',1);
app.use(helmet());
app.use(cors({origin:(process.env.CLIENT_ORIGIN||'http://localhost:5173').split(',').map(s=>s.trim().replace(/\/$/,''))}));
app.use(express.json({limit:'100kb'}));
app.get('/',(_q,s)=>s.json({name:'TalentVerse API',health:'/api/health'}));
app.get('/api/health',(_q,s)=>s.json({ok:true}));
const limit=(windowMs,max)=>rateLimit({windowMs,limit:max,standardHeaders:true,legacyHeaders:false,message:{success:false,message:'Too many requests. Please try again later.'}});
app.use('/api',limit(15*60*1000,300));
app.use(['/api/career/analyze','/api/career/roadmap'],limit(60*60*1000,20));
app.use('/api/career',career);
app.use((_q,s)=>s.status(404).json({success:false,message:'Not found'}));
app.use((e,_q,s,_n)=>{
  if(e.status>=500&&!e.expose)console.error(e);
  const safe=e.expose||(e.status&&e.status<500);
  s.status(e.status||500).json({success:false,message:safe?e.message:'Server error'});
});
if(!process.env.MONGODB_URI){console.error('MONGODB_URI is missing. Copy .env.example to .env and fill it in.');process.exit(1)}
mongoose.connect(process.env.MONGODB_URI)
  .then(()=>app.listen(process.env.PORT||5000,()=>console.log(`API running on http://localhost:${process.env.PORT||5000}`)))
  .catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1)});
