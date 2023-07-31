import React, { FC, useEffect, useState } from 'react';
import { Button, List, message, Typography, Upload } from 'antd';
import { AxiosResponse } from 'axios';
import { FileSize } from '@/components/DataSource/DataSourcePropsType';
import globalService from '@/service/globalService';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { Chatbot, FileUpload } from '@/types/models/globals';
import { DeleteOutlined } from '@ant-design/icons';
import crawlService from '@/service/crawlService';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/features/store';
import { addFile, removeFile } from '@/features/slices/charsCountSlice';

type FileDraggerProps = {
  chatbot: Chatbot;
  getChatbot: () => Promise<Chatbot | undefined>;
};

const FileDragger: FC<FileDraggerProps> = ({ chatbot, getChatbot }) => {
  const { Dragger } = Upload;
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [fileInfo, setFileInfo] = useState<FileSize[]>([]);
  const [alreadyUploadedFiles, setAlreadyUploadedFiles] = useState<
    FileUpload[]
  >(chatbot.sources.files);

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

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
      if (response.status === 201) {
        setFileInfo(response.data);
        for (const file of response.data) {
          dispatch(addFile({ id: file.name, chars: file.textSize }));
        }
      }
    }
  };

  const loadFilesOnServer = async () => {
    setUploadLoading(true);
    const data = new FormData();

    // Append all files to the FormData instance
    files.forEach((file) => {
      if (file.originFileObj) {
        data.append(`files`, file.originFileObj, encodeURIComponent(file.name));
      }
    });
    data.append('chatbot_id', chatbot._id);
    const response = await globalService.post(
      '/file-upload/multi-upload',
      data,
    );
    if (response.status === 201) {
      const updatedChatbot = await getChatbot();
      if (updatedChatbot) {
        setAlreadyUploadedFiles(updatedChatbot.sources.files);
        setFileInfo([]);
        setFiles([]);
        message.info('Успешно загружено');
        setUploadLoading(false);
      } else {
        message.info('Ошибка при загрузке');
      }
    }
  };
  const deleteAlreadyUploadedFiles = async (file: FileUpload) => {
    setDeleteLoading(true);
    const removedAlreadyUploadedLink = [...alreadyUploadedFiles];
    const body = {
      file_id: file._id,
      chatbot_id: chatbot._id,
      original_name: encodeURIComponent(file.originalName),
    };
    const response = await crawlService.post('/file-upload/remove-file', body);
    if (response.status === 201) {
      setAlreadyUploadedFiles(
        removedAlreadyUploadedLink.filter((item) => item._id !== file._id),
      );
      dispatch(removeFile(file._id));
      setDeleteLoading(false);
    }
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
        loading={uploadLoading}
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
      <Typography>Загруженные файлы</Typography>
      <List
        dataSource={alreadyUploadedFiles}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>{item.originalName}</Typography.Text>
            {item.char_length}
            <Button
              onClick={() => deleteAlreadyUploadedFiles(item)}
              loading={deleteLoading}
            >
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default FileDragger;
