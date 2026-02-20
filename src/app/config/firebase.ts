import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhomSeLWZHZgRU1ACuWyZDsd2Rqw0I6pc',
  authDomain: 'icebox-37cd2.firebaseapp.com',
  projectId: 'icebox-37cd2',
  storageBucket: 'icebox-37cd2.firebasestorage.app',
  messagingSenderId: '1056602283808',
  appId: '1:1056602283808:web:1bed0fcdb3800af8184145',
  measurementId: 'G-T46PEJET6Z',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = firestore();
