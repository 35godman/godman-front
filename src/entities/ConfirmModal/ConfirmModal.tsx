import React, { FC } from 'react';
import { Button, Modal } from 'antd';

export type ConfirmModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
  loading?: boolean;
};

const ConfirmModal: FC<ConfirmModalProps> = ({
  show,
  onConfirm,
  onCancel,
  text,
  loading,
}) => {
  return (
    <>
      <Modal closable={true} open={show} onCancel={onCancel} footer={false}>
        <p>{text}</p>
        <Button danger={true} onClick={() => onConfirm()} loading={loading}>
          Да
        </Button>
        <Button onClick={() => onCancel()}>Нет</Button>
      </Modal>
    </>
  );
};

export default ConfirmModal;
