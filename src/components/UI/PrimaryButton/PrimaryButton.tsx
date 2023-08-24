import React, { FC } from 'react';
import { Button } from 'antd';

type PrimaryButtonProps = {
  onclick: (data?: unknown) => void | Promise<void>;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onclick,
  text,
  disabled,
  children,
  loading,
}) => {
  return (
    <>
      <Button
        loading={loading}
        onClick={onclick}
        disabled={disabled}
        type="primary"
        className={
          ' mt-3 rounded-md px-4 text-base font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600'
        }
        style={{ backgroundColor: 'rgb(111, 68, 252)' }}
      >
        {text}
        {children}
      </Button>
    </>
  );
};

export default PrimaryButton;
