import React, { FC } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
type PrimaryButtonProps = {
  onclick: (data?: unknown) => void | Promise<void>;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onclick,
  text,
  disabled,
  children,
  loading,
  className,
}) => {
  return (
    <>
      <Button
        loading={loading}
        onClick={onclick}
        disabled={disabled}
        type="primary"
        className={classNames(
          'mt-3 rounded-md px-4 text-base font-semibold text-white shadow-sm bg-black hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600',
          className,
        )}
      >
        {text}
        {children}
      </Button>
    </>
  );
};

export default PrimaryButton;
