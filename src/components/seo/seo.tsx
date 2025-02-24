import { Helmet, HelmetData } from 'react-helmet-async';

interface SocialMetaTags {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterCreator?: string;
  twitterSite?: string;
}

interface SeoConfig {
  siteName: string;
  separator?: string;
  baseUrl: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  image?: string;
  socialTags?: SocialMetaTags;
}

const defaultConfig: SeoConfig = {
  siteName: 'Asakiri',
  separator: '|',
  baseUrl: 'https://beta.asakiri.com', // Updated to beta subdomain
  defaultDescription: 'Learn a new language with online courses on Asakiri',
  defaultImage: '/images/default-og.jpg',
  twitterHandle: '@asakiri',
};

const helmetData = new HelmetData({});

const getAbsoluteUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const baseUrl = defaultConfig.baseUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export const Seo = ({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  image,
  socialTags,
}: SeoProps) => {
  const fullTitle = title
    ? `${title} ${defaultConfig.separator} ${defaultConfig.siteName}`
    : defaultConfig.siteName;

  const metaDescription = description || defaultConfig.defaultDescription;
  const imageUrl = getAbsoluteUrl(image || defaultConfig.defaultImage);
  const canonicalUrl = canonical
    ? getAbsoluteUrl(canonical)
    : defaultConfig.baseUrl;

  return (
    <Helmet helmetData={helmetData}>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="robots"
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`}
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaultConfig.siteName} />
      <meta property="og:title" content={socialTags?.ogTitle || fullTitle} />
      <meta
        property="og:description"
        content={socialTags?.ogDescription || metaDescription}
      />
      <meta property="og:image" content={socialTags?.ogImage || imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content={socialTags?.twitterCard || 'summary_large_image'}
      />
      <meta name="twitter:site" content={defaultConfig.twitterHandle} />
      <meta name="twitter:title" content={socialTags?.ogTitle || fullTitle} />
      <meta
        name="twitter:description"
        content={socialTags?.ogDescription || metaDescription}
      />
      <meta name="twitter:image" content={socialTags?.ogImage || imageUrl} />
      <meta
        name="twitter:image:alt"
        content={title || defaultConfig.siteName}
      />

      {/* Additional tags for course pages */}
      <meta property="og:type" content="article" />
      <meta property="article:publisher" content={defaultConfig.baseUrl} />
    </Helmet>
  );
};
