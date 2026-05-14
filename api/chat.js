export default async function handler(req, res) {

  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,POST'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // responder preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // aceitar apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido'
    });
  }

  try {

    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: 'gpt-4o-mini',

          messages: [
            {
              role: 'system',
              content: `
Você é especialista em manutenção residencial preventiva.
Ajude usuários com diagnóstico e prevenção de problemas domésticos.
`
            },

            {
              role: 'user',
              content: req.body.message
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (e) {

    return res.status(500).json({
      erro: e.message
    });

  }

}
