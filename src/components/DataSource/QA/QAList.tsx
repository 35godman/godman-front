import React, { FC, useState } from 'react';
import { Button, Input } from 'antd';
import globalService from '@/service/globalService';
import fileUploadService from '@/service/pineconeService';
import { Chatbot } from '@/types/models/globals';
import { DeleteOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

type QAListProps = {
  chatbot: Chatbot;
};

const QAList: FC<QAListProps> = ({ chatbot }) => {
  const { TextArea } = Input;
  const [isTextAreaVisible, setIsTextAreaVisible] = useState<boolean>(false);
  const [qnaList, setQnaList] = useState<
    Array<{ question: string; answer: string; _id: string }>
  >(chatbot.sources.QA_list);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAnswer(e.target.value);
  };
  const handleAddQna = () => {
    if (isTextAreaVisible) {
      setQnaList([
        ...qnaList,
        { question: newQuestion, answer: newAnswer, _id: nanoid() },
      ]);
      setNewQuestion('');
      setNewAnswer('');
      setIsTextAreaVisible(false);
    } else {
      setIsTextAreaVisible(true);
    }
  };

  const handleRemoveQna = (id: string) => {
    setQnaList(qnaList.filter((item) => item._id !== id));
  };

  const submitQnA = async () => {
    await fileUploadService.post(
      `/file-upload/add-qna?chatbot_id=${chatbot._id}`,
      {
        data: qnaList,
      },
    );
  };
  return (
    <>
      <Button onClick={handleAddQna}>Add</Button>
      {isTextAreaVisible && (
        <>
          <TextArea
            placeholder="Question"
            rows={3}
            style={{ marginTop: '5px' }}
            value={newQuestion}
            onChange={handleQuestionChange}
          />
          <TextArea
            placeholder="Answer"
            rows={7}
            style={{ marginTop: '5px' }}
            value={newAnswer}
            onChange={handleAnswerChange}
          />
        </>
      )}
      {qnaList &&
        qnaList.map((qna, index) => (
          <div key={index}>
            <TextArea rows={2} value={qna.question} disabled />
            <TextArea rows={2} value={qna.answer} disabled />
            <DeleteOutlined onClick={() => handleRemoveQna(qna._id)} />
          </div>
        ))}

      <Button onClick={submitQnA}>Загрузить ответы на вопросы</Button>
    </>
  );
};

export default QAList;
