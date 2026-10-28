import {z} from 'zod';
const tag=z.string().trim().min(1).max(60);
export const profileSchema=z.object({
  targetRole:z.string().trim().min(2).max(80),
  skills:z.array(tag).min(1).max(50),
  experienceSummary:z.string().trim().min(10).max(2000)});
export const roadmapSchema=z.object({targetRole:z.string().trim().min(2).max(80),skills:z.array(tag).min(1).max(50),
  gaps:z.array(z.object({skill:z.string().trim().max(150),priority:z.enum(['High','Medium','Low'])})).max(12).default([]),
  hoursPerWeek:z.number().min(1).max(80).default(8)});
export const analyzeSchema=profileSchema.extend({
  softSkills:z.array(tag).max(30).optional().default([]),
  education:z.string().trim().max(60).optional(),
  industry:z.string().trim().max(80).optional(),
  hoursPerWeek:z.number().min(1).max(80).default(8)});
