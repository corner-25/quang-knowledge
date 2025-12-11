export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  _count?: {
    knowledgeCategories: number;
  };
}

export interface Country {
  id: string;
  name: string;
  code?: string;
  region?: string;
  description?: string;
  _count?: {
    knowledgeCountries: number;
  };
}

export interface Tag {
  id: string;
  name: string;
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  description?: string;
  content?: string;
  year: number;
  month?: number;
  day?: number;
  isBc: boolean;
  approximateDate: boolean;
  importanceLevel: number;
  source?: string;
  createdAt: string;
  updatedAt: string;
  categories?: Array<{
    categoryId: string;
    isPrimary: boolean;
    category: Category;
  }>;
  countries?: Array<{
    countryId: string;
    isPrimary: boolean;
    country: Country;
  }>;
  tags?: Array<{
    tagId: string;
    tag: Tag;
  }>;
}

export type TimelineView = 'timeline' | 'list' | 'grid' | 'calendar';
