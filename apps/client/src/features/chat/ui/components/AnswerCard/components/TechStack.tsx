import { resolveTechStack } from '../../../utils/tech-stack';

import { TechChip } from './TechChip';
import { TechStackList } from './TechStackList';

type Props = {
  slugs?: string[];
};

export const TechStack = ({ slugs }: Props) => {
  const chips = resolveTechStack(slugs);

  if (chips.length === 0) return null;

  return (
    <TechStackList>
      {chips.map(({ slug, label, Icon }) => (
        <TechChip key={slug} label={label} Icon={Icon} />
      ))}
    </TechStackList>
  );
};
