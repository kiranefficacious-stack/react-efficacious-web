import { useState, useEffect } from 'react';

export interface TeamMember {
  id?: number | string;
  name: string;
  role: string;
  image?: string;
  description?: string;
  bio?: string;
  initials?: string;
  linkedin?: string;
}

export function useTeamMembers(defaultItems: TeamMember[] = []): TeamMember[] {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultItems);

  useEffect(() => {
    let isMounted = true;

    // 1. Check localStorage sync event / cache first
    try {
      const syncStr = localStorage.getItem('efficacious_content_sync_event');
      if (syncStr) {
        const parsed = JSON.parse(syncStr);
        if (parsed.section === 'team' && Array.isArray(parsed.newValue) && parsed.newValue.length > 0) {
          if (isMounted) setTeamMembers(parsed.newValue);
        }
      }
    } catch {}

    // 2. Fetch from backend API
    const fetchTeam = async () => {
      try {
        const isLocal = typeof window !== 'undefined' && (
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.endsWith('.local')
        );
        const apiBase = (typeof window !== 'undefined' && (window as any).__EFFICACIOUS_API_URL__)
          || (isLocal ? 'http://localhost:5231/api' : 'http://wp.efficacious.co.in/api');

        const res = await fetch(`${apiBase}/content/team`);
        if (res.ok) {
          const json = await res.json();
          const items = (json && typeof json === 'object' && 'data' in json) ? json.data : json;
          if (Array.isArray(items) && items.length > 0 && isMounted) {
            setTeamMembers(items);
          }
        }
      } catch (err) {
        // Fall back gracefully to defaultItems
      }
    };

    fetchTeam();

    // 3. Listen to BroadcastChannel for instant real-time sync when modified in Admin
    let channel: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel('efficacious_content_sync');
        channel.onmessage = (event) => {
          if (event.data?.section === 'team' && Array.isArray(event.data?.newValue)) {
            if (isMounted) setTeamMembers(event.data.newValue);
          }
        };
      } catch {}
    }

    // 4. Storage event listener (cross-tab fallback)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'efficacious_content_sync_event' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.section === 'team' && Array.isArray(parsed.newValue)) {
            if (isMounted) setTeamMembers(parsed.newValue);
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
  }, []);

  return teamMembers;
}

