import admin from 'firebase-admin';
import serviceAccount from '../tocca-db-firebase-adminsdk-zr8pk-391b8c803d.json';

// firestore initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tocca-db.firebaseio.com/',
});

export default admin.database();
