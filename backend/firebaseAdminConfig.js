import admin from "firebase-admin";

import config from "./config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseAdminConfig)
});

const db = admin.firestore();
const storage = admin.storage();

export { admin, db, storage };
