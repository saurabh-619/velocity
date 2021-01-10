import admin from "firebase-admin"; 
// const serviceAccountKey = require("../serviceAccountKey.json"); 

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      }),
      // credential: admin.credential.cert(serviceAccountKey),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
  }
} catch (e) {
  console.log(e.message);
}

export default admin.firestore();
