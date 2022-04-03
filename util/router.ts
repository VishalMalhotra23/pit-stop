import axios from 'axios';

const router = axios.create({
  baseURL: process.env.FIREBASE_URL
});

export default router;
