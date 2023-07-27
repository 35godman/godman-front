import React, { FC, useState } from 'react';
import { Button, Modal } from 'antd';

export type ConfirmModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = ({ show, onConfirm, onCancel }) => {
  return (
    <>
      <Modal closable={true} open={show} onCancel={onCancel} footer={false}>
        <p>Вы уверены?</p>
        <Button danger={true} onClick={() => onConfirm()}>
          Да
        </Button>
        <Button onClick={() => onCancel()}>Нет</Button>
      </Modal>
    </>
  );
};

export default ConfirmModal;
