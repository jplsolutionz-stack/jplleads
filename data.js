import {scoreOpportunity} from './core.js';
export const niches = ['Clínicas odontológicas','Clínicas de estética','Salões de beleza','Barbearias','Academias','Estúdios de pilates','Fisioterapia','Clínicas médicas','Psicologia','Clínicas veterinárias','Pet shops','Restaurantes','Pizzarias','Cafeterias','Padarias','Hotéis e pousadas','Imobiliárias','Corretores de imóveis','Escritórios de advocacia','Contabilidade','Arquitetura','Engenharia','Construtoras','Reformas','Eletricistas','Encanadores','Assistência técnica','Oficinas mecânicas','Lojas de móveis','Lojas de roupas','Escolas','Cursos de idiomas','Lojas de materiais de construção','Empresas de limpeza','Jardinagem','Serviços para eventos'];
export const states = ['AC|Acre','AL|Alagoas','AP|Amapá','AM|Amazonas','BA|Bahia','CE|Ceará','DF|Distrito Federal','ES|Espírito Santo','GO|Goiás','MA|Maranhão','MT|Mato Grosso','MS|Mato Grosso do Sul','MG|Minas Gerais','PA|Pará','PB|Paraíba','PR|Paraná','PE|Pernambuco','PI|Piauí','RJ|Rio de Janeiro','RN|Rio Grande do Norte','RS|Rio Grande do Sul','RO|Rondônia','RR|Roraima','SC|Santa Catarina','SP|São Paulo','SE|Sergipe','TO|Tocantins'].map(s=>s.split('|'));
export const stages = ['Novo','Em análise','Contato registrado','Respondeu','Proposta enviada','Ganho','Perdido','Não contatar'];
export const templates = [
 {name:'Apresentação geral',tag:'Primeiro contato',text:'Olá, equipe da {{empresa}}! Sou {{seu_nome}}, da {{sua_empresa}}. Trabalho com criação de sites para negócios de {{nicho}} em {{cidade}}. Faz sentido conversar sobre uma página para apresentar seus serviços e facilitar pedidos de orçamento?'},
 {name:'Site não localizado',tag:'Presença digital',text:'Olá, equipe da {{empresa}}! Sou {{seu_nome}}, da {{sua_empresa}}. Ao pesquisar os canais públicos da empresa, não localizei um site próprio nas fontes que consultei. Vocês já têm um? Trabalho com sites para apresentar serviços e facilitar o contato com clientes. Se houver interesse, posso explicar uma proposta.'},
 {name:'Melhoria com evidência',tag:'Diagnóstico',text:'Olá, equipe da {{empresa}}! Sou {{seu_nome}}, da {{sua_empresa}}. Ao visitar o site, observei: {{observacao_verificada}}. Trabalho com melhorias em sites e posso apresentar uma sugestão para esse ponto. Faz sentido para vocês?'},
 {name:'Continuidade de conversa',tag:'Conversa autorizada',text:'Olá, equipe da {{empresa}}! Aqui é {{seu_nome}}, da {{sua_empresa}}. Retomando nossa conversa sobre o site: vocês querem que eu detalhe a sugestão? Se preferirem encerrar o contato, é só me avisar.'}
];
const definitions = [
 ['Odonto Essência','Clínicas odontológicas','Vila Mariana','OE','mint','none',true,true],
 ['Studio Aurora','Clínicas de estética','Pinheiros','SA','lilac','none',true,true],
 ['Clínica Sorriso Livre','Clínicas odontológicas','Moema','SL','blue','none',true,false],
 ['Beleza Natural Studio','Clínicas de estética','Jardins','BN','rose','social',true,true],
 ['Instituto Lumina','Clínicas de estética','Perdizes','IL','sand','social',false,true],
 ['Odonto Bem Viver','Clínicas odontológicas','Santana','BV','mint','issues',true,true],
 ['Espaço Serena','Clínicas de estética','Itaim Bibi','ES','lilac','good',true,true],
 ['Clínica Horizonte','Clínicas odontológicas','Tatuapé','CH','blue','good',false,true],
 ['Ateliê da Pele','Clínicas de estética','Vila Madalena','AP','rose','unknown',false,false],
 ['Odonto Plena','Clínicas odontológicas','Saúde','OP','sand','social',true,true],
 ['Estética Flor de Lótus','Clínicas de estética','Liberdade','FL','mint','good',true,true],
 ['Sorriso do Parque','Clínicas odontológicas','Vila Clementino','SP','blue','unknown',false,false]
];
export function demoLeads() {
 return definitions.map(([name,niche,district,initials,color,kind,whatsapp,instagram],i)=>{
  const criteria = kind==='none'?[{weight:35,points:35,evaluated:true},{weight:65,applicable:false}]:kind==='social'?[{weight:35,points:20,evaluated:true},{weight:65,applicable:false}]:kind==='unknown'?[{weight:100,evaluated:false}]:[{weight:35,points:0,evaluated:true},{weight:20,points:0,evaluated:true},{weight:10,points:0,evaluated:true},{weight:20,points:kind==='issues'?20:0,evaluated:true},{weight:15,points:kind==='issues'?15:0,evaluated:true}];
  return {id:'demo-'+i,name,niche,district,initials,color,kind,whatsapp,instagram,city:'São Paulo',uf:'SP',criteria,...scoreOpportunity(criteria),siteStatus:kind==='none'?'Não localizado':kind==='social'?'Somente rede social':kind==='unknown'?'Verificação indisponível':'Site identificado',stage:'Novo',favorite:false,notes:'',activities:[],fictional:true};
 });
}
