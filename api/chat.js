export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {

  // HEADERS CORS
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );

  // PRE-FLIGHT
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // VALIDAR POST
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
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({

          model: 'gpt-4o-mini',

          messages: [
            {
              role: 'system',
              content: `
Você é especialista em manutenção residencial preventiva.
Ajude usuários a identificar problemas e sugerir prevenção.
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

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

}
