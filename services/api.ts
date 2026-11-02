/**
 * Efficacious .NET Backend API Service
 * Centralized, type-safe communication with the ASP.NET Core API backend.
 * Replaces direct Firebase/Firestore calls with high-performance .NET REST endpoints.
 */

const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.endsWith('.local'));

const getLiveApiBase = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'wp.efficacious.co.in' || window.location.hostname.endsWith('efficacious.co.in')) {
      return `${window.location.protocol}//${window.location.host}/api`;
    }
  }
  return 'http://wp.efficacious.co.in/api';
};

export const API_BASE = (typeof window !== 'undefined' && (window as any).__EFFICACIOUS_API_URL__)
  || (isLocal ? (import.meta.env.VITE_API_URL || 'http://localhost:5231/api') : getLiveApiBase());

async function parseJsonSafely(res: Response): Promise<any> {
  const text = await res.text();
  if (!text || !text.trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { rawText: text };
  }
}

export const api = {
  // Website Content
  async getContent(): Promise<Record<string, any>> {
    const res = await fetch(`${API_BASE}/content`);
    if (!res.ok) throw new Error(`Failed to fetch content: HTTP ${res.status}`);
    return parseJsonSafely(res);
  },

  async getContentByKey(key: string): Promise<any> {
    const res = await fetch(`${API_BASE}/content/${key}`);
    if (!res.ok) throw new Error(`Failed to fetch content for ${key}: HTTP ${res.status}`);
    return parseJsonSafely(res);
  },

  async saveContent(key: string, payload: any): Promise<any> {
    const res = await fetch(`${API_BASE}/content/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await parseJsonSafely(res);
    if (!res.ok) {
      const errMsg = data?.detail || data?.error || data?.message || `HTTP ${res.status}`;
      throw new Error(errMsg);
    }
    return data;
  },

  // Admin Authentication
  async login(email: string, password: string): Promise<{ success: boolean; error?: string; token?: string; user?: any }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await parseJsonSafely(res);
      if (!res.ok) {
        return { 
          success: false, 
          error: data.error || data.message || (res.status === 401 ? 'Invalid email or password. Please verify your admin credentials.' : `Server error (HTTP ${res.status})`)
        };
      }
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Unable to connect to authentication server' };
    }
  },

  // Chat & Support
  async getChatSessions(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/chat/sessions`);
    if (!res.ok) return [];
    return parseJsonSafely(res);
  },

  async getChatSession(sessionId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}`);
    if (!res.ok) return null;
    return parseJsonSafely(res);
  },

  async updateChatSession(sessionId: string, updates: { status?: string; adminJoined?: boolean; unreadAdmin?: number; unreadUser?: number }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return parseJsonSafely(res);
  },

  async deleteChatSession(sessionId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}`, {
      method: 'DELETE'
    });
    return parseJsonSafely(res);
  },

  async clearInactiveSessions(): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/inactive/clear`, {
      method: 'DELETE'
    });
    return parseJsonSafely(res);
  },

  async sendChatMessage(sessionId: string, message: { text: string; sender?: string; userName?: string; userEmail?: string; userMobile?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    return parseJsonSafely(res);
  },

  // Chatbot Q&A Knowledge Base
  async getQaList(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/chat/qa`);
    if (!res.ok) return [];
    return parseJsonSafely(res);
  },

  async createQa(data: { questionKeywords: string; answerText: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/qa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return parseJsonSafely(res);
  },

  async updateQa(id: string, data: { questionKeywords: string; answerText: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/qa/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return parseJsonSafely(res);
  },

  async deleteQa(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/qa/${id}`, {
      method: 'DELETE'
    });
    return parseJsonSafely(res);
  },

  // Chat Settings
  async getChatSettings(): Promise<{ isLiveSupportActive: boolean }> {
    const res = await fetch(`${API_BASE}/chat/settings`);
    if (!res.ok) return { isLiveSupportActive: true };
    return parseJsonSafely(res);
  },

  async saveChatSettings(settings: { isLiveSupportActive: boolean }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return parseJsonSafely(res);
  }
};
