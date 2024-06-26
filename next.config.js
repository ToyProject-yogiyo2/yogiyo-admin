/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    async rewrites() {
        return [
            {
                source: "/oauth2.0/:path*", // url이 source에 해당될 경우
                destination: "https://nid.naver.com/oauth2.0/:path*", // destination으로 redirect
            },
        ];
    },
    reactStrictMode: false,
};
