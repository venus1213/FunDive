import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

interface MDXProps {
  children: React.ReactNode;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // デフォルトのコンポーネントをオーバーライド
    h1: ({ children }: MDXProps) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: MDXProps) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: MDXProps) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }: MDXProps) => (
      <p className="my-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: MDXProps) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: MDXProps) => (
      <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
    ),
    li: ({ children }: MDXProps) => (
      <li className="ml-4">{children}</li>
    ),
    img: (props: ImageProps) => (
      <div className="relative aspect-[16/9] my-8">
        <Image
          {...props}
          alt={props.alt || ''}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    ),
    ...components,
  };
} 