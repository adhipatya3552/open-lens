export interface Category {
  id: string;
  name: string;
  subcategories: string[];
  isCustom?: boolean;
}

export const defaultCategories: Category[] = [
  {
    id: 'nature',
    name: 'Nature',
    subcategories: ['Landscape', 'Wildlife', 'Forest', 'Ocean', 'Mountains']
  },
  {
    id: 'urban',
    name: 'Urban',
    subcategories: ['City', 'Architecture', 'Street', 'Night', 'Buildings']
  },
  {
    id: 'people',
    name: 'People',
    subcategories: ['Portrait', 'Lifestyle', 'Fashion', 'Culture', 'Events']
  },
  {
    id: 'technology',
    name: 'Technology',
    subcategories: ['Gadgets', 'Software', 'Innovation', 'Digital', 'AI']
  },
  {
    id: 'art',
    name: 'Art',
    subcategories: ['Abstract', 'Painting', 'Design', 'Sculpture', 'Digital Art']
  },
  {
    id: 'other',
    name: 'Other',
    subcategories: ['Food', 'Travel', 'Sports', 'Business', 'Education']
  }
];
