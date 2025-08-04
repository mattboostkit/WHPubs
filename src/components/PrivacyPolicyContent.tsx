import React from 'react';
import { PortableText } from '@portabletext/react';

interface PrivacyPolicyContentProps {
  content: any;
}

export default function PrivacyPolicyContent({ content }: PrivacyPolicyContentProps) {
  return (
    <PortableText 
      value={content}
      components={{
        block: {
          h1: ({children}) => <h1 className="text-3xl font-serif mt-8 mb-4 text-primary">{children}</h1>,
          h2: ({children}) => <h2 className="text-2xl font-serif mt-6 mb-3 text-primary">{children}</h2>,
          h3: ({children}) => <h3 className="text-xl font-serif mt-4 mb-2 text-primary">{children}</h3>,
          normal: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
        },
        list: {
          bullet: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
          number: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
        },
        listItem: {
          bullet: ({children}) => <li className="text-gray-700">{children}</li>,
          number: ({children}) => <li className="text-gray-700">{children}</li>,
        },
        marks: {
          strong: ({children}) => <strong className="font-semibold">{children}</strong>,
          em: ({children}) => <em className="italic">{children}</em>,
          link: ({value, children}) => (
            <a href={value?.href} className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        },
      }}
    />
  );
}