import firestore from '@react-native-firebase/firestore';
import { FridgeItem } from '@/features/fridge/model/fridgeItem';

const db = firestore();

/**
 * Cria a geladeira padrão para o usuário
 */
export async function createDefaultFridge(uid: string) {
  const fridgeRef = await db.collection('fridges').add({
    name: 'My Fridge',
    members: [uid],
    owner: uid,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  await db.collection('users').doc(uid).set({
    defaultFridgeId: fridgeRef.id,
  });

  return fridgeRef.id;
}

/**
 * Busca o defaultFridgeId do usuário
 */
export async function getUserFridgeId(uid: string) {
  const userDoc = await db.collection('users').doc(uid).get();

  if (!userDoc.exists) return null;

  return userDoc.data()?.defaultFridgeId ?? null;
}

/**
 * Listener realtime dos itens da geladeira
 */
export function listenToFridgeItems(
  fridgeId: string,
  callback: (items: FridgeItem[]) => void,
) {
  return db
    .collection('fridges')
    .doc(fridgeId)
    .collection('items')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FridgeItem[];

      callback(items);
    });
}

/**
 * Adiciona item à geladeira
 */
export async function addFridgeItem(fridgeId: string, item: FridgeItem) {
  await db
    .collection('fridges')
    .doc(fridgeId)
    .collection('items')
    .add({
      ...item,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

/**
 * Remove item
 */
export async function removeFridgeItem(fridgeId: string, itemId: string) {
  await db
    .collection('fridges')
    .doc(fridgeId)
    .collection('items')
    .doc(itemId)
    .delete();
}
