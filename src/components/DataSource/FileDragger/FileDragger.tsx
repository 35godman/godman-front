import React, { FC, useState } from 'react';
import { Button, List, Typography, Upload } from 'antd';
import { AxiosResponse } from 'axios/index';
import { FileSize } from '@/components/DataSource/DataSourcePropsType';
import globalService from '@/service/globalService';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { Chatbot } from '@/types/models/globals';
import s from '@/components/DataSource/DataSource.module.css';

type FileDraggerProps = {
  chatbot: Chatbot;
};

const FileDragger: FC<FileDraggerProps> = ({ chatbot }) => {
  const { Dragger } = Upload;
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [countFiles, setCountFiles] = useState<number>(0); //Cчетчик файлов
  const [fileInfo, setFileInfo] = useState<FileSize[]>([]);

  const handleUpload = async (info: UploadChangeParam<UploadFile<unknown>>) => {
    const { file, fileList } = info;
    setFiles(fileList);
    setCountFiles(fileList.length);
    const data = new FormData();
    if (file.status === 'removed' && Array.isArray(fileInfo)) {
      const filteredFileInfo = fileInfo.filter(
        (item) => item.name !== file.name,
      );
      setFileInfo([...filteredFileInfo]);
    }
    if (file.status === 'done') {
      files.forEach((file) => {
        if (file.originFileObj) {
          data.append(
            `files`,
            file.originFileObj,
            encodeURIComponent(file.name),
          );
        }
      });

      const response: AxiosResponse<FileSize[]> = await globalService.post(
        '/file-upload/get-char-length',
        data,
      );
      setFileInfo(response.data);
    }
  };
  const loadFilesOnServer = async () => {
    const data = new FormData();

    // Append all files to the FormData instance
    files.forEach((file) => {
      if (file.originFileObj) {
        data.append(`files`, file.originFileObj, encodeURIComponent(file.name));
      }
    });
    data.append('chatbot_id', chatbot._id);

    const response: AxiosResponse<FileSize[]> = await globalService.post(
      '/file-upload/multi-upload',
      data,
    );
    setFileInfo(response.data);
  };
  return (
    <>
      <Dragger
        name="file"
        multiple
        onChange={handleUpload}
        style={{ marginBottom: '16px' }}
        accept={'.docx,.txt,.pdf'}
      >
        <p>Upload files</p>
      </Dragger>
      <Button onClick={loadFilesOnServer} disabled={!files.length}>
        Upload
      </Button>
      <List
        dataSource={fileInfo}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>{item.name}</Typography.Text>
            {item.textSize}
          </List.Item>
        )}
      ></List>
      <Typography>Already uploaded</Typography>
      <List
        dataSource={chatbot.sources.files}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>{item.originalName}</Typography.Text>
            {item.char_length}
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default FileDragger;
