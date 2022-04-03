import axios from 'axios';
const fs = require('fs');
const firebaseURL = fs.readFileSync('.firebase').toString();

const router = axios.create({
  baseURL: firebaseURL
});

export default router;
