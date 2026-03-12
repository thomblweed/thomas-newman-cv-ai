import { useEffect } from 'react';

import { useAnimatedText } from '../../../hooks/useAnimatedText';
import { MarkdownMessage } from '../../MarkdownMessage';

type Props = {
  content: string;
  onRender: () => void;
};

export const AnimatedMarkdownMessage = ({ content, onRender }: Props) => {
  const animatedText = useAnimatedText(content);

  useEffect(() => {
    onRender();
  }, [animatedText, onRender]);

  // Streamed animation of markdown text, as before.
  return <MarkdownMessage content={animatedText} />;
};
