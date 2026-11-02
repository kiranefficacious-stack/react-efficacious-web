import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { initialData } from '../data';
import { api } from '../services/api';
import { useToast } from './useToast';

const ContentContext = createContext<any>(null);

const SYNC_CHANNEL_NAME = 'efficacious_content_sync';
const STORAGE_SYNC_KEY = 'efficacious_content_sync_event';

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(initialData);
  const [contentLoading, setContentLoading] = useState(true);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const { showToast } = useToast();

  const loadContent = useCallback(async () => {
    try {
      const backendData = await api.getContent();
      if (backendData && Object.keys(backendData).length > 0) {
        const mergedData: any = { ...initialData };
        
        for (const [key, val] of Object.entries(backendData)) {
          const extracted = (val && typeof val === 'object' && 'data' in (val as any)) ? (val as any).data : val;
          if (extracted !== undefined && extracted !== null) {
            mergedData[key] = extracted;
          }
        }

        if (mergedData.products && Array.isArray(mergedData.products)) {
          mergedData.products = mergedData.products.map((p: any) => {
            const initP = (initialData.products as any[]).find(
              (ip: any) => String(ip.id) === String(p.id) || ip.title?.toLowerCase() === p.title?.toLowerCase()
            );
            return {
              ...initP,
              ...p,
              testimonials: (p.testimonials && Array.isArray(p.testimonials))
                ? p.testimonials
                : (initP?.testimonials || []),
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
  }, []);

  // Initial load
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Set up real-time cross-tab synchronization & visibility sync
  useEffect(() => {
    // 1. BroadcastChannel for instant cross-tab sync
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        broadcastChannelRef.current = channel;

        channel.onmessage = (event) => {
          if (event.data?.type === 'CONTENT_UPDATED' && event.data?.section) {
            const { section, newValue } = event.data;
            setData((prev: any) => ({ ...prev, [section]: newValue }));
          } else if (event.data?.type === 'REFRESH_ALL') {
            loadContent();
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not initialized:', err);
      }
    }

    // 2. Storage event fallback for older browsers or if BroadcastChannel is blocked
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === STORAGE_SYNC_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed?.section && parsed?.newValue !== undefined) {
            setData((prev: any) => ({ ...prev, [parsed.section]: parsed.newValue }));
          }
        } catch {
          loadContent();
        }
      }
    };
    window.addEventListener('storage', handleStorageEvent);

    // 3. Auto-refresh when tab becomes visible (e.g. switching back from Admin to Website tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadContent();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
      window.removeEventListener('storage', handleStorageEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadContent]);

  // Helper to notify other tabs/windows of content changes
  const notifyCrossTabSync = (section: string, newValue: any) => {
    try {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({
          type: 'CONTENT_UPDATED',
          section,
          newValue,
          timestamp: Date.now()
        });
      }
    } catch {}

    try {
      localStorage.setItem(STORAGE_SYNC_KEY, JSON.stringify({
        section,
        newValue,
        timestamp: Date.now()
      }));
    } catch {}
  };

  const updateContent = async (section: string, newValue: any): Promise<boolean> => {
    const previousValue = data[section];
    setData((prev: any) => ({ ...prev, [section]: newValue }));
    notifyCrossTabSync(section, newValue);
    try {
      await api.saveContent(section, { data: newValue });
      return true;
    } catch (e: any) {
      console.error(`.NET API updateContent error for ${section}:`, e);
      // Revert state on failure
      setData((prev: any) => ({ ...prev, [section]: previousValue }));
      notifyCrossTabSync(section, previousValue);
      showToast('error', `Failed to save changes to server: ${e?.message || 'Server error'}. Changes reverted.`, 5000);
      return false;
    }
  };

  const addItem = async (section: string, item: any): Promise<boolean> => {
    const newItem = {
      id: item.id || Date.now(),
      ...item
    };

    let previousArr: any[] = [];
    let updatedArr: any[] = [];
    setData((prev: any) => {
      previousArr = Array.isArray(prev[section]) ? [...prev[section]] : [];
      updatedArr = [...previousArr, newItem];
      return { ...prev, [section]: updatedArr };
    });

    notifyCrossTabSync(section, updatedArr);
    try {
      await api.saveContent(section, { data: updatedArr });
      return true;
    } catch (e: any) {
      console.error(`.NET API addItem error for ${section}:`, e);
      // Revert state on failure
      setData((prev: any) => ({ ...prev, [section]: previousArr }));
      notifyCrossTabSync(section, previousArr);
      showToast('error', `Failed to save new item to server: ${e?.message || 'Server error'}. Changes reverted.`, 5000);
      return false;
    }
  };

  const editItem = async (section: string, id: number | string, updatedFields: any): Promise<boolean> => {
    let previousArr: any[] = [];
    let updatedArr: any[] = [];
    setData((prev: any) => {
      previousArr = Array.isArray(prev[section]) ? [...prev[section]] : [];
      const index = previousArr.findIndex((item: any) => String(item.id) === String(id));
      if (index !== -1) {
        const copy = [...previousArr];
        copy[index] = { ...copy[index], ...updatedFields };
        updatedArr = copy;
        return { ...prev, [section]: updatedArr };
      }
      updatedArr = previousArr;
      return prev;
    });

    if (updatedArr.length > 0) {
      notifyCrossTabSync(section, updatedArr);
      try {
        await api.saveContent(section, { data: updatedArr });
        return true;
      } catch (e: any) {
        console.error(`.NET API editItem error for ${section}:`, e);
        // Revert state on failure
        setData((prev: any) => ({ ...prev, [section]: previousArr }));
        notifyCrossTabSync(section, previousArr);
        showToast('error', `Failed to update item on server: ${e?.message || 'Server error'}. Changes reverted.`, 5000);
        return false;
      }
    }
    return false;
  };

  const deleteItem = async (section: string, id: number | string): Promise<boolean> => {
    let previousArr: any[] = [];
    let updatedArr: any[] = [];
    setData((prev: any) => {
      previousArr = Array.isArray(prev[section]) ? [...prev[section]] : [];
      updatedArr = previousArr.filter((item: any) => String(item.id) !== String(id));
      return { ...prev, [section]: updatedArr };
    });

    notifyCrossTabSync(section, updatedArr);
    try {
      await api.saveContent(section, { data: updatedArr });
      return true;
    } catch (e: any) {
      console.error(`.NET API deleteItem error for ${section}:`, e);
      // Revert state immediately so item is restored on screen
      setData((prev: any) => ({ ...prev, [section]: previousArr }));
      notifyCrossTabSync(section, previousArr);
      showToast('error', `Server rejected deletion (${e?.message || 'Server error'}). Item restored.`, 5000);
      return false;
    }
  };

  const toggleProduct = async (id: number | string): Promise<boolean> => {
    let previousArr: any[] = [];
    let updatedArr: any[] = [];
    setData((prev: any) => {
      previousArr = Array.isArray(prev['products']) ? [...prev['products']] : [];
      const index = previousArr.findIndex((item: any) => String(item.id) === String(id));
      if (index !== -1) {
        const copy = [...previousArr];
        copy[index] = { ...copy[index], enabled: !copy[index].enabled };
        updatedArr = copy;
        return { ...prev, ['products']: updatedArr };
      }
      updatedArr = previousArr;
      return prev;
    });

    if (updatedArr.length > 0) {
      notifyCrossTabSync('products', updatedArr);
      try {
        await api.saveContent('products', { data: updatedArr });
        return true;
      } catch (e: any) {
        console.error(".NET API toggleProduct error:", e);
        // Revert state on failure
        setData((prev: any) => ({ ...prev, ['products']: previousArr }));
        notifyCrossTabSync('products', previousArr);
        showToast('error', `Failed to update product status on server: ${e?.message || 'Server error'}. Changes reverted.`, 5000);
        return false;
      }
    }
    return false;
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
      updateContent: async () => false,
      addItem: async () => false,
      editItem: async () => false,
      updateItem: async () => false,
      deleteItem: async () => false,
      toggleProduct: async () => false,
      refreshContent: async () => {}
    };
  }
  return context;
};
