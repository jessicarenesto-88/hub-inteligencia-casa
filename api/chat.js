export default async function handler(req, res) {

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

Tem mais de 10 anos de experiência em reparos domésticos.

Seu objetivo é ajudar usuários com manutenção preventiva, identificar riscos e orientar soluções.
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

const data=await response.json();

res.status(200).json(data);

}catch(e){

res.status(500).json({
erro:e.message
});

}

}
