import { Partner } from '@/types/partner.types.ts';

type CardData = Omit<
  Partner,
  'id' | 'description' | 'chapters' | 'isPublished'
> & {
  link: string;
};

export const mockCourseData: CardData[] = [
  {
    link: 'https://lingonaut.app',
    title: 'Lingonaut',
    thumbnail: '/lingonaut.jpg',
    shortDescription:
      'Lingonaut has been crafted from the ground up to be fun and educational, without sacrificing one for the other.\n' +
      'Delve into the language as locals do, picking up essential phrases and cultural insights, with useful and informative lessons and exercises which help you pick up and hold onto knowledge, not to keep user retention up.',
  },
];
