import assert from 'assert';
import { loadEnvVariables } from './env.js';

loadEnvVariables();

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  CREDENTIAL_CLIENT_EMAIL,
  CREDENTIAL_CLIENT_ID,
  CREDENTIAL_PROJECT_ID,
  CREDENTIAL_PRIVATE_KEY_ID,
  CREDENTIAL_PRIVATE_KEY,
  CREDENTIAL_AUTH_URI,
  CREDENTIAL_TOKEN_URI,
  CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL,
  CREDENTIAL_CLIENT_X509_CERT_URL,
  CREDENTIAL_UNIVERSE_DOMAIN
// eslint-disable-next-line no-undef
} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

export default {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId : MEASUREMENT_ID
  },
  firebaseAdminConfig: {
    type: 'service_account',
    project_id: CREDENTIAL_PROJECT_ID,
    private_key_id: CREDENTIAL_PRIVATE_KEY_ID,
    private_key: CREDENTIAL_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: CREDENTIAL_CLIENT_EMAIL,
    client_id: CREDENTIAL_CLIENT_ID,
    auth_uri: CREDENTIAL_AUTH_URI,
    token_uri: CREDENTIAL_TOKEN_URI,
    auth_provider_x509_cert_url: CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: CREDENTIAL_CLIENT_X509_CERT_URL,
    universeDomain: CREDENTIAL_UNIVERSE_DOMAIN
  }
};
