export type DeckName = 'Custom' | 'Scrum' | 'Fibonacci' | 'Risk' | 'T-shirt';

interface IDeck {
  name: DeckName;
  options: string[];
}

const defaultDecks: IDeck[] = [{
  name: 'Scrum',
  options: ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '∞', '?', '☕'],
}, {
  name: 'Fibonacci',
  options: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '∞', '?', '☕'],
}, {
  name: 'Risk',
  options: ['none', 'low', 'medium', 'high', 'critical', '?', '☕'],
}, {
  name: 'T-shirt',
  options: ['S', 'M', 'L', 'XL', '?'],
}];

export default defaultDecks;
