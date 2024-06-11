/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });

        return config;
    },
	eslint: {
	  ignoreDuringBuilds: true,
    },
}

export default nextConfig;
