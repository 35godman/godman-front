import pdf from 'pdf-parse';

export default async (req, res) => {
  // Ensure we're handling a POST request with a valid buffer
  if (req.method !== 'POST' || !req.body || !Buffer.isBuffer(req.body)) {
    return res.status(400).send('Invalid request');
  }

  try {
    const data = await pdf(req.body);
    const charCount = data.text.length;
    return res.status(200).json({ charCount });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error reading PDF');
  }
};
