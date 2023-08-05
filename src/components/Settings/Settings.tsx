import React, { useState, useEffect } from 'react';
import {
  Input,
  InputNumber,
  Button,
  Typography,
  Form,
  Slider,
  Select,
  Space,
  Checkbox,
  ColorPicker,
  Upload,
  message,
} from 'antd';

import s from './Settings.module.css';
import { Prompts } from '@/types/enums/prompts';
import { Chatbot, ChatbotSettings } from '@/types/models/globals';
import { VisibilityOptions } from '@/types/models/chatbotCustom/visibility.type';
import { CustomerInfo } from '@/types/models/chatbotCustom/customer-info.type';
import { LimitState } from '@/types/models/chatbotCustom/limit.type';
import SwitchForm from '@/components/Settings/formItems/SwitchForm/SwitchForm';
import ChatPreview from '@/components/ChatPreview/ChatPreview';
import globalService from '@/service/globalService';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { removeStaticFieldsFromObject } from '@/helpers/obj/removeStaticFieldsFromObject';
import { convertMessagesToArray } from '@/helpers/obj/convertMessagesToArray';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';

const { Paragraph, Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
type SettingsPropsType = {
  chatbot: Chatbot;
  setChatbot: (chatbot: Chatbot) => void;
  setNewDataUpdated: (y: boolean) => void;
  newDataUpdated: boolean;
  getChatbot: () => Promise<Chatbot | undefined>;
};
export const Settings: React.FC<SettingsPropsType> = ({
  chatbot,
  setChatbot,
  setNewDataUpdated,
  newDataUpdated,
  getChatbot,
}) => {
  const [fileInfo, setFileInfo] = useState<UploadFile | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const resetBasePrompt = () => {
    setChatbot({
      ...chatbot,
      settings: {
        ...chatbot.settings,
        base_prompt: Prompts.DEFAULT,
      },
    });
  };

  const addToArrayOfString = (
    key: 'new_suggested_messages' | 'new_initial_messages' | 'new_domains',
    value: string,
  ) => {
    const newChatbot = { ...chatbot };
    newChatbot.settings[key] = value;
    setChatbot(newChatbot);
  };
  const changeChatbotSetting = <K extends keyof ChatbotSettings>(
    key: K,
    value: ChatbotSettings[K],
  ) => {
    setChatbot({
      ...chatbot,
      settings: {
        ...chatbot.settings,
        [key]: value,
      },
    });
  };
  const changeRateLimitSetting = <K extends keyof LimitState>(
    key: K,
    value: LimitState[K],
  ) => {
    setChatbot({
      ...chatbot,
      settings: {
        ...chatbot.settings,
        rate_limit: {
          ...chatbot.settings.rate_limit,
          [key]: value,
        },
      },
    });
  };

  const changeCustomerInfoSetting = <K extends keyof CustomerInfo>(
    key: K,
    value: CustomerInfo[K],
  ) => {
    setChatbot({
      ...chatbot,
      settings: {
        ...chatbot.settings,
        customer_info: {
          ...chatbot.settings.customer_info,
          [key]: value,
        },
      },
    });
  };
  const changeChatbotRootSetting = <K extends keyof Chatbot>(
    key: K,
    value: Chatbot[K],
  ) => {
    setChatbot({
      ...chatbot,
      [key]: value,
    });
  };

  const handleUpload = (info: UploadChangeParam<UploadFile<unknown>>) => {
    const { file } = info;
    setFileInfo(file);
  };

  const handleSubmit = async () => {
    setSaveLoading(true);
    const updatedChatbot = { ...chatbot };
    /**
     * @COMMENT converting string to arr
     */

    updatedChatbot.settings.initial_messages = convertMessagesToArray(
      updatedChatbot.settings.new_initial_messages,
    );
    updatedChatbot.settings.suggested_messages = convertMessagesToArray(
      updatedChatbot.settings.new_suggested_messages,
    );
    updatedChatbot.settings.domains = convertMessagesToArray(
      updatedChatbot.settings.new_domains,
    );

    const body = {
      chatbot_settings: removeStaticFieldsFromObject(updatedChatbot).settings,
      chatbot_name: updatedChatbot.chatbot_name,
      chatbot_id: chatbot._id,
    };
    const response = await globalService.post(
      `/chatbot/settings-update?chatbot_id=${chatbot._id}`,
      body,
    );
    if (response.status === 201) {
      /**
       * @COMMENT
       * sending profile_picture_here
       */
      const data = new FormData();
      if (fileInfo && fileInfo.originFileObj) {
        data.append(
          'file',
          fileInfo.originFileObj,
          encodeURIComponent(fileInfo.name),
        );
        await globalService.post(
          `/file-upload/profile-picture-upload?chatbot_id=${chatbot._id}`,
          data,
        );
      }

      message.info('Successfully uploaded');
      await getChatbot();
      setNewDataUpdated(false);
    }
    setSaveLoading(false);
  };

  /**
   * @COMMENT
   * as we use string[] in model and just string here, we joint and update the new_values.
   */
  useEffect(() => {
    if (chatbot && !newDataUpdated) {
      const customChatbot = { ...chatbot };
      customChatbot.settings.new_domains =
        customChatbot.settings.domains.join('\n');
      customChatbot.settings.new_suggested_messages =
        customChatbot.settings.suggested_messages.join('\n');
      customChatbot.settings.new_initial_messages =
        customChatbot.settings.initial_messages.join('\n');
      setNewDataUpdated(true);
      setChatbot(customChatbot);
    }
    //eslint-disable-next-line
  }, [newDataUpdated, chatbot]);
  if (!chatbot) return null;

  return (
    <div className={s.settings}>
      <Title level={5}>Chatbot id</Title>
      <Title level={5}>{chatbot._id}</Title>
      <Title level={5}>Number of characters</Title>
      <Paragraph>{chatbot.settings.num_of_characters}</Paragraph>
      <Title level={5}>Bot name</Title>

      <Form>
        <Form.Item label="">
          <Input
            value={chatbot.chatbot_name}
            onChange={(e) =>
              changeChatbotRootSetting('chatbot_name', e.target.value)
            }
          />
        </Form.Item>
        <Title level={5}>Model:</Title>
        <Form.Item label="">
          <Select
            value={chatbot.settings.model}
            onChange={(model) => changeChatbotSetting('model', model)}
          >
            <Option value="gpt-3.5-turbo">GPT 3.5 TURBO 4K CONTEXT</Option>
            <Option value="gpt-3.5-turbo-16k-0613">
              GPT 3.5 TURBO 16K CONTEXT
            </Option>
          </Select>
        </Form.Item>
        <Title level={5}>Base Prompt (system message):</Title>
        <Form.Item label="">
          <Input.TextArea
            rows={4}
            value={chatbot.settings.base_prompt}
            onChange={(e) =>
              changeChatbotSetting('base_prompt', e.target.value)
            }
          />
        </Form.Item>
        <PrimaryButton onclick={resetBasePrompt} text={'Reset'} />

        <Paragraph>
          1 message using gpt-3.5-turbo costs 1 message credit.
        </Paragraph>

        <Title level={5}>Temperature {chatbot.settings.temperature}</Title>
        <Slider
          min={0}
          max={1}
          step={0.1}
          onChange={(temp) => changeChatbotSetting('temperature', temp)}
          value={chatbot.settings.temperature}
        />
        <Title level={5}>Visibility</Title>
        <Form.Item label="">
          <Select
            value={chatbot.settings.visibility}
            onChange={(vis: VisibilityOptions) =>
              changeChatbotSetting('visibility', vis)
            }
          >
            <Option value="private">Private</Option>
            <Option value="public">Public</Option>
            <Option value="embedded">
              Private but can be embedded on website
            </Option>
          </Select>
        </Form.Item>
        <Paragraph>
          &apos;Private&apos;: No one can access your chatbot except you (your
          account)
        </Paragraph>
        <Paragraph>
          &apos;Private but can be embedded on website&apos;: Other people
          can&apos;t access your chatbot if you send them the link, but you can
          still embed it on your website and your website visitors will be able
          to use it. (make sure to set your domains)
        </Paragraph>
        <Paragraph>
          &apos;Public&apos;: Anyone with the link can access it on chatbase.co
          and can be embedded on your website.
        </Paragraph>
        <Paragraph>
          Set to public if you want to be able to send a link of your chatbot to
          someone to try it.
        </Paragraph>
        <Title level={5}>Domains</Title>
        <Form.Item label="">
          <Input.TextArea
            rows={4}
            value={chatbot.settings.new_domains}
            onChange={(e) => addToArrayOfString('new_domains', e.target.value)}
            placeholder="example.com"
          />
        </Form.Item>
        <Paragraph>Enter each domain in a new line</Paragraph>
        <Paragraph>
          Domains you want to embed your chatbot on. Your chatbot visibility has
          to be &apos;Public&apos; or &apos;Private but can be embedded on
          website&apos; for this to work.
        </Paragraph>
        <Title level={5}>Rate Limiting</Title>
        <Paragraph>
          Limit the number of messages sent from one device on the iframe and
          chat bubble (this limit will not be applied to you on chatbase.co,
          only on your website for your users to prevent abuse).
        </Paragraph>
        <Space direction="horizontal" align="start">
          <Paragraph>Limit to only</Paragraph>
          <InputNumber
            min={1}
            height={5}
            value={chatbot.settings.rate_limit.messages_limit}
            onChange={(value) => {
              if (value) {
                changeRateLimitSetting('messages_limit', value);
              }
            }}
          />
          <Paragraph>messages every</Paragraph>
          <InputNumber
            min={1}
            value={chatbot.settings.rate_limit.seconds}
            onChange={(value) => {
              if (value) {
                changeRateLimitSetting('seconds', value);
              }
            }}
          />
          <Paragraph>seconds</Paragraph>
        </Space>
        <Title level={5}>Show this message to show when limit is hit</Title>
        <Input
          value={chatbot.settings.rate_limit.limit_end_message}
          onChange={(e) =>
            changeRateLimitSetting('limit_end_message', e.target.value)
          }
        />
        <Title level={3}>Collect Customer Info</Title>
        <Title level={5}>Title</Title>
        <Form.Item label="">
          <Space direction="vertical">
            <Input
              style={{
                width: '430px',
                marginTop: '5px',
              }}
              value={chatbot.settings.customer_info.title}
              onChange={(e) =>
                changeCustomerInfoSetting('title', e.target.value)
              }
            />
            <PrimaryButton
              text={' Reset Title'}
              onclick={() => changeCustomerInfoSetting('title', '')}
            />
          </Space>
        </Form.Item>

        <div className={s.switchContainer}>
          <Title level={5}>Name</Title>
          <SwitchForm
            checkedValue={chatbot.settings.customer_info.name_checked}
            switchKeyName={'name_checked'}
            inputKeyName={'name'}
            inputValue={chatbot.settings.customer_info.name}
            onChange={changeCustomerInfoSetting}
          />

          <Title level={5}>Email</Title>

          <SwitchForm
            checkedValue={chatbot.settings.customer_info.email_checked}
            switchKeyName={'email_checked'}
            inputKeyName={'email'}
            inputValue={chatbot.settings.customer_info.email}
            onChange={changeCustomerInfoSetting}
          />

          <Title level={5}>Phone Number</Title>
          <SwitchForm
            onChange={changeCustomerInfoSetting}
            inputValue={chatbot.settings.customer_info.phone}
            switchKeyName={'phone_checked'}
            inputKeyName={'phone'}
            checkedValue={chatbot.settings.customer_info.phone_checked}
          />
        </div>

        <Space direction="horizontal" align="start" size={50}>
          <div>
            <Title level={3}>Chat Interface</Title>
            <Title level={5}>applies when embedded on a website</Title>
            <Title level={5}>Initial Messages</Title>
            <Space direction="vertical">
              <TextArea
                style={{
                  width: '430px',
                  marginBottom: '5px',
                }}
                rows={4}
                value={chatbot.settings.new_initial_messages}
                onChange={(e) =>
                  addToArrayOfString('new_initial_messages', e.target.value)
                }
              />
            </Space>

            <Title level={5}>Suggested Messages</Title>
            <Space direction="vertical">
              <TextArea
                style={{
                  width: '430px',
                  marginBottom: '5px',
                }}
                rows={4}
                value={chatbot.settings.new_suggested_messages}
                onChange={(e) =>
                  addToArrayOfString('new_suggested_messages', e.target.value)
                }
              />
            </Space>
            <Title level={5}>Theme</Title>
            <Select
              value={chatbot.settings.theme}
              onChange={(theme) => changeChatbotSetting('theme', theme)}
            >
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
            </Select>

            <Title level={5}>Update chatbot profile picture</Title>
            <Space direction="vertical">
              <Checkbox
                checked={chatbot.settings.remove_profile_picture_checked}
                onChange={(e) =>
                  changeChatbotSetting(
                    'remove_profile_picture_checked',
                    e.target.checked,
                  )
                }
              >
                Remove profile picture
              </Checkbox>

              {!chatbot.settings.remove_profile_picture_checked && (
                <>
                  <Upload onChange={handleUpload} multiple={false} maxCount={1}>
                    <Button>Загрузить фото профиля</Button>
                  </Upload>
                </>
              )}
            </Space>
            <Form.Item label="">
              <Input
                value={chatbot.settings.display_name}
                onChange={(e) =>
                  changeChatbotSetting('display_name', e.target.value)
                }
              />
            </Form.Item>
            <Title level={5}>User Message Color</Title>
            <ColorPicker
              format={'hex'}
              onChange={(color) => {
                changeChatbotSetting('user_message_color', color.toHexString());
              }}
              defaultValue={chatbot.settings.user_message_color}
            />
            <Title level={5}>User Message Color</Title>
            {/*<ColorPicker*/}
            {/*  format={'hex'}*/}
            {/*  onChange={(color) => {*/}
            {/*    changeChatbotSetting('chat_message_color', color.toHexString());*/}
            {/*  }}*/}
            {/*  defaultValue={chatbot.settings.user_message_color}*/}
            {/*/>*/}
            {/* <Title level={5}>Update chat icon</Title>
          <Input
            style={{
              width: '430px',
              marginTop: '5px',
            }}
            type="file"
            accept="image/*"
            onChange={handleChatIconChange}
          />
          <div>
            {chatIcon && (
              <Image src={chatIcon} alt="Preview" width={100} height={100} />
            )}
          </div> */}

            <Title level={5}>Chat Footer Color</Title>
            <ColorPicker
              format={'hex'}
              defaultValue={chatbot.settings.chat_bubble_color}
              onChange={(color) => {
                changeChatbotSetting('chat_bubble_color', color.toHexString());
              }}
            />

            <Title level={5}>Bot language</Title>
            <Select
              value={chatbot.settings.language}
              onChange={(lang) => changeChatbotSetting('language', lang)}
            >
              <Option value="EN">English</Option>
              <Option value="RU">Russian</Option>
            </Select>
          </div>
          {/* Prev Chat_________________________ */}
          <ChatPreview chatbot={chatbot} />
        </Space>
        <Form.Item>
          <PrimaryButton
            onclick={handleSubmit}
            text={'Сохранить изменения'}
            loading={saveLoading}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
