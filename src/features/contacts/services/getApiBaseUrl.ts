const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();

export function getApiBaseUrl(): string {
  if (!configuredBaseUrl || configuredBaseUrl === 'undefined' || configuredBaseUrl === 'null') {
    return '';
  }

  return configuredBaseUrl.replace(/\/$/, '');
}
