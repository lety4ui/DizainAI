export type AppScreen = 'main' | 'processing' | 'result';

export interface DesignStyle {
  id: string;
  name: string;
  nameRu: string;
  emoji: string;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
}
