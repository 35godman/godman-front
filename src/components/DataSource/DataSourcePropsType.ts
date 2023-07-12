import { UploadFile } from 'antd/lib/upload/interface';

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
  newAnswerP?: string;
};
