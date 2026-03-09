export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  minQuantity?: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 't1',
    name: 'Regular Fit 180 GSM Plain Tee',
    category: 'Round Neck',
    image: '/images/180gsm.png',
    description: '180 GSM 100% Cotton. Double Bio-Washed. Clean, structured look. Available in multiple colors.',
    minQuantity: 10
  },
  {
    id: 't2',
    name: 'Oversized 220 GSM Plain Tee',
    category: 'Round Neck',
    image: '/images/220gsm-rack.png',
    description: 'Premium 220 GSM 100% Cotton. Double Bio-Washed. Classic Oversized Fit on Hanger.',
    minQuantity: 10
  },
  {
    id: 't3',
    name: 'Oversized 240 GSM French Terry Tee',
    category: 'Round Neck',
    image: '/images/stack-1.png',
    description: '240 GSM 100% Cotton French Terry. Heavyweight comfort and premium drape.',
    minQuantity: 10
  },
  {
    id: 'p1',
    name: 'Polo 220 GSM Matty Tee',
    category: 'Polos',
    image: '/images/polo.png',
    description: '220 GSM Matty 100% Cotton. Ideal for corporate branding and semi-formal wear.',
    minQuantity: 10
  }
];
