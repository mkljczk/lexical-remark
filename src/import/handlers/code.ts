import { $createCodeHighlightNode, $createCodeNode } from "@lexical/code";
import { $createLineBreakNode, $createTextNode } from "lexical";
import { Code, Text } from "mdast";
import { Handler } from ".";

export const code: Handler<Code> = (node, { rootHandler, parent, formatting }) => {
  const lexicalNode = $createCodeNode();
  const lines = node.value.split('\n');
  lines.forEach((line, index) => {
    if (index > 0) {
      lexicalNode.append($createLineBreakNode());
    }
    lexicalNode.append($createCodeHighlightNode(line));
  });
  if (parent) {
    parent.append(lexicalNode);
  } else {
    return lexicalNode;
  }
};