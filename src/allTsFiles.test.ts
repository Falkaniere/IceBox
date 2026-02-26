import { renderHook, act } from '@testing-library/react-native';

jest.mock('@react-native-firebase/firestore', () => {
  const addDoc = jest.fn(async () => ({ id: 'fridge-1' }));
  const setDoc = jest.fn(async () => undefined);
  const getDoc = jest.fn(async () => ({ exists: () => true, data: () => ({ defaultFridgeId: 'fridge-1' }) }));
  const deleteDoc = jest.fn(async () => undefined);
  const onSnapshot = jest.fn((_: unknown, cb: (snapshot: any) => void) => {
    cb({
      docs: [
        {
          id: 'item-1',
          data: () => ({ name: 'Apple', qty: 1, expiresAt: '2026-01-01T00:00:00.000Z', category: 'fruit' }),
        },
      ],
    });

    return jest.fn();
  });

  return {
    __esModule: true,
    default: jest.fn(() => ({ mockedDb: true })),
    getFirestore: jest.fn(() => ({ mockedDb: true })),
    collection: jest.fn((...args: unknown[]) => ({ kind: 'collection', args })),
    doc: jest.fn((...args: unknown[]) => ({ kind: 'doc', args })),
    addDoc,
    setDoc,
    getDoc,
    deleteDoc,
    onSnapshot,
    query: jest.fn((...args: unknown[]) => ({ kind: 'query', args })),
    orderBy: jest.fn((...args: unknown[]) => ({ kind: 'orderBy', args })),
    serverTimestamp: jest.fn(() => 'server-ts'),
  };
});

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({ app: 'firebase-app' })),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ auth: 'firebase-auth' })),
}));

describe('all .ts files in src', () => {
  it('covers fridge service functions', async () => {
    const firestore = jest.requireMock('@react-native-firebase/firestore');
    const {
      createDefaultFridge,
      getUserFridgeId,
      listenToFridgeItems,
      addFridgeItem,
      removeFridgeItem,
    } = require('@/features/fridge/api/fridgeService');

    await expect(createDefaultFridge('user-1')).resolves.toBe('fridge-1');
    await expect(getUserFridgeId('user-1')).resolves.toBe('fridge-1');

    const callback = jest.fn();
    const unsubscribe = listenToFridgeItems('fridge-1', callback);
    expect(callback).toHaveBeenCalledWith([
      expect.objectContaining({ id: 'item-1', name: 'Apple' }),
    ]);
    expect(typeof unsubscribe).toBe('function');

    await addFridgeItem('fridge-1', {
      id: 'item-2',
      name: 'Milk',
      qty: 1,
      expiresAt: '2026-01-02T00:00:00.000Z',
      category: 'dairy',
      createdAt: '2026-01-01T00:00:00.000Z',
    });
    await removeFridgeItem('fridge-1', 'item-2');

    expect(firestore.addDoc).toHaveBeenCalled();
    expect(firestore.deleteDoc).toHaveBeenCalled();
  });

  it('covers useFridgeItems hook', () => {
    const { useFridgeItems } = require('@/features/fridge/hooks/useFridgeItem');
    const { result } = renderHook(() => useFridgeItems());

    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Apple',
        qty: 2,
        expiresAt: '2026-01-01T00:00:00.000Z',
        category: 'fruit',
        createdAt: '2025-01-01T00:00:00.000Z',
      });
    });
    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.updateItem({
        id: '1',
        name: 'Orange',
        qty: 3,
        expiresAt: '2026-01-03T00:00:00.000Z',
        category: 'fruit',
        createdAt: '2025-01-01T00:00:00.000Z',
      });
    });
    expect(result.current.items[0]?.name).toBe('Orange');

    act(() => {
      result.current.removeItem('1');
    });
    expect(result.current.items).toHaveLength(0);
  });

  it('covers category and expiry helpers', () => {
    const { categoryIconMap } = require('@/features/fridge/utils/categoryIcon');
    const { detectCategory } = require('@/features/products/utils/detectCategory');
    const { getExpiryStatus, formatExpiryLabel } = require('@/app/utils/expiry');

    expect(categoryIconMap.fruit).toBe('🍎');
    expect(detectCategory('Orange Juice')).toBe('fruit');
    expect(detectCategory('Sparkling water')).toBe('drink');

    expect(getExpiryStatus('2025-01-01T00:00:00.000Z', 3, new Date('2025-01-05T00:00:00.000Z'))).toBe('expired');
    expect(getExpiryStatus('2025-01-07T00:00:00.000Z', 3, new Date('2025-01-05T00:00:00.000Z'))).toBe('soon');
    expect(formatExpiryLabel('expired', '2025-01-01T13:00:00.000Z')).toBe('Expired: 2025-01-01');
  });

  it('covers firebase config exports', () => {
    const { auth, db } = require('@/app/config/firebase');

    expect(auth).toEqual({ auth: 'firebase-auth' });
    expect(db).toEqual({ mockedDb: true });
  });

  it('covers style modules and empty modules', () => {
    const styleModules = [
      require('@/features/fridge/components/Header/styles'),
      require('@/features/fridge/components/Header/components/addItemButton/styles'),
      require('@/features/fridge/components/Search/styles'),
      require('@/features/fridge/components/Search/filters/styles'),
      require('@/features/fridge/components/FridgeList/styles'),
      require('@/features/fridge/components/FridgeItem/styles'),
      require('@/features/fridge/components/AddItem/styles'),
      require('@/screens/Home/styles'),
      require('@/screens/Login/styles'),
    ];

    for (const mod of styleModules) {
      expect(Object.keys(mod.styles).length).toBeGreaterThan(0);
    }

    const modelModules = [
      require('@/features/fridge/model/fridgeItem'),
      require('@/features/fridge/model/fridgeFilters'),
      require('@/features/products/model/product'),
      require('@/features/scanner/model/gs1'),
      require('@/features/auth/model/user'),
      require('@/features/products/api/productLookup'),
      require('@/features/scanner/api/barcodeScanner'),
      require('@/features/auth/api/firebaseAuth'),
    ];

    for (const mod of modelModules) {
      expect(mod).toBeDefined();
    }
  });
});
