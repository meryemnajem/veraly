
export type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  features: string[];
};

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
