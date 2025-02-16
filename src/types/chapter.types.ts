import { Section } from '@/types/section.types.ts';

interface Chapter {
  id?: string;
  title: string;
  sub_title: string;
  serial_number: number | null;
  sections: Array<Section>;
}

export type { Chapter };
