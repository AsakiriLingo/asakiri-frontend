import { Course } from '@/types/course.types';

type CardData = Omit<
  Course,
  'id' | 'description' | 'chapters' | 'isPublished'
> & {
  link: string;
};

export const mockCourseData: CardData[] = [
  {
    link: '/courses/japanese-basics',
    title: 'Complete Japanese for Beginners',
    author: {
      id: '1',
      name: 'Misa Amane',
      subTitle: 'JLPT N1 Certified Instructor',
      avatar: '',
      description: 'Teaching Japanese for over 8 years',
    },
    thumbnail: '/japanese.jpg',
    shortDescription:
      'Master basic Japanese conversation, writing systems (Hiragana, Katakana), and essential Kanji characters.',
    courseLanguage: 'English',
    languageTaught: 'Japanese',
  },
  {
    link: '/courses/korean-foundations',
    title: '韓国語の基礎',
    author: {
      id: '2',
      name: 'Park Somin',
      subTitle: 'ソウル大学卒業生',
      avatar: '',
      description: '韓国語教育の専門家',
    },
    thumbnail: '/korean.jpg',
    shortDescription:
      'ハングル文字、基本文法パターン、日常的な韓国語表現を学びましょう。',
    courseLanguage: 'Japanese',
    languageTaught: 'Korean',
  },
  {
    link: '/courses/mandarin-essentials',
    title: 'Chino Mandarín Esencial',
    author: {
      id: '3',
      name: 'Chen Wei',
      subTitle: 'Instructor certificado HSK Nivel 6',
      avatar: '',
      description: 'Especialista en enseñar chino a extranjeros',
    },
    thumbnail: '/chinese.jpg',
    shortDescription:
      'Comience con la pronunciación del pinyin, caracteres básicos y habilidades de conversación práctica.',
    courseLanguage: 'Spanish',
    languageTaught: 'Mandarin',
  },
  {
    link: '/courses/spanish-immersion',
    title: 'Curso de Imersão em Espanhol',
    author: {
      id: '4',
      name: 'Isabel García',
      subTitle: 'Examinadora DELE',
      avatar: '',
      description: 'Professora nativa de espanhol de Madrid',
    },
    thumbnail: '/spanish.jpg',
    shortDescription:
      'Curso completo de espanhol abrangendo gramática, conversação e aspectos culturais.',
    courseLanguage: 'Portuguese',
    languageTaught: 'Spanish',
  },
  {
    link: '/courses/french-daily',
    title: 'Francés para el día a día',
    author: {
      id: '5',
      name: 'Marie Dubois',
      subTitle: 'Profesora de la Alliance Française',
      avatar: '',
      description: 'Instructora certificada de francés',
    },
    thumbnail: 'https://picsum.photos/id/167/600/400',
    shortDescription:
      'Aprenda francés práctico para viajar, trabajar y situaciones cotidianas.',
    courseLanguage: 'Spanish',
    languageTaught: 'French',
  },
  {
    link: '/courses/german-a1-a2',
    title: "Cours d'allemand A1-A2",
    author: {
      id: '6',
      name: 'Thomas Weber',
      subTitle: 'Certifié par le Goethe-Institut',
      avatar: '',
      description: 'Formateur professionnel en langue allemande',
    },
    thumbnail: 'https://picsum.photos/id/177/600/400',
    shortDescription:
      'Cours structuré couvrant tous les aspects de la compétence linguistique allemande de base.',
    courseLanguage: 'French',
    languageTaught: 'German',
  },
  {
    link: '/courses/italian-basics',
    title: 'Italienisch Grundkurs',
    author: {
      id: '7',
      name: 'Marco Rossi',
      subTitle: 'CILS-zertifizierter Lehrer',
      avatar: '',
      description: 'Muttersprachlicher Italienischexperte',
    },
    thumbnail: 'https://picsum.photos/id/189/600/400',
    shortDescription:
      'Lernen Sie italienische Aussprache, grundlegende Grammatik und alltägliche Redewendungen.',
    courseLanguage: 'German',
    languageTaught: 'Italian',
  },
  {
    link: '/courses/russian-starter',
    title: 'Russian Starter Course',
    author: {
      id: '8',
      name: 'Elena Ivanova',
      subTitle: 'TORFL Certified Instructor',
      avatar: '',
      description: 'Expert in teaching Russian',
    },
    thumbnail: 'https://picsum.photos/id/198/600/400',
    shortDescription:
      'Master Cyrillic alphabet, basic grammar, and essential vocabulary.',
    courseLanguage: 'English',
    languageTaught: 'Russian',
  },
  {
    link: '/courses/portuguese-basics',
    title: 'Portugués Básico',
    author: {
      id: '9',
      name: 'Ana Santos',
      subTitle: 'Examinadora de Celpe-Bras',
      avatar: '',
      description: 'Profesora nativa de portugués brasileño',
    },
    thumbnail: 'https://picsum.photos/id/219/600/400',
    shortDescription:
      'Aprenda portugués de Brasil con énfasis en pronunciación y conversación diaria.',
    courseLanguage: 'Spanish',
    languageTaught: 'Portuguese',
  },
  {
    link: '/courses/arabic-beginner',
    title: "Cours d'arabe moderne standard",
    author: {
      id: '10',
      name: 'Fatima Al-Said',
      subTitle: 'Spécialiste en langue arabe',
      avatar: '',
      description: "Experte en enseignement de l'arabe standard moderne",
    },
    thumbnail: 'https://picsum.photos/id/227/600/400',
    shortDescription:
      "Commencez avec l'écriture arabe, le vocabulaire essentiel et les structures grammaticales de base.",
    courseLanguage: 'French',
    languageTaught: 'Arabic',
  },
  {
    link: '/courses/hindi-foundation',
    title: 'Hindi Foundation Course',
    author: {
      id: '11',
      name: 'Priya Sharma',
      subTitle: 'Hindi Language Expert',
      avatar: '',
      description: 'Professional Hindi instructor',
    },
    thumbnail: 'https://picsum.photos/id/239/600/400',
    shortDescription:
      'Learn Devanagari script, basic grammar, and conversational Hindi.',
    courseLanguage: 'English',
    languageTaught: 'Hindi',
  },
  {
    link: '/courses/turkish-a1',
    title: 'Türkisch A1 Grundkurs',
    author: {
      id: '12',
      name: 'Mehmet Yılmaz',
      subTitle: 'TYS-zertifizierter Lehrer',
      avatar: '',
      description: 'Erfahrener Türkischlehrer',
    },
    thumbnail: 'https://picsum.photos/id/244/600/400',
    shortDescription:
      'Umfassende Einführung in die türkische Sprache und Grammatik.',
    courseLanguage: 'German',
    languageTaught: 'Turkish',
  },
  {
    link: '/courses/vietnamese-starter',
    title: 'Cours de vietnamien pour débutants',
    author: {
      id: '13',
      name: 'Nguyen Thu',
      subTitle: 'Experte en langue vietnamienne',
      avatar: '',
      description: 'Professeure native de vietnamien',
    },
    thumbnail: 'https://picsum.photos/id/247/600/400',
    shortDescription:
      'Maîtrisez les tons vietnamiens, la grammaire de base et les phrases quotidiennes.',
    courseLanguage: 'French',
    languageTaught: 'Vietnamese',
  },
  {
    link: '/courses/thai-basics',
    title: 'Thai Language Basics',
    author: {
      id: '14',
      name: 'Somchai Suk',
      subTitle: 'Thai Language Specialist',
      avatar: '',
      description: 'Professional Thai instructor',
    },
    thumbnail: 'https://picsum.photos/id/249/600/400',
    shortDescription:
      'Learn Thai script, tones, and essential vocabulary for daily life.',
    courseLanguage: 'English',
    languageTaught: 'Thai',
  },
  {
    link: '/courses/polish-starter',
    title: 'Polnisch für Anfänger',
    author: {
      id: '15',
      name: 'Anna Kowalska',
      subTitle: 'Polnisch-Expertin',
      avatar: '',
      description: 'Zertifizierte Polnischlehrerin',
    },
    thumbnail: 'https://picsum.photos/id/251/600/400',
    shortDescription:
      'Beginnen Sie Ihre Reise mit polnischer Aussprache, Grammatik und Wortschatz.',
    courseLanguage: 'German',
    languageTaught: 'Polish',
  },
  {
    link: '/courses/dutch-basics',
    title: 'Dutch Language Basics',
    author: {
      id: '16',
      name: 'Jan de Vries',
      subTitle: 'NT2 Certified Instructor',
      avatar: '',
      description: 'Expert in teaching Dutch',
    },
    thumbnail: 'https://picsum.photos/id/254/600/400',
    shortDescription:
      'Learn Dutch pronunciation, basic grammar, and everyday expressions.',
    courseLanguage: 'English',
    languageTaught: 'Dutch',
  },
  {
    link: '/courses/swedish-a1',
    title: 'Schwedisch A1 Kurs',
    author: {
      id: '17',
      name: 'Erik Andersson',
      subTitle: 'Schwedisch-Experte',
      avatar: '',
      description: 'Professioneller Schwedischlehrer',
    },
    thumbnail: 'https://picsum.photos/id/256/600/400',
    shortDescription:
      'Umfassende Einführung in die schwedische Sprache und Kultur.',
    courseLanguage: 'German',
    languageTaught: 'Swedish',
  },
  {
    link: '/courses/greek-starter',
    title: 'Corso base di greco moderno',
    author: {
      id: '18',
      name: 'Maria Papadopoulos',
      subTitle: 'Specialista di lingua greca',
      avatar: '',
      description: 'Insegnante madrelingua di greco',
    },
    thumbnail: 'https://picsum.photos/id/258/600/400',
    shortDescription:
      "Padroneggia l'alfabeto greco, la grammatica di base e le frasi di uso quotidiano.",
    courseLanguage: 'Italian',
    languageTaught: 'Greek',
  },
  {
    link: '/courses/hebrew-basics',
    title: 'Modern Hebrew Basics',
    author: {
      id: '19',
      name: 'Rachel Cohen',
      subTitle: 'Hebrew Language Expert',
      avatar: '',
      description: 'Professional Hebrew instructor',
    },
    thumbnail: 'https://picsum.photos/id/260/600/400',
    shortDescription:
      'Learn Hebrew alphabet, basic grammar, and modern vocabulary.',
    courseLanguage: 'English',
    languageTaught: 'Hebrew',
  },
  {
    link: '/courses/czech-foundation',
    title: 'Tschechisch Grundkurs',
    author: {
      id: '20',
      name: 'Jana Novotná',
      subTitle: 'Tschechisch-Spezialistin',
      avatar: '',
      description: 'Zertifizierte Tschechischlehrerin',
    },
    thumbnail: 'https://picsum.photos/id/261/600/400',
    shortDescription:
      'Starten Sie mit tschechischer Aussprache, Grundgrammatik und wichtigen Redewendungen.',
    courseLanguage: 'German',
    languageTaught: 'Czech',
  },
  {
    link: '/courses/persian-starter',
    title: 'دورة اللغة الفارسية للمبتدئين',
    author: {
      id: '21',
      name: 'Reza Ahmadi',
      subTitle: 'خبير اللغة الفارسية',
      avatar: '',
      description: 'مدرّس لغة فارسية محترف',
    },
    thumbnail: 'https://picsum.photos/id/265/600/400',
    shortDescription:
      'تعلم الكتابة الفارسية والقواعد الأساسية والمفردات اليومية.',
    courseLanguage: 'Arabic',
    languageTaught: 'Persian',
  },
];
