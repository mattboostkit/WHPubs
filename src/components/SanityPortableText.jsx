import React from 'react';
import { PortableText } from '@portabletext/react';

// Define fallback image for content images
const contentImageFallback = '/images/content-fallback.jpg';

// Custom components for the Portable Text renderer
const components = {
  types: {
    image: ({value}) => {
      if (!value?.asset?.url) {
        return <img 
          src={contentImageFallback} 
          alt="Placeholder image" 
          className="w-full rounded-lg my-4" 
        />;
      }
      
      return <img 
        src={value.asset.url} 
        alt={value.alt || ''} 
        className="w-full rounded-lg my-4" 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = contentImageFallback;
        }}
      />;
    },
  },
  marks: {
    link: ({children, value}) => {
      const rel = value.href.startsWith('/') ? undefined : 'noreferrer noopener';
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline font-alice">
          {children}
        </a>
      );
    },
    strong: ({children}) => <strong className="font-bold font-alice">{children}</strong>,
    em: ({children}) => <em className="italic font-alice">{children}</em>,
  },
  block: {
    h2: ({children}) => <h2 className="text-2xl font-bold mt-6 mb-3 font-quattrocento">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-bold mt-5 mb-2 font-quattrocento">{children}</h3>,
    normal: ({children}) => {
      return children ? <p className="my-3 font-alice">{children}</p> : null;
    },
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-primary/20 pl-4 italic my-4 font-alice">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 my-4 font-alice">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 my-4 font-alice">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="mb-1 font-alice">{children}</li>,
    number: ({children}) => <li className="mb-1 font-alice">{children}</li>,
  },
};

export default function SanityPortableText({value}) {
  if (!value) {
    return null;
  }
  
  return (
    <div className="prose prose-lg">
      <PortableText value={value} components={components} />
    </div>
  );
}
