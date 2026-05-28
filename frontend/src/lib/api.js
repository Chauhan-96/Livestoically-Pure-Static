import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public APIs
export const getPillars = () => api.get('/pillars');
export const getPillar = (slug) => api.get(`/pillars/${slug}`);
export const getPillarById = async (pillarId) => {
  const pillarsRes = await api.get('/pillars');
  const pillar = pillarsRes.data.find(p => p.id === pillarId);
  return { data: pillar };
};
export const getArticles = (publishedOnly = true, pillarId = null) => {
  const params = new URLSearchParams();
  params.append('published_only', publishedOnly);
  if (pillarId) params.append('pillar_id', pillarId);
  return api.get(`/articles?${params}`);
};
export const getFeaturedArticles = () => api.get('/articles/featured');
export const getArticle = (slug) => api.get(`/articles/${slug}`);
export const subscribe = (email) => api.post('/subscribe', { email });

// Admin APIs
export const adminLogin = (email, password) => api.post('/admin/login', { email, password });
export const getAdminStats = () => api.get('/admin/stats');
export const getAllArticles = () => api.get('/articles?published_only=false');
export const createArticle = (article) => api.post('/articles', article);
export const updateArticle = (id, article) => api.put(`/articles/${id}`, article);
export const deleteArticle = (id) => api.delete(`/articles/${id}`);

// AI APIs
export const generateArticle = (topic, pillarId, tone = 'calm, grounded, minimal', length = 'medium') =>
  api.post('/ai/generate-article', { topic, pillar_id: pillarId, tone, length });
export const generateSEO = (title, content) =>
  api.post('/ai/generate-seo', { title, content });

// Pipeline APIs (19-Agent System)
export const pipelineResearch = (keywordRequest) =>
  api.post('/pipeline/research', { keyword_request: keywordRequest });
export const pipelineRun = (params) =>
  api.post('/pipeline/run', params);
export const pipelineStatus = (pipelineId) =>
  api.get(`/pipeline/status/${pipelineId}`);
export const pipelineAll = () =>
  api.get('/pipeline/all');
export const getAgents = () =>
  api.get('/agents');
export const getAgentCosts = () =>
  api.get('/agents/costs');
export const runSingleAgent = (agentId) =>
  api.post(`/pipeline/run-agent/${agentId}`);

export default api;
