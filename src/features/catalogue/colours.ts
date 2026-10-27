export const COLOURS: Record<string, string> = {
  Navy: '#1F2A44',
  Black: '#111111',
  Charcoal: '#36454F',
  Grey: '#8A8D91',
  Burgundy: '#6D1A2B',
  Silver: '#C0C0C8',
  Green: '#1F4D3A',
  'Light Blue': '#A7C7E7',
  White: '#F5F5F5',
  Pink: '#E8B4C0',
  Gold: '#B8893B',
  Brown: '#5C3A21',
  Tan: '#C69C6D',
};

export function colourHex(name: string) {
  return COLOURS[name] ?? '#CCCCCC';
}
