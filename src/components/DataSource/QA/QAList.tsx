import React, { FC, useState } from 'react';
import { Button, Input } from 'antd';
import globalService from '@/service/globalService';
import fileUploadService from '@/service/pineconeService';
import { Chatbot } from '@/types/models/globals';
import { DeleteOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/features/store';
import { addFile, removeFile } from '@/features/slices/charsCountSlice';
import { QAState } from '@/types/models/chatbotCustom/QA.type';

type QAListProps = {
  chatbot: Chatbot;
};
const QAList: FC<QAListProps> = ({ chatbot }) => {
  const { TextArea } = Input;
  const dispatch = useAppDispatch();

  const [isTextAreaVisible, setIsTextAreaVisible] = useState<boolean>(false);
  const [qnaList, setQnaList] = useState<Array<QAState>>(
    chatbot.sources.QA_list,
  );

  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAnswer(e.target.value);
  };
  const handleAddQna = () => {
    const generatedId = nanoid();
    if (isTextAreaVisible) {
      setQnaList([
        ...qnaList,
        { question: newQuestion, answer: newAnswer, _id: generatedId },
      ]);
      dispatch(
        addFile({
          id: generatedId,
          chars: newQuestion.length + newAnswer.length,
        }),
      );
      setNewQuestion('');
      setNewAnswer('');
      setIsTextAreaVisible(false);
    } else {
      setIsTextAreaVisible(true);
    }
  };

  const handleRemoveQna = (id: string) => {
    setQnaList(qnaList.filter((item) => item._id !== id));
    dispatch(removeFile(id));
  };

  const submitQnA = async () => {
    await globalService.post(`/chatbot/add-qna?chatbot_id=${chatbot._id}`, {
      data: qnaList,
    });
  };
  return (
    <>
      <PrimaryButton onclick={handleAddQna} text={'Добавить'} />
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

      {/*{alreadyUploadedQA &&*/}
      {/*  alreadyUploadedQA.map((qna, index) => {*/}
      {/*    return (*/}
      {/*      <div key={index}>*/}
      {/*        <TextArea rows={2} value={qna.question} disabled />*/}
      {/*        <TextArea rows={2} value={qna.answer} disabled />*/}
      {/*        <DeleteOutlined onClick={() => handleRemoveQna(qna._id)} />*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}

      <div className={'sticky bottom-1 mt-5'}>
        <PrimaryButton
          onclick={submitQnA}
          text={'Загрузить ответы на вопросы'}
          disabled={!qnaList.length}
        />
      </div>
    </>
  );
};

export default QAList;
