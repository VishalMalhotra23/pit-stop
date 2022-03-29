import axios from 'axios';

const router = axios.create({
  baseURL:
    'https://pit-stop-35cd8-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default router;
