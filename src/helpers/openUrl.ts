function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function openInNewTab(url: string): void {
  if (!isValidUrl(url)) {
    console.error(`openInNewTab: URL inválida → ${url}`);
    return;
  }
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.focus();
  } else {
    console.error(`openInNewTab: la ventana fue bloqueada por el navegador.`);
  }
}

export function openMeetLink(meetUrl: string): void {
  if (!meetUrl.includes('meet.google.com')) {
    console.warn(`openMeetLink: el enlace no parece ser un Meet → ${meetUrl}`);
  }
  openInNewTab(meetUrl);
}
