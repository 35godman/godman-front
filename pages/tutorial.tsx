import { useState } from 'react';
import axios from 'axios';
import { Button, Input, Spin } from 'antd';
const Tutorial = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const createIndexAndEmbeddings = async () => {
    try {
      const result = await axios.post('/api/setup', {});
      console.log('=>(tutorial.tsx:11) result', result);
    } catch (e) {
      console.error(e);
    }
  };
  const sendQuery = async () => {
    if (!query) return;
    setResult('');
    setLoading(true);
    try {
      const result = await axios.post('/api/read', { query });
      console.log('=>(tutorial.tsx:23) result', result);
      setResult(result.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Input onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={sendQuery}>Ask AI</Button>
        {loading && <Spin size={'large'} />}
        {/*{result && <p>{result}</p>}*/}
        <Button onClick={createIndexAndEmbeddings}>
          Create index and embeddings
        </Button>
      </div>
    </>
  );
};
export default Tutorial;
