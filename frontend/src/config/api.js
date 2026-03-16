const API_BASE_URL = (process.env.API_BASE_URL || 'http://localhost:3000/api').replace(/\/+$/, '');

function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

module.exports = {
  API_BASE_URL,
  buildApiUrl,
};
