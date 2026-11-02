import { useState, useEffect } from 'react';

export function useProductTestimonials(productIdOrTitle: string | number, defaultItems: any[] = []) {
  const [testimonials, setTestimonials] = useState<any[]>(defaultItems);

  useEffect(() => {
    let isMounted = true;

    const extractTestimonials = (products: any[]) => {
      if (!Array.isArray(products)) return null;
      const target = products.find((p: any) =>
        String(p.id) === String(productIdOrTitle) ||
        p.title?.toLowerCase() === String(productIdOrTitle).toLowerCase() ||
        (p.href && p.href.toLowerCase().includes(String(productIdOrTitle).toLowerCase()))
      );
      if (target && Array.isArray(target.testimonials) && target.testimonials.length > 0) {
        return target.testimonials;
      }
      return null;
    };

    // 1. Check localStorage sync event / cache
    try {
      const syncStr = localStorage.getItem('efficacious_content_sync_event');
      if (syncStr) {
        const parsed = JSON.parse(syncStr);
        if (parsed.section === 'products' && parsed.newValue) {
          const found = extractTestimonials(parsed.newValue);
          if (found && isMounted) setTestimonials(found);
        }
      }
    } catch {}

    // 2. Fetch from backend API
    const fetchFromApi = async () => {
      try {
        const isLocal = typeof window !== 'undefined' && (
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.endsWith('.local')
        );
        const apiBase = isLocal ? 'http://localhost:5231/api' : 'http://wp.efficacious.co.in/api';
        const res = await fetch(`${apiBase}/content/products`);
        if (res.ok) {
          const json = await res.json();
          const products = (json && typeof json === 'object' && 'data' in json) ? json.data : json;
          const found = extractTestimonials(products);
          if (found && isMounted) {
            setTestimonials(found);
          }
        }
      } catch (err) {
        // Fall back gracefully to default items
      }
    };
    fetchFromApi();

    // 3. Listen to BroadcastChannel for real-time live updates
    let channel: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel('efficacious_content_sync');
        channel.onmessage = (event) => {
          if (event.data?.section === 'products' && event.data?.newValue) {
            const found = extractTestimonials(event.data.newValue);
            if (found && isMounted) setTestimonials(found);
          }
        };
      } catch {}
    }

    // 4. Storage event listener (cross-tab fallback)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'efficacious_content_sync_event' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.section === 'products' && parsed.newValue) {
            const found = extractTestimonials(parsed.newValue);
            if (found && isMounted) setTestimonials(found);
          }
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      isMounted = false;
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, [productIdOrTitle]);

  return testimonials;
}

