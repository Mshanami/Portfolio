export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { input } = req.body;

    let userMessage = '';
    if (Array.isArray(input)) {
      const lastUser = [...input].reverse().find(m => m.role === 'user');
      userMessage = lastUser ? lastUser.content : '';
    } else {
      userMessage = String(input);
    }

    const body = { model: 'gpt-4.1', input: userMessage };

    const azureRes = await fetch(
      'https://bmngomezulu-7756-resource.services.ai.azure.com/api/projects/bmngomezulu-7756/agents/Bongani/endpoint/protocols/openai/responses',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_API_KEY,
        },
        body: JSON.stringify(body),
      }
    );

    const text = await azureRes.text();
    console.log('Azure status:', azureRes.status, text.slice(0, 300));

    if (!azureRes.ok) return res.status(azureRes.status).json({ azureError: text });

    return res.status(200).json(JSON.parse(text));
  } catch (err) {
    console.error('Proxy error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
