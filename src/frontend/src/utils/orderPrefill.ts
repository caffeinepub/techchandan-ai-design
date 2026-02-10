export function encodeServicePrefill(serviceId: string): string {
  return encodeURIComponent(serviceId);
}

export function decodeServicePrefill(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    return '';
  }
}
