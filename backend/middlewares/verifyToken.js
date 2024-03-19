import { admin } from "../firebaseAdminConfig.js";

export async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;
  
    try {
      if (idToken) {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
      }
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(403).send('Unauthorized');
    }
  }