export function getInitials(name: string): string {
  return (
    name
      .split(' ')
      .filter((w) => w.length > 0)
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join('') || '?'
  );
}
