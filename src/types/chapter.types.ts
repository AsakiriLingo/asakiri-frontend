import { Section } from '@/types/section.types.ts';

interface Chapter {
  id: string;
  title: string;
  subTitle: string;
  serialNumber: number | null;
  sections: Array<Section>;
}

export type { Chapter };
