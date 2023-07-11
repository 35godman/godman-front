import React, { useState, ChangeEvent, useMemo } from 'react';
import {
  Input,
  InputNumber,
  Button,
  Typography,
  Form,
  Slider,
  Select,
  Space,
  Switch,
  Checkbox,
  ColorPicker,
  Image,
} from 'antd';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { Suggestion } from '../Suggestion/Suggestion';
import { Color, ColorPickerProps } from 'antd/es/color-picker';
import s from './Settings.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage';

const { Paragraph, Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export const Settings: React.FC = () => {
  const [chatbotId] = useState<string>('7ihbdi777d62w28');
  const [charCount] = useState<number>(82918);
  const [name, setName] = useState<string>('bot45562');
  const [basePrompt, setBasePrompt] = useState<string>(
    "I want you to act as a document that I am having a conversation with. Your name is 'AI Assistant'. You will provide me with answers from the given info. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
  );
  const [model, setModel] = useState<string>('gpt-3.5 turbo');
  const [temperature, setTemperature] = useState<number>(0);
  const [visibility, setVisibility] = useState<string>('Private');
  const [domains, setDomains] = useState<string>('');
  const [messageLimit, setMessageLimit] = useState<number>(20);
  const [messagePeriod, setMessagePeriod] = useState<number>(240);
  const [limitHitMessage, setLimitHitMessage] = useState<string>(
    'Too many messages in a row',
  );

  const [showTitleCustomer, setShowTitleCustomer] = useState<boolean>(false);
  const [titleCustomer, setTitleCustomer] = useState<string>('');
  const [showNameCustomer, setShowNameCustomer] = useState<boolean>(false);
  const [nameCustomer, setNameCustomer] = useState<string>('');
  const [showEmailCustomer, setShowEmailCustomer] = useState<boolean>(false);
  const [emailCustomer, setEmailCustomer] = useState<string>('');
  const [showPhoneCustomer, setShowPhoneCustomer] = useState<boolean>(false);
  const [phoneNumberCustomer, setPhoneNumberCustomer] = useState<string>('');

  const [initialMessages, setInitialMessages] = useState<string>(
    'how can i help you?',
  );
  const [suggestedMessages, setSuggestedMessages] = useState<string>('');
  const [theme, setTheme] = useState<string>('light');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [removeProfilePicture, setRemoveProfilePicture] = useState<boolean>(
    false,
  );
  const [userMessageColor, setUserMessageColor] = useState<Color | string>(
    '#E3E5E8',
  );
  const [chatIcon, setChatIcon] = useState<string>('');
  const [chatFooterColor, setchatFooterColor] = useState<Color | string>(
    '#E3E5E8',
  );
  const [chatBubbleButtonAlignment, setChatBubbleButtonAlignment] = useState<
    string
  >('right');

  const hexStringUserMessage: any = useMemo(
    () =>
      typeof userMessageColor === 'string'
        ? userMessageColor
        : userMessageColor.toHexString(),
    [userMessageColor],
  );
  const hexStringFooterColor: any = useMemo(
    () =>
      typeof chatFooterColor === 'string'
        ? chatFooterColor
        : chatFooterColor.toHexString(),
    [chatFooterColor],
  );
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleChatIconChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setChatIcon(URL.createObjectURL(event.target.files[0]));
    }
  };

  const resetBasePrompt = () => {
    setBasePrompt(
      "I want you to act as a document that I am having a conversation with. Your name is 'AI Assistant'. You will provide me with answers from the given info. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character.",
    );
  };
  const resetTitle = () => setTitleCustomer('');
  const resetName = () => setNameCustomer('');
  const resetEmail = () => setEmailCustomer('');
  const resetPhoneNumber = () => setPhoneNumberCustomer('');
  const resetInitialMessages = () => setInitialMessages('');
  const resetSuggestedMessages = () => setSuggestedMessages('');
  const resetProfilePicture = () => setProfilePicture('');
  // const resetChatIcon = () => setChatIcon("");

  const handleChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(e.target.value);
  };

  return (
    <div className={s.settings}>
      <Title level={5}>Chatbot id</Title>
      <Title level={5}>{chatbotId}</Title>
      <Title level={5}>Number of characters</Title>
      <Paragraph>{charCount}</Paragraph>
      <Title level={5}>Bot name</Title>
      <Form.Item label="">
        <Input value={name} onChange={handleChange(setName)} />
      </Form.Item>
      <Title level={5}>Model:</Title>
      <Form.Item label="">
        <Input value={model} onChange={handleChange(setName)} />
      </Form.Item>
      <Title level={5}>Base Prompt (system message):</Title>
      <Form.Item label="">
        <Input.TextArea
          rows={4}
          value={basePrompt}
          onChange={handleChange(setModel)}
        />
      </Form.Item>
      <Button type="primary" onClick={resetBasePrompt}>
        Reset
      </Button>

      <Paragraph>
        1 message using gpt-3.5-turbo costs 1 message credit. 1 message using
        gpt-4 costs 20 message credits.
      </Paragraph>

      <Title level={5}>Temperature {temperature}</Title>
      <Slider
        min={0}
        max={1}
        step={0.1}
        onChange={(value: number) => setTemperature(value)}
        value={typeof temperature === 'number' ? temperature : 0}
      />
      <Title level={5}>Visibility</Title>
      <Form.Item label="">
        <Select
          value={visibility}
          onChange={(value: string) => setVisibility(value)}
        >
          <Option value="Private">Private</Option>
          <Option value="Public">Public</Option>
          <Option value="Embeddable">
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
        still embed it on your website and your website visitors will be able to
        use it. (make sure to set your domains)
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
          value={domains}
          onChange={handleChange(setDomains)}
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
        Limit the number of messages sent from one device on the iframe and chat
        bubble (this limit will not be applied to you on chatbase.co, only on
        your website for your users to prevent abuse).
      </Paragraph>
      <Space direction="horizontal" align="start">
        <Paragraph>Limit to only</Paragraph>
        <InputNumber
          min={1}
          height={5}
          value={messageLimit}
          onChange={value => {
            if (value !== null) {
              setMessageLimit(value);
            }
          }}
        />
        <Paragraph>messages every</Paragraph>
        <InputNumber
          min={1}
          value={messagePeriod}
          onChange={value => {
            if (value !== null) {
              setMessagePeriod(value);
            }
          }}
        />
        <Paragraph>seconds</Paragraph>
      </Space>
      <Title level={5}>Show this message to show when limit is hit</Title>
      <Input
        value={limitHitMessage}
        onChange={handleChange(setLimitHitMessage)}
      />
      <Title level={3}>Collect Customer Info</Title>
      <Title level={5}>Title</Title>
      <Switch checked={showTitleCustomer} onChange={setShowTitleCustomer} />
      {showTitleCustomer && (
        <Form.Item label="">
          <Space direction="vertical">
            <Input
              style={{
                width: '430px',
                marginTop: '5px',
              }}
              value={titleCustomer}
              onChange={handleChange(setTitleCustomer)}
            />
            <Button type="primary" onClick={resetTitle}>
              Reset Title
            </Button>
          </Space>
        </Form.Item>
      )}

      <Title level={5}>Name</Title>
      <Switch checked={showNameCustomer} onChange={setShowNameCustomer} />
      {showNameCustomer && (
        <Form.Item label="">
          <Space direction="vertical">
            <Input
              style={{
                width: '430px',
                marginTop: '5px',
              }}
              value={nameCustomer}
              onChange={handleChange(setName)}
            />
            <Button type="primary" onClick={resetName}>
              Reset Name
            </Button>
          </Space>
        </Form.Item>
      )}

      <Title level={5}>Email</Title>
      <Switch checked={showEmailCustomer} onChange={setShowEmailCustomer} />
      {showEmailCustomer && (
        <Form.Item label="">
          <Space direction="vertical">
            <Input
              style={{
                width: '430px',
                marginTop: '5px',
              }}
              value={emailCustomer}
              onChange={handleChange(setEmailCustomer)}
            />
            <Button type="primary" onClick={resetEmail}>
              Reset Email
            </Button>
          </Space>
        </Form.Item>
      )}

      <Title level={5}>Phone Number</Title>
      <Switch checked={showPhoneCustomer} onChange={setShowPhoneCustomer} />
      {showPhoneCustomer && (
        <Form.Item label="">
          <Space direction="vertical">
            <Input
              value={phoneNumberCustomer}
              style={{
                width: '430px',
                marginTop: '5px',
              }}
              onChange={handleChange(setPhoneNumberCustomer)}
            />
            <Button type="primary" onClick={resetPhoneNumber}>
              Reset Phone
            </Button>
          </Space>
        </Form.Item>
      )}
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
              value={initialMessages}
              onChange={handleChange(setInitialMessages)}
            />
            <Button type="primary" onClick={resetInitialMessages}>
              Reset
            </Button>
          </Space>

          <Title level={5}>Suggested Messages</Title>
          <Space direction="vertical">
            <TextArea
              style={{
                width: '430px',
                marginBottom: '5px',
              }}
              rows={4}
              value={suggestedMessages}
              onChange={handleChange(setSuggestedMessages)}
            />
            <Button type="primary" onClick={resetSuggestedMessages}>
              Reset
            </Button>
          </Space>
          <Title level={5}>Theme</Title>
          <Select value={theme} onChange={setTheme}>
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
          </Select>

          <Title level={5}>Update chatbot profile picture</Title>
          <Space direction="vertical">
            <Checkbox
              checked={removeProfilePicture}
              onChange={e => {
                setRemoveProfilePicture(e.target.checked);
                resetProfilePicture();
              }}
            >
              Remove profile picture
            </Checkbox>

            {!removeProfilePicture && (
              <>
                <Input
                  style={{
                    width: '430px',
                    marginTop: '5px',
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                {/* <div>
									{profilePicture && (
										<Image
											src={profilePicture}
											width={100}
											height={100}
											alt="Preview"
										/>
									)}
								</div> */}
              </>
            )}
          </Space>
          <Title level={5}>User Message Color</Title>
          <ColorPicker
            format={formatHex}
            value={userMessageColor}
            onChange={setUserMessageColor}
            onFormatChange={setFormatHex}
          />

          <Title level={5}>Update chat icon</Title>
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
          </div>

          <Title level={5}>Chat Bubble Button Color</Title>
          <ColorPicker
            format={formatHex}
            value={chatFooterColor}
            onChange={setchatFooterColor}
            onFormatChange={setFormatHex}
          />
          <Title level={5}>Align Chat Bubble Button</Title>
          <Select
            value={chatBubbleButtonAlignment}
            onChange={setChatBubbleButtonAlignment}
          >
            <Option value="right">Right</Option>
            <Option value="left">Left</Option>
          </Select>
        </div>
        <div className={s.chatPreview}>
          <div className={s.chatPreviewHeader}>
            <div>
              {!removeProfilePicture && profilePicture && (
                <div className={s.ChatPreviewImgWrapper}>
                  <Image
                    src={profilePicture}
                    alt="Профиль"
                    style={{
                      maxHeight: '80px',
                      maxWidth: '40px',
                      borderRadius: '30px',
                      margin: '3px 0',
                      marginRight: '10px',
                    }}
                  />
                  <div className={s.chatPreviewName}>{name}</div>
                </div>
              )}
            </div>
          </div>
          {/* Prev Chat_________________________ */}
          <div className={s.chatPreviewContent}>
            <Suggestion
              backgroundColor={hexStringUserMessage}
              textProp="What is Chatbase?"
            />
            <Suggestion
              backgroundColor={hexStringUserMessage}
              textProp="What is the pricing?"
            />
            <Suggestion
              backgroundColor={hexStringUserMessage}
              textProp="How can Chatbase benefit my website?"
            />
            <Suggestion
              backgroundColor={hexStringUserMessage}
              textProp="What features does astrum have?"
            />
						<ChatMessage text='Welcome to Arsturn, I am your AI assistant - Arsturn. How can I help you today?' color={hexStringFooterColor} />
          </div>

          <div
            className={s.chatPreviewFooter}
            style={{ backgroundColor: hexStringFooterColor }}
          >
            <Button
              className={s.chatPreviewReloadButton}
              // type="primary"
              shape="circle"
              size="large"
              icon={<ReloadOutlined style={{ fontSize: '24px' }} />}
            />

            <Input
              className={s.chatPreviewInput}
              suffix={<SendOutlined style={{ fontSize: '20px' }} />}
              placeholder="Enter your message"
            />
          </div>
        </div>
      </Space>
    </div>
  );
};
