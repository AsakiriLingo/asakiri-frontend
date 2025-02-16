interface Section {
  id?: string;
  title: string;
  sub_title: string;
  content_html: string;
  content_json: Record<string, string | object>;
  serial_number: number;
}

export type { Section };
