import React, { FC, useEffect, useState } from 'react';
import { Button, List, Typography, Upload } from 'antd';
import { AxiosResponse } from 'axios/index';
import { FileSize } from '@/components/DataSource/DataSourcePropsType';
import globalService from '@/service/globalService';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { Chatbot, FileUpload } from '@/types/models/globals';
import s from '@/components/DataSource/DataSource.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import crawlService from '@/service/crawlService';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/features/store';
import { addFile, removeFile } from '@/features/slices/charsCountSlice';

type FileDraggerProps = {
  chatbot: Chatbot;
};

const FileDragger: FC<FileDraggerProps> = ({ chatbot }) => {
  const { Dragger } = Upload;
  const dispatch = useAppDispatch();

  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  console.log('=>(FileDragger.tsx:24) files', files);
  const [fileInfo, setFileInfo] = useState<FileSize[]>([]);
  console.log('=>(FileDragger.tsx:27) fileInfo', fileInfo);
  const [alreadyUploadedFiles, setAlreadyUploadedFiles] = useState<
    FileUpload[]
  >(() => chatbot.sources.files);

  const handleUpload = async (info: UploadChangeParam<UploadFile<unknown>>) => {
    const { file, fileList } = info;
    const uniqueFiles = fileList.filter((file, index) => {
      return fileList.findIndex((t) => t.name === file.name) === index;
    });
    setFiles(uniqueFiles);
    const data = new FormData();

    if (file.status === 'done') {
      uniqueFiles.forEach((file) => {
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
      for (const file of response.data) {
        dispatch(addFile({ id: file.name, chars: file.textSize }));
      }
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
    await globalService.post('/file-upload/multi-upload', data);
    setFileInfo([]);
    setFiles([]);
  };
  const deleteAlreadyUploadedFiles = async (file: FileUpload) => {
    const removedAlreadyUploadedLink = [...alreadyUploadedFiles];
    const body = {
      file_id: file._id,
      chatbot_id: chatbot._id,
      original_name: encodeURIComponent(file.originalName),
    };
    await crawlService.post('/file-upload/remove-file', body);
    setAlreadyUploadedFiles(
      removedAlreadyUploadedLink.filter((item) => item._id !== file._id),
    );
    dispatch(removeFile(file._id));
  };

  const onRemoveFile = (file: FileSize) => {
    if (Array.isArray(fileInfo)) {
      const filteredFileInfo = fileInfo.filter(
        (item) => item.name !== file.name,
      );
      const newFilesState = files.filter((item) => item.name !== file.name);
      setFiles(newFilesState);
      setFileInfo([...filteredFileInfo]);
      dispatch(removeFile(file.name));
    }
  };
  return (
    <>
      <Dragger
        name="file"
        multiple
        onChange={handleUpload}
        fileList={files}
        style={{ marginBottom: '16px' }}
        accept={'.docx,.txt,.pdf'}
        //disable default render antd
        itemRender={() => {
          return null;
        }}
      >
        <p>Upload files</p>
      </Dragger>
      <PrimaryButton
        onclick={loadFilesOnServer}
        text={'Upload'}
        disabled={!files.length}
      />
      <List
        dataSource={fileInfo}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>{item.name}</Typography.Text>
            {item.textSize}
            <Button onClick={() => onRemoveFile(item)}>
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      ></List>
      <Typography>Already uploaded</Typography>
      <List
        dataSource={alreadyUploadedFiles}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>{item.originalName}</Typography.Text>
            {item.char_length}
            <Button onClick={() => deleteAlreadyUploadedFiles(item)}>
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default FileDragger;
