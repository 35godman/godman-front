/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: "/favicon.ico",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, must-revalidate",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
