import { UploadFile } from 'antd/lib/upload/interface';
import { User } from '@/types/models/globals';

export type DataSourcePropsType = {
  activeTabP?: string;
  filesP?: UploadFile<any>[];
  chatbotNameP?: string;
  textAreaValueP?: string;
  websiteUrlP?: string;
  parsedContentP?: string;
  isTextAreaVisibleP?: boolean;
  countFilesP?: number;
  countCharsInFilesP?: number;
  countCharsInTextP?: number;
  countCharsInWebsiteP?: number;
  countQnaP?: number;
  qnaListP?: Array<{ question: string; answer: string }>;
  newQuestionP?: string;
  user: User;
  newAnswerP?: string;
};

export type FileSize = {
  name: string;
  textSize: number;
};
