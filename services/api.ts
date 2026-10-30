/**
 * Efficacious .NET Backend API Service
 * Centralized, type-safe communication with the ASP.NET Core API backend.
 * Replaces direct Firebase/Firestore calls with high-performance .NET REST endpoints.
 */

export const API_BASE = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5231/api'
    : '/api');

export const api = {
  // Website Content
  async getContent(): Promise<Record<string, any>> {
    const res = await fetch(`${API_BASE}/content`);
    if (!res.ok) throw new Error(`Failed to fetch content: HTTP ${res.status}`);
    return res.json();
  },

  async getContentByKey(key: string): Promise<any> {
    const res = await fetch(`${API_BASE}/content/${key}`);
    if (!res.ok) throw new Error(`Failed to fetch content for ${key}: HTTP ${res.status}`);
    return res.json();
  },

  async saveContent(key: string, payload: any): Promise<any> {
    const res = await fetch(`${API_BASE}/content/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Failed to save content for ${key}: HTTP ${res.status}`);
    return res.json();
  },

  // Admin Authentication
  async login(email: string, password: string): Promise<{ success: boolean; error?: string; token?: string; user?: any }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Invalid credentials' };
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
    return res.json();
  },

  async getChatSession(sessionId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}`);
    if (!res.ok) return null;
    return res.json();
  },

  async updateChatSession(sessionId: string, updates: { status?: string; adminJoined?: boolean; unreadAdmin?: number; unreadUser?: number }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  async deleteChatSession(sessionId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  async clearInactiveSessions(): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/inactive/clear`, {
      method: 'DELETE'
    });
    return res.json();
  },

  async sendChatMessage(sessionId: string, message: { text: string; sender?: string; userName?: string; userEmail?: string; userMobile?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    return res.json();
  },

  // Chatbot Q&A Knowledge Base
  async getQaList(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/chat/qa`);
    if (!res.ok) return [];
    return res.json();
  },

  async createQa(data: { questionKeywords: string; answerText: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/qa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateQa(id: string, data: { questionKeywords: string; answerText: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/qa/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteQa(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/qa/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Chat Settings
  async getChatSettings(): Promise<{ isLiveSupportActive: boolean }> {
    const res = await fetch(`${API_BASE}/chat/settings`);
    if (!res.ok) return { isLiveSupportActive: true };
    return res.json();
  },

  async saveChatSettings(settings: { isLiveSupportActive: boolean }): Promise<any> {
    const res = await fetch(`${API_BASE}/chat/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return res.json();
  }
};
