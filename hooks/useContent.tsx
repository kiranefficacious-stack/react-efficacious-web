
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data';

const CONTENT_KEY = 'efficacious_site_content';

const ContentContext = createContext<any>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(CONTENT_KEY);
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(data));
  }, [data]);

  const updateContent = (section: string, newValue: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: newValue
    }));
  };

  const addItem = (section: string, item: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now() }]
    }));
  };

  const editItem = (section: string, id: number, updatedFields: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].map((item: any) => 
        item.id === id ? { ...item, ...updatedFields } : item
      )
    }));
  };

  const deleteItem = (section: string, id: number) => {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id)
    }));
  };

  const toggleProduct = (id: number) => {
    setData((prev: any) => ({
      ...prev,
      products: prev.products.map((p: any) => 
        p.id === id ? { ...p, enabled: !p.enabled } : p
      )
    }));
  };

  return (
    <ContentContext.Provider value={{ 
      data, 
      updateContent, 
      addItem, 
      editItem, 
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
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
