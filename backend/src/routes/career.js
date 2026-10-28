import {Router} from 'express';
import {profileSchema,analyzeSchema,roadmapSchema} from '../schemas.js';
import {CareerProfile} from '../models/CareerProfile.js';
import {analyzeWithGemini,roadmapWithGemini} from '../services/gemini.js';
const r=Router();
const check=(schema,body)=>{const p=schema.safeParse(body);
  return p.success?{data:p.data}:{errors:p.error.issues.map(i=>({path:i.path.join('.'),message:i.message}))}};
r.post('/profiles',async(req,res,next)=>{try{
  const {data,errors}=check(profileSchema,req.body);
  if(errors)return res.status(400).json({success:false,message:'Validation failed',errors});
  res.status(201).json({success:true,profile:await CareerProfile.create(data)});
}catch(e){next(e)}});
r.post('/analyze',async(req,res,next)=>{try{
  const {data,errors}=check(analyzeSchema,req.body);
  if(errors)return res.status(400).json({success:false,message:'Validation failed',errors});
  res.json({success:true,analysis:await analyzeWithGemini(data)});
}catch(e){next(e)}});
r.post('/roadmap',async(req,res,next)=>{try{
  const {data,errors}=check(roadmapSchema,req.body);
  if(errors)return res.status(400).json({success:false,message:'Validation failed',errors});
  res.json({success:true,roadmap:await roadmapWithGemini(data)});
}catch(e){next(e)}});
export default r;
