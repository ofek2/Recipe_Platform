
import User from '../models/User.js';
import FirestoreService from '../services/FirestoreService.js';
import { admin, adminAuth } from "../firebaseAdminConfig.js";
import { toEmailAddress } from '../utils.js';

class UserController {
  constructor() {
    // Explicitly bind the getUserByUsername function to the class instance
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getUserByUsername = this.getUserByUsername.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);

    this.firestoreService = new FirestoreService();
  }
  async registerUser(req, res) {
    try {
      const { username, password, displayName } = req.body;
      const email = toEmailAddress(username);
      const isAdmin = false;

      // Check if the user already exists
      try {
        await admin.auth().getUserByEmail(email);
        return res.status(400).send('User with this email already exists');
      } catch (error) {
        // User does not exist, proceed with registration
      }

      // Create a new user in Firebase Authentication
      const user = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: displayName
      });


      // Store additional user details in Firestore
      await this.firestoreService.setDocWithId(user.uid, { email, displayName, isAdmin });

      const userModel = new User(user.uid, email, displayName, isAdmin);

      res.status(200).json(userModel);
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  }


  async loginUser(req, res) {
    const { username, password } = req.body;
    try {
      // Check if the provided username is in email format
      const email = toEmailAddress(username);
      // Authenticate user using Firebase Admin Authentication
      const userRecord = await admin.auth().getUserByEmail(email);

      // Verify the user's password
      // await adminAuth.(password, userRecord);

      const user = userRecord.user;

      if (user) {
        // Retrieve additional user details from Firestore
        const userDoc = await this.firestoreService.getSingleDocByField('email', user.email);

        const userModel = new User(user.uid, user.email, userDoc?.displayName, userDoc?.isAdmin );
        // Create a custom token for the user
        const customToken = await admin.auth().createCustomToken(user.uid);

        res.status(200).json({user: userModel, token: customToken});
      } else {
        console.error(`Invalid username or password for username: ${username}`);
        res.status(401).send('Invalid username or password');
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        console.error(`Invalid username or password for username: ${username}`);
        res.status(401).send('Invalid username or password');
      } else {
        // Log other errors
        console.error(`Error during login for username: ${username}`);
        console.error(error.message);
        res.status(500).send('Internal server error');
      }
    }
  }

  async getUserByUsername(username) {
    try {
      // Determine if the provided username is an email address
      const email = this.toEmailAddress(username);
      const existingUserDoc = await this.firestoreService.getSingleDocByField('email', email);

      return existingUserDoc.data();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async logoutUser(req, res) {
    try {
      // Perform logout using Firebase Admin Authentication
      await admin.auth().signOut();

      res.status(200).send('Logout successful');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = req.user;


      if (user) {
        
        // Retrieve additional user details from Firestore using the UID
        const userDoc = await this.firestoreService.getSingleDocByField('email', user.email);
  
        // Create a User model instance
        const userModel = new User(user.uid, user.email, userDoc?.displayName , userDoc?.isAdmin);

        res.status(200).json(userModel);
      } else {
        res.status(401).send('User not authenticated');
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new UserController();
