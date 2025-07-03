
export type EventCategory = 'Technical' | 'Cultural' | 'Sports' | 'Social';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: EventCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ViewType = 'list' | 'calendar';

export interface User {
  id: string;
  email: string;
  name: string;
}
