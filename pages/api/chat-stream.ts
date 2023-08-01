import { domainConfig } from '@/config/domain.config';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(req: NextRequest, _context: unknown) {
  const postData = await req.json();
  const response = await fetch(
    `${domainConfig.BACKEND_DOMAIN_NAME}/v1/embedding/ask`,
    {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
