import { ListItem } from 'mdast';
import { List } from 'mdast';
import { Handler } from "./index.js";
import type { ListNode } from '@lexical/list';

export const list: Handler<ListNode> = (node, { rootHandler }) => {
  const remarkNode: List = {
    type: 'list',
    spread: false,
    ordered: node.getListType() === 'number',
    children: node.getChildren()
      .map((child) => rootHandler(child, { rootHandler }))
      .filter((child): child is ListItem => !!child),
  };

  return remarkNode;
};