import { useEffect, useState } from 'react';
import { FileUpload } from '@/types/models/globals';

export const useUploadedLinks = (initialLinks: FileUpload[]) => {
  const [alreadyUploadedLinks, setAlreadyUploadedLinks] =
    useState<FileUpload[]>(initialLinks);

  useEffect(() => {
    setAlreadyUploadedLinks(initialLinks);
  }, [initialLinks]);

  return {
    alreadyUploadedLinks,
    setAlreadyUploadedLinks,
  };
};
