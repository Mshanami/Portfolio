export default async function handler(req, res) {
  // CORS headers — allow your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const azureRes = await fetch(
      'https://bmngomezulu-7756-resource.services.ai.azure.com/api/projects/bmngomezulu-7756/applications/LibraryAssistant/protocols/openai/responses?api-version=2025-11-15-preview',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_API_KEY,
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await azureRes.json();
    if (!azureRes.ok) return res.status(azureRes.status).json(data);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
}
