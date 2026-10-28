import mongoose from 'mongoose';
const schema=new mongoose.Schema({targetRole:{type:String,required:true},skills:[String],experienceSummary:{type:String,required:true}},{timestamps:true});
export const CareerProfile=mongoose.models.CareerProfile||mongoose.model('CareerProfile',schema);
