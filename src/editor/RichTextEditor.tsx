import type { InitialConfigType } from "@lexical/react/LexicalComposer";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ParagraphNode, TextNode } from "lexical";

import {
  CombinedApproachesPlugin,
  FontTypePlugin,
  NewLineInterceptorPlugin,
  ToolbarPlugin,
} from "./plugins";
import { prepopulatedRichText } from "./utils";

import styles from "./RichTextEditor.module.css";

interface RichTextEditorProps {
  enableCombinedApproaches?: boolean;
  enableFontTypePlugin?: boolean;
  enableNewLineInterceptorPlugin?: boolean;
  namespace: string;
}

export default function RichTextEditor({
  enableCombinedApproaches,
  enableFontTypePlugin,
  enableNewLineInterceptorPlugin,
  namespace,
}: RichTextEditorProps) {
  const initialConfig: InitialConfigType = {
    editorState: prepopulatedRichText,
    namespace,
    editable: true,
    nodes: [ParagraphNode, TextNode],
    onError: (error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <AutoFocusPlugin />
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <div className={styles.container}>
            <ContentEditable className={styles.textarea} />
          </div>
        }
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />

      {enableCombinedApproaches && <CombinedApproachesPlugin />}
      {enableFontTypePlugin && <FontTypePlugin />}
      {enableNewLineInterceptorPlugin && <NewLineInterceptorPlugin />}
    </LexicalComposer>
  );
}
