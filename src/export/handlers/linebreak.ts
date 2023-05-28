import type { LineBreakNode } from 'lexical';
import { Break } from 'mdast';

import { Handler } from './index.js';

export const linebreak: Handler<LineBreakNode> = () => {
  const remarkNode: Break = {
    type: 'break',
  };

  return remarkNode;
};
