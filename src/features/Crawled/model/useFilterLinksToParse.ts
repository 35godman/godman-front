import { useState } from 'react';

export const useFilterLinksToParse = (
  linksToParse: string[],
  setLinksToParse: (links: string[]) => void,
) => {
  const [currentLink, setCurrentLink] = useState<string>('');
  const addToLinksToParse = () => {
    setLinksToParse([...linksToParse, currentLink]);
    setCurrentLink('');
  };
  const removeFromLinksToParse = (removed: string) => {
    const filteredLinks = linksToParse.filter((link) => link !== removed);
    setLinksToParse(filteredLinks);
  };

  return {
    addToLinks: addToLinksToParse,
    currentLink,
    setCurrentLink,
    removeFromLinks: removeFromLinksToParse,
  };
};
