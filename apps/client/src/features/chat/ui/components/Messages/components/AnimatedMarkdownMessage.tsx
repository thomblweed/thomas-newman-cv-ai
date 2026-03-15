import { useEffect } from 'react';

import { useAnimatedText } from '../../../hooks/useAnimatedText';
import { MarkdownMessage } from '../../MarkdownMessage';

type Props = {
  content: string;
  onContentUpdate: () => void;
};

export const AnimatedMarkdownMessage = ({
  content,
  onContentUpdate
}: Props) => {
  const animatedText = useAnimatedText(content);

  useEffect(() => {
    onContentUpdate();
  }, [animatedText, onContentUpdate]);

  return <MarkdownMessage content={animatedText} />;
};
