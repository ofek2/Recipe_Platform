import dotenv from 'dotenv';

export const loadEnvVariables = () => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production') {
    const result = dotenv.config({ path: '.env.local' });

    if (result.error) {
      console.error('Error loading environment variables:', result.error);
    } else {
      console.log('Environment variables loaded');
    }
  }
};
