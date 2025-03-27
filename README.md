> This repository is no longer maintained. The support for Markdown in Lexical got improved recently and I no longer need to pretend I'm maintaining this fork.

# Lexical Remark

First attempt at integrating the remark ecosystem with lexical to perform markdown conversion.

## Usage

### Lexical to Markdown

```typescript
import { createRemarkExport } from 'lexical-remark';

function exportLexicalToMarkdown(editor: LexicalEditor): string {
  return editor.getEditorState().read(createRemarkExport());
}
```

### Markdown to Lexical

```typescript
import { createRemarkImport} from 'lexical-remark';

function importMarkdownToLexical(editor: LexicalEditor, markdown: string): void {
  editor.update(
      () => createRemarkImport()(markdown),
      {
        discrete: true,
      },
  );
}
```
