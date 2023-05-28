import type { LexicalNode } from 'lexical';

import { Node } from '../../types.js';
import { zwitchFunc } from '../../utils/zwitch-func.js';
import { code } from './code.js';
import { collapsibleContainer } from './collapsibleContainer.js';
import { heading } from './heading.js';
import { horizontalrule } from './horizontalrule.js';
import { image } from './image.js';
import { linebreak } from './linebreak.js';
import { link } from './link.js';
import { list } from './list.js';
import { listitem } from './listitem.js';
import { paragraph } from './paragraph.js';
import { quote } from './quote.js';
import { root } from './root.js';
import { text } from './text.js';
import { youtube } from './youtube.js';

export type Handler<NodeType extends LexicalNode = LexicalNode> = (
  node: NodeType,
  {
    rootHandler,
  }: {
    rootHandler: Handler;
  },
) => Node | void;

export const exportToRemarkTree = (tree: LexicalNode, { handlers = {} }: { handlers?: Record<string, Handler> }) => {
  const handle: Handler = (node, args) => {
    return zwitchFunc('getType', {
      handlers: {
        code,
        'collapsible-container': collapsibleContainer,
        heading,
        horizontalrule,
        image,
        linebreak,
        link,
        list,
        listitem,
        paragraph,
        quote,
        root,
        text,
        youtube,
        ...handlers,
      },
      invalid: (invalidNode) => console.log('invalid node type', invalidNode),
      unknown: (_node, _args) => console.log('unknown node type'),
    })(node, args);
  };

  return handle(tree, { rootHandler: handle });
};
