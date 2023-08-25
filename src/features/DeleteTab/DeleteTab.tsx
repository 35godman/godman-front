import React, { FC, useState } from 'react';
import { Button } from 'antd';
import ConfirmModal from '@/entities/ConfirmModal/ConfirmModal';
import globalService from '@/shared/service/globalService';
import { Chatbot } from '@/types/models/globals';
import { useRouter } from 'next/router';

export type DeleteTabProps = {
  chatbot: Chatbot;
};

const DeleteTab: FC<DeleteTabProps> = ({ chatbot }) => {
  const [show, setShow] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await globalService.delete(`/chatbot/delete?chatbot_id=${chatbot._id}`);
      await router.push('/chatbot-list');
    } catch (e) {
      setDeleteLoading(false);
    }
  };

  const handleCancel = () => {
    setShow(false);
  };
  return (
    <div>
      <Button onClick={() => setShow(true)}>Удалить бота</Button>
      <ConfirmModal
        text={'Удалить бота?'}
        show={show}
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default DeleteTab;
