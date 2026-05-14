export default async function handler(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if (req.method === 'OPTIONS') {
  return res.status(200).end();
}

if(req.method !== 'POST'){
 return res.status(405).json({
  error:'Método não permitido'
 });
}

try {

const response = await fetch(
'https://api.openai.com/v1/chat/completions',
{
method:'POST',
headers:{
'Content-Type':'application/json',
Authorization:`Bearer ${process.env.OPENAI_API_KEY}`
},
body:JSON.stringify({
model:'gpt-4o-mini',
messages:[
{
role:'system',
content:`
Você é a inteligência residencial da empresa.

Ajude usuários com manutenção preventiva,
diagnóstico de problemas domésticos
e recomendações consultivas.
`
},
{
role:'user',
content:req.body.message
}
]
})
}
);

const data = await response.json();

res.status(200).json(data);

}catch(e){

res.status(500).json({
erro:e.message
});

}

}
