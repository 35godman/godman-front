import { NextResponse } from 'next/server';
import { PineconeClient } from '@pinecone-database/pinecone';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';

import { indexName } from '../../config';
import { createPineconeIndex, updatePinecone } from '../../utils';
export default async function handler(req, res) {
  const loader = new DirectoryLoader('./documents', {
    '.txt': (path) => new TextLoader(path),
    '.md': (path) => new TextLoader(path),
    '.pdf': (path) => new PDFLoader(path),
    '.docx': (path) => new DocxLoader(path),
  });

  const docs = await loader.load();
  const vectorDimensions = 1536;

  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || '',
  });

  try {
    console.log(`creating pinecone index ${indexName}`);
    await createPineconeIndex(client, indexName, vectorDimensions);
    await updatePinecone(client, indexName, docs);
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({
    data: 'successfully created index and loaded data into pinecone...',
  });
}
