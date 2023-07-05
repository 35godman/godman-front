import { NextRequest, NextResponse } from 'next/server';
import { PineconeClient } from '@pinecone-database/pinecone';
import { queryPineconeVectorStoreAndQueryLLM } from '../../utils';
import { indexName } from '../../config';
export default async function handler(req, res) {
  const body = await req.body;
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || '',
  });
  const text = await queryPineconeVectorStoreAndQueryLLM(
    client,
    indexName,
    body.query,
  );

  res.json({ data: text });
}
