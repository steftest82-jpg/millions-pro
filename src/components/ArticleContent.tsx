import type { FC } from 'react';

interface ArticleContentProps {
  content: string;
}

const ArticleContent: FC<ArticleContentProps> = ({ content }) => {
  return (
    <div
      className="prose-custom max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleContent;
