import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from '@react-native-firebase/firestore';

import { FridgeItem } from '@/features/fridge/model/fridgeItem';
import { DocumentData } from '@react-native-firebase/app/lib/internal/web/firebaseFirestore';

const db = getFirestore();

/**
 * Cria a geladeira padrão para o usuário
 */
export async function createDefaultFridge(uid: string) {
  const fridgeRef = await addDoc(collection(db, 'fridges'), {
    name: 'My Fridge',
    members: [uid],
    owner: uid,
    createdAt: serverTimestamp(),
  });

  await setDoc(doc(db, 'users', uid), {
    defaultFridgeId: fridgeRef.id,
  });

  return fridgeRef.id;
}

/**
 * Busca o defaultFridgeId do usuário
 */
export async function getUserFridgeId(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return null;

  return userDoc.data()?.defaultFridgeId ?? null;
}

/**
 * Listener realtime dos itens da geladeira
 */
export function listenToFridgeItems(
  fridgeId: string,
  callback: (items: FridgeItem[]) => void,
) {
  const itemsRef = collection(db, 'fridges', fridgeId, 'items');
  const q = query(itemsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, snapshot => {
    const items = snapshot.docs.map((docSnapshot: any) => {
      const data = docSnapshot.data();

      return {
        ...data,
        id: docSnapshot.id, // ID SEMPRE por último
      };
    }) as FridgeItem[];

    callback(items);
  });
}

/**
 * Adiciona item à geladeira
 */
export async function addFridgeItem(fridgeId: string, item: FridgeItem) {
  const { id, ...rest } = item; // remove id

  const itemsRef = collection(db, 'fridges', fridgeId, 'items');

  await addDoc(itemsRef, {
    ...rest,
    createdAt: serverTimestamp(),
  });
}

/**
 * Remove item
 */
export async function removeFridgeItem(fridgeId: string, itemId: string) {
  try {
    const itemRef = doc(db, 'fridges', fridgeId, 'items', itemId);

    await deleteDoc(itemRef);
  } catch (error) {
    console.error('Delete error:', error);
  }
}
