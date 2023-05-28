import lexical from 'lexical';
import { Root } from 'mdast';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

import { remarkYoutube } from '../plugins/remark-youtube.js';
import { Handler, importFromRemarkTree } from './handlers/index.js';
import { Parser } from './parser.js';

export function remarkLexify(this: any, handlers: Record<string, Handler> = {}) {
  const compiler = (tree: Root) => {
    const parser = new Parser();
    return parser.parse(tree).getChildren();
  };

  Object.assign(this, { Compiler: compiler });
}

export function $createRemarkImport(handlers?: Record<string, Handler>): (markdownString: string) => void {
  return (markdownString) => {
    const root = lexical.$getRoot();
    root.clear();

    const file = unified()
      .use(remarkParse)
      .use<any[]>(remarkYoutube)
      .use(remarkLexify, handlers)
      .processSync(markdownString);

    root.append(...(file.result as any));
  };
}
