import React, { FC } from 'react';
import classNames from 'classnames';
type ColumnBlockProps = {
  children: React.ReactNode;
  className?: string;
};
const ColumnBlock: FC<ColumnBlockProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'flex-col items-center justify-between py-3',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ColumnBlock;
