import admin from 'firebase-admin';
import serviceAccount from '../tocca-db-firebase-adminsdk-zr8pk-391b8c803d.json';

// firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin.firestore();
