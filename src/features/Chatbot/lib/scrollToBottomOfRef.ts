import React from 'react';
export const scrollToBottom = (ref: React.RefObject<HTMLDivElement> | null) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
};
