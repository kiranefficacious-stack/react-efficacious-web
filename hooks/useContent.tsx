import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data';
import { api } from '../services/api';

const ContentContext = createContext<any>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(initialData);
  const [contentLoading, setContentLoading] = useState(true);

  const loadContent = async () => {
    try {
      const backendData = await api.getContent();
      if (backendData && Object.keys(backendData).length > 0) {
        const mergedData: any = { ...initialData };
        
        for (const [key, val] of Object.entries(backendData)) {
          mergedData[key] = (val && typeof val === 'object' && 'data' in (val as any)) ? (val as any).data : val;
        }

        if (mergedData.products && Array.isArray(mergedData.products)) {
          mergedData.products = mergedData.products.map((p: any) => {
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
    } catch (err) {
      console.warn(".NET API content load fallback to initialData:", err);
      setData(initialData);
    } finally {
      setContentLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const updateContent = async (section: string, newValue: any) => {
    setData((prev: any) => ({ ...prev, [section]: newValue }));
    try {
      await api.saveContent(section, { data: newValue });
    } catch (e) {
      console.error(".NET API updateContent error:", e);
    }
  };

  const addItem = async (section: string, item: any) => {
    const currentArr = Array.isArray(data[section]) ? [...data[section]] : [];
    const newItem = { ...item, id: Date.now() };
    currentArr.push(newItem);
    await updateContent(section, currentArr);
  };

  const editItem = async (section: string, id: number, updatedFields: any) => {
    const currentArr = Array.isArray(data[section]) ? [...data[section]] : [];
    const index = currentArr.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      currentArr[index] = { ...currentArr[index], ...updatedFields };
      await updateContent(section, currentArr);
    }
  };

  const deleteItem = async (section: string, id: number) => {
    const currentArr = Array.isArray(data[section]) ? [...data[section]] : [];
    const newArr = currentArr.filter((item: any) => item.id !== id);
    await updateContent(section, newArr);
  };

  const toggleProduct = async (id: number) => {
    const currentArr = Array.isArray(data['products']) ? [...data['products']] : [];
    const index = currentArr.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      currentArr[index].enabled = !currentArr[index].enabled;
      await updateContent('products', currentArr);
    }
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
      toggleProduct,
      refreshContent: loadContent
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
      toggleProduct: async () => {},
      refreshContent: async () => {}
    };
  }
  return context;
};
