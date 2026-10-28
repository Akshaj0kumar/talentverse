const v=n=>`rgb(var(--${n}) / <alpha-value>)`;
const scale=(p,keys)=>Object.fromEntries(keys.map(k=>[k,v(p+k)]));
export default {content:['./index.html','./src/**/*.{js,jsx}'],darkMode:'class',
  theme:{extend:{fontFamily:{sans:['Manrope','system-ui','sans-serif']},colors:{
    slate:scale('s',[50,100,200,300,400,500,600,700,800,900]),
    indigo:scale('a',[50,100,300,500,600,700]),
    violet:{500:v('a2')}}}},plugins:[]};
