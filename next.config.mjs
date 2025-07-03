/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Enable strict mode (warns about issues in development)
    devIndicators: {
      autoPrerender: false, // Disable the auto prerendering indicator
    },

    webpack(config, { dev }) {
        if (dev) {
          config.devServer = {
            ...config.devServer,
            overlay: false, // Disable the Webpack error overlay in development
          };
        }
        return config;
      },
    
  
    async rewrites() {
      return [
        {
          source: '/doctors/add-test',
          destination: '/doctors/MedicalTest',
        },
        {
          source: '/doctors/student-list',
          destination: '/doctors/StudentList',
        },
        {
          source: '/doctors/settings',
          destination: '/doctors/Settings',
        },
        {
          source: '/doctors/login',
          destination: '/doctors/Login',
        },
        {
          source: '/doctors/forgot-password',
          destination: '/doctors/ForgotPassword',
        },
        {
          source: "/doctors/qrcode/:uniqueKey",
          destination: "/QrCode",
        },

        // parents routes
      ];
    },
  };
  
  export default nextConfig;
  