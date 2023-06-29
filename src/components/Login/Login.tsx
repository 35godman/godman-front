import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LoginValues } from "@/types/types";
import s from "./Login.module.css";
import { useRouter } from "next/router";

export const Login: React.FC = () => {
	const router = useRouter();
	const [isLoggedIn, setLoggedin] = useState<boolean>(false);
	const onFinish = (values: LoginValues) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		if (isLoggedIn) {
			router.push("/data-source");
		}
	}, [isLoggedIn]);
	return (
		<div className={s.loginWrapper}>
			<div className={s.loginForm}>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						{/* htmlType="submit" */}
						<Button
							type="primary"
							onClick={() => setLoggedin(true)}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
