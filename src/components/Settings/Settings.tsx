import React, { useState, ChangeEvent } from "react";
import {
	Input,
	InputNumber,
	Button,
	Typography,
	Form,
	Slider,
	Select,
	Space,
} from "antd";
import s from "./Settings.module.css";

const { Paragraph, Title } = Typography;
const { Option } = Select;

export const Settings: React.FC = () => {
	const [chatbotId, setChatbotId] = useState<string>("7ihbdi777d62w28");
	const [charCount, setCharCount] = useState<number>(82918);
	const [name, setName] = useState<string>("bot45562");
	const [basePrompt, setBasePrompt] = useState<string>(
		"I want you to act as a document that I am having a conversation with. Your name is 'AI Assistant'. You will provide me with answers from the given info. If the answer is not included, say exactly 'Hmm, I am not sure.' and stop after that. Refuse to answer any question not about the info. Never break character."
	);
	const [model, setModel] = useState<string>("gpt-3.5 turbo");
	const [temperature, setTemperature] = useState<number>(0);
	const [visibility, setVisibility] = useState<string>("Private");
	const [domains, setDomains] = useState<string>("");
	const [messageLimit, setMessageLimit] = useState<number>(20);
	const [messagePeriod, setMessagePeriod] = useState<number>(240);
	const [limitHitMessage, setLimitHitMessage] = useState<string>(
		"Too many messages in a row"
	);

	const resetHandler = () => {
		setChatbotId("");
		setCharCount(0);
		setName("");
		setBasePrompt("");
		setModel("");
		setTemperature(0);
		setVisibility("Private");
		setDomains("");
		setMessageLimit(20);
		setMessagePeriod(240);
		setLimitHitMessage("Too many messages in a row");
	};

	const handleChange = (
		setState: React.Dispatch<React.SetStateAction<string>>
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
			<Button onClick={resetHandler}>Reset</Button>

			<Paragraph>
				1 message using gpt-3.5-turbo costs 1 message credit. 1 message
				using gpt-4 costs 20 message credits.
			</Paragraph>

			<Title level={5}>Temperature {temperature}</Title>
			<Slider
				min={0}
				max={1}
				step={0.1}
				onChange={(value: number) => setTemperature(value)}
				value={typeof temperature === "number" ? temperature : 0}
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
				&apos;Private&apos;: No one can access your chatbot except you
				(your account)
			</Paragraph>
			<Paragraph>
				&apos;Private but can be embedded on website&apos;: Other people
				can&apos;t access your chatbot if you send them the link, but
				you can still embed it on your website and your website visitors
				will be able to use it. (make sure to set your domains)
			</Paragraph>
			<Paragraph>
				&apos;Public&apos;: Anyone with the link can access it on
				chatbase.co and can be embedded on your website.
			</Paragraph>
			<Paragraph>
				Set to public if you want to be able to send a link of your
				chatbot to someone to try it.
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
				Domains you want to embed your chatbot on. Your chatbot
				visibility has to be &apos;Public&apos; or &apos;Private but can
				be embedded on website&apos; for this to work.
			</Paragraph>
			<Title level={5}>Rate Limiting</Title>
			<Paragraph>
				Limit the number of messages sent from one device on the iframe
				and chat bubble (this limit will not be applied to you on
				chatbase.co, only on your website for your users to prevent
				abuse).
			</Paragraph>
			<Space direction="horizontal" align="start">
				<Paragraph>Limit to only</Paragraph>
				<InputNumber
					min={1}
					height={5}
					value={messageLimit}
					onChange={(value) => {
						if (value !== null) {
							setMessageLimit(value);
						}
					}}
				/>
				<Paragraph>messages every</Paragraph>
				<InputNumber
					min={1}
					value={messagePeriod}
					onChange={(value) => {
						if (value !== null) {
							setMessageLimit(value);
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
		</div>
	);
};
