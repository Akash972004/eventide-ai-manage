
import { Event, EventCategory } from './types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Conference 2024',
    description: 'Join us for the biggest React conference of the year! Learn about the latest features, best practices, and network with fellow developers.',
    date: new Date('2024-08-15T09:00:00'),
    location: 'San Francisco Convention Center',
    category: 'Technical' as EventCategory,
    tags: ['React', 'JavaScript', 'Frontend', 'Conference', 'Networking'],
    createdAt: new Date('2024-07-01T10:00:00'),
    updatedAt: new Date('2024-07-01T10:00:00'),
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'Experience an amazing lineup of local and international artists in this three-day music celebration.',
    date: new Date('2024-08-20T18:00:00'),
    location: 'Golden Gate Park',
    category: 'Cultural' as EventCategory,
    tags: ['Music', 'Festival', 'Arts', 'Entertainment', 'Outdoor'],
    createdAt: new Date('2024-07-02T11:00:00'),
    updatedAt: new Date('2024-07-02T11:00:00'),
  },
  {
    id: '3',
    title: 'Community Basketball Tournament',
    description: 'Annual community basketball tournament bringing together teams from across the city. All skill levels welcome!',
    date: new Date('2024-08-10T14:00:00'),
    location: 'Community Sports Center',
    category: 'Sports' as EventCategory,
    tags: ['Basketball', 'Tournament', 'Community', 'Sports', 'Competition'],
    createdAt: new Date('2024-07-03T12:00:00'),
    updatedAt: new Date('2024-07-03T12:00:00'),
  },
  {
    id: '4',
    title: 'Networking Happy Hour',
    description: 'Monthly networking event for professionals in tech. Great opportunity to meet new people and grow your network.',
    date: new Date('2024-08-25T17:30:00'),
    location: 'Downtown Tech Hub',
    category: 'Social' as EventCategory,
    tags: ['Networking', 'Professional', 'Tech', 'Happy Hour', 'Social'],
    createdAt: new Date('2024-07-04T13:00:00'),
    updatedAt: new Date('2024-07-04T13:00:00'),
  },
  {
    id: '5',
    title: 'AI Workshop Series',
    description: 'Hands-on workshop covering machine learning fundamentals, neural networks, and practical AI applications.',
    date: new Date('2024-08-12T10:00:00'),
    location: 'Innovation Lab',
    category: 'Technical' as EventCategory,
    tags: ['AI', 'Machine Learning', 'Workshop', 'Education', 'Technology'],
    createdAt: new Date('2024-07-05T14:00:00'),
    updatedAt: new Date('2024-07-05T14:00:00'),
  },
  {
    id: '6',
    title: 'Art Gallery Opening',
    description: 'Grand opening of the new contemporary art exhibition featuring works from emerging local artists.',
    date: new Date('2024-08-18T19:00:00'),
    location: 'Modern Art Gallery',
    category: 'Cultural' as EventCategory,
    tags: ['Art', 'Gallery', 'Exhibition', 'Contemporary', 'Local Artists'],
    createdAt: new Date('2024-07-06T15:00:00'),
    updatedAt: new Date('2024-07-06T15:00:00'),
  }
];

export const eventCategories: EventCategory[] = ['Technical', 'Cultural', 'Sports', 'Social'];
