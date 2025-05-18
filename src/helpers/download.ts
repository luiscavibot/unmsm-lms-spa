// src/helpers/download.ts

/**
 * Extrae un nombre de archivo de una URL (o usa 'download' si falla).
 */
function getFilenameFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const name = pathname.substring(pathname.lastIndexOf('/') + 1);
    return name || 'download';
  } catch {
    const parts = url.split('/');
    return parts[parts.length - 1].split('?')[0] || 'download';
  }
}

/**
 * Descarga un recurso remoto sin cambiar de pestaña.
 *
 * @param url       - URL del archivo a descargar.
 * @param filename? - Nombre de archivo deseado (si no, se extrae de la URL).
 */
export async function downloadFileFromUrlString(url: string, filename?: string): Promise<void> {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename ?? getFilenameFromUrl(url);
    // Necesario para Firefox
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Libera la URL de objeto en cuanto termine
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (err) {
    console.error('Error al descargar archivo:', err);
    alert('No se pudo descargar el archivo.');
  }
}
