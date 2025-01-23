interface Section {
  id: string;
  title: string;
  subTitle: string;
  content_html: string;
  content_json: Record<string, string | object>;
  serialNumber: number;
}

export type { Section };
