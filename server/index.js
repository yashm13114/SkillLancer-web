const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://skilllancer-24de8-default-rtdb.firebaseio.com/', // Replace with your Firebase project's database URL
});
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/dashboard', dashboardRoutes);