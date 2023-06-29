import React from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import { DataSource } from "../../src/components/DataSource/DataSource";

const dataSourcePage = () => {
	return (
		<GeneralLayout>
			<DataSource />
		</GeneralLayout>
	);
};

export default dataSourcePage;
