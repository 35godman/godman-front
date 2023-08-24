import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).end('noop');
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '30mb', // Set desired value here
    },
  },
};
