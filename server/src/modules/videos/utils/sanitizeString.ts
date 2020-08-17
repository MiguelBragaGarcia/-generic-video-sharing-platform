export default function sanitizeString(data: string): string[] {
  const parsedString = data.normalize('NFD').replace(/[^a-zA-Z( )]/g, '');

  const spliceString = parsedString.split(' ');

  return spliceString;
}
