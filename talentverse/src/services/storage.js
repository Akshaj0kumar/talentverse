// Swap these for API calls later.
const P='talentverse:';
export const storage={
  get(k,d){try{const v=localStorage.getItem(P+k);return v?JSON.parse(v):d}catch{return d}},
  set(k,v){try{localStorage.setItem(P+k,JSON.stringify(v))}catch{/* storage unavailable */}}
};
