import React from "react";
import s from "./GeneralLayout.module.css";
import { Header } from "../src/components/Header/Header";
import { Footer } from "../src/components/Footer/Footer";
import Head from "next/head";

type Props = {
	children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
	<>
		<Head>
			<title>Chat Agent</title>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>
		<div className={s.layoutFlex}>
			<Header />
			<main className={s.generalWrapper}>{children}</main>

			<Footer />
		</div>
	</>
);

export default Layout;
