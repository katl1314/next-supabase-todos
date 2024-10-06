/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // 후행 슬래시가 있는 URL을 후행 슬래시가 없는 URL으로 리다이렉트한다.
  // 외부 이미지를 가져와야할 경우 설정해야함. CORS
  // images: {
  //   remotePatterns: [
  //     {
  //       hostname: "",
  //       protocol: "",
  //     },
  //   ],
  // },
};

export default nextConfig;
