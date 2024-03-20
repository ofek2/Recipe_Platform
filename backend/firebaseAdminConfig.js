import admin from "firebase-admin";

import config from "./config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseAdminConfig)
});

const db = admin.firestore();
const storage = admin.storage();
const adminAuth = admin.auth();

export { admin, adminAuth, db, storage };
