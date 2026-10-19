export function validateTarget(value) {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 1000;
}
export function scoreOpportunity(criteria) {
  const applicable = criteria.filter(c => c.applicable !== false);
  const denominator = applicable.reduce((n,c)=>n+c.weight,0);
  const evaluated = applicable.filter(c=>c.evaluated);
  const assessed = evaluated.reduce((n,c)=>n+c.weight,0);
  const coverage = denominator ? Math.round(100*assessed/denominator) : 0;
  if (!assessed || coverage < 80) return {score:null,coverage,level:'A analisar'};
  const score = Math.round(100*evaluated.reduce((n,c)=>n+Math.min(c.weight,Math.max(0,c.points||0)),0)/assessed);
  return {score,coverage,level:score>=70?'Alta':score>=40?'Média':'Baixa'};
}
export function renderTemplate(template, values) {
  const missing = [...new Set([...template.matchAll(/\{\{(\w+)\}\}/g)].map(m=>m[1]).filter(k=>!String(values[k]??'').trim()))];
  return {text:missing.length?'':template.replace(/\{\{(\w+)\}\}/g,(_,k)=>values[k]),missing};
}
export function csvCell(value) {
  let text = String(value ?? '');
  if (/^[\s]*[=+@\-\t\r\n]/.test(text)) text="'"+text;
  return '"'+text.replaceAll('"','""')+'"';
}
export const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function rememberLeads(records,leads){return {...records,...Object.fromEntries(leads.map(l=>[l.id,l]))}}
export function restoreLeads(records,snapshot){return snapshot.map(l=>records[l.id]||l)}
export function selectSearchResults(items,selection){
  if(!validateTarget(selection.target)||!selection.target)return [];
  return items.filter(l=>l.uf===selection.uf&&l.city===selection.cityName&&selection.niches.includes(l.niche)).slice(0,selection.target);
}
export function filterLeads(items, filters={}) {
  return items.filter(l=>(!filters.query||normalize(l.name).includes(normalize(filters.query)))&&(!filters.level||l.level===filters.level)&&(!filters.favorites||l.favorite)&&(!filters.contact||l[filters.contact])&&(!filters.site||l.siteStatus===filters.site)&&(!filters.stage||l.stage===filters.stage))
    .sort((a,b)=>a.score===null?(b.score===null?a.name.localeCompare(b.name,'pt-BR'):1):b.score===null?-1:(filters.sort==='asc'?a.score-b.score:b.score-a.score)||b.coverage-a.coverage||a.name.localeCompare(b.name,'pt-BR'));
}
