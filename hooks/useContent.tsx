import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data';
import { db } from '../lib/firebase';
import { collection, doc, onSnapshot, setDoc, updateDoc, getDocs, getDoc } from 'firebase/firestore';

const ContentContext = createContext<any>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(initialData);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const collRef = collection(db, 'websiteContent');
    
    // Check if DB is empty and seed it if needed
    getDocs(collRef).then((snapshot) => {
      if (snapshot.empty) {
        if (import.meta.env.DEV) {
          console.log("Firestore empty, seeding initial data...");
        }
        for (const [key, value] of Object.entries(initialData)) {
            setDoc(doc(db, 'websiteContent', key), { data: value }).catch(e => {
              if (import.meta.env.DEV) console.error("Could not seed doc:", e);
            });
        }
      }
    }).catch((error) => {
      if (import.meta.env.DEV) {
        console.warn("Firestore getDocs permission issue or network error:", error);
      }
    });

    const unsubscribe = onSnapshot(collRef, (snapshot) => {
      const newParsedData: any = {};
      
      snapshot.forEach(docSnap => {
          newParsedData[docSnap.id] = docSnap.data().data;
      });

      if (!snapshot.empty) {
          // Deep merge the fetched data over the initialData.
          // This ensures that if the database is only partially seeded or missing entire documents (like contact/about),
          // top-level components outside the ErrorBoundary (like Footer) won't fatally crash.
          const mergedData: any = { ...initialData, ...newParsedData };
          if (newParsedData.products && Array.isArray(newParsedData.products)) {
            mergedData.products = newParsedData.products.map((p: any) => {
              const initP = (initialData.products as any[]).find(
                (ip: any) => String(ip.id) === String(p.id) || ip.title?.toLowerCase() === p.title?.toLowerCase()
              );
              return {
                ...initP,
                ...p,
                appStoreLink: (p.appStoreLink && p.appStoreLink !== '#') 
                  ? p.appStoreLink 
                  : (initP?.appStoreLink && initP?.appStoreLink !== '#' ? initP.appStoreLink : ''),
                playStoreLink: (p.playStoreLink && p.playStoreLink !== '#') 
                  ? p.playStoreLink 
                  : (initP?.playStoreLink && initP?.playStoreLink !== '#' ? initP.playStoreLink : ''),
              };
            });
          }
          setData(mergedData);
      } else {
          setData(initialData);
      }
      setContentLoading(false);
    }, (error) => {
      console.error("Firestore real-time sync error:", error);
      // Fallback to static data so the website still functions for visitors
      setData(initialData);
      setContentLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateContent = async (section: string, newValue: any) => {
    setData((prev: any) => ({ ...prev, [section]: newValue }));
    try {
      await setDoc(doc(db, 'websiteContent', section), { data: newValue });
    } catch (e) {
      console.error("Firestore updateContent error:", e);
    }
  };

  const addItem = async (section: string, item: any) => {
    const docRef = doc(db, 'websiteContent', section);
    getDoc(docRef).then(async (snap) => {
      let currentArr = snap.exists() ? (snap.data().data || []) : ((initialData as any)[section] || []);
      const newItem = { ...item, id: Date.now() };
      currentArr.push(newItem);
      await setDoc(docRef, { data: currentArr });
    });
  };

  const editItem = async (section: string, id: number, updatedFields: any) => {
    const docRef = doc(db, 'websiteContent', section);
    getDoc(docRef).then(async (snap) => {
        let currentArr = snap.exists() ? (snap.data().data || []) : ((initialData as any)[section] || []);
        const index = currentArr.findIndex((item:any) => item.id === id);
        if (index !== -1) {
            currentArr[index] = { ...currentArr[index], ...updatedFields };
            await setDoc(docRef, { data: currentArr });
        }
    });
  };

  const deleteItem = async (section: string, id: number) => {
    const docRef = doc(db, 'websiteContent', section);
    getDoc(docRef).then(async (snap) => {
        let currentArr = snap.exists() ? (snap.data().data || []) : ((initialData as any)[section] || []);
        const newArr = currentArr.filter((item:any) => item.id !== id);
        await setDoc(docRef, { data: newArr });
    });
  };

  const toggleProduct = async (id: number) => {
    const docRef = doc(db, 'websiteContent', 'products');
    getDoc(docRef).then(async (snap) => {
         let currentArr = snap.exists() ? (snap.data().data || []) : ((initialData as any)['products'] || []);
         const index = currentArr.findIndex((item:any) => item.id === id);
         if(index !== -1) {
             currentArr[index].enabled = !currentArr[index].enabled;
             await setDoc(docRef, { data: currentArr });
         }
    });
  };

  return (
    <ContentContext.Provider value={{ 
      data, 
      contentLoading,
      updateContent, 
      addItem, 
      editItem,
      updateItem: editItem, // alias for admins
      deleteItem,
      toggleProduct
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    return {
      data: initialData,
      contentLoading: false,
      updateContent: async () => {},
      addItem: async () => {},
      editItem: async () => {},
      updateItem: async () => {},
      deleteItem: async () => {},
      toggleProduct: async () => {}
    };
  }
  return context;
};
