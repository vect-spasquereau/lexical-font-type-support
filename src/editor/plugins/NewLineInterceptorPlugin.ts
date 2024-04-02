import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  INSERT_LINE_BREAK_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useEffect } from "react";

export function NewLineInterceptorPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(
    () =>
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          const state = editor.getEditorState();

          state.read(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
              const topLevelElement = selection.focus
                .getNode()
                .getTopLevelElement();
              const content = topLevelElement?.getTextContent().trim();

              if ($isParagraphNode(topLevelElement)) {
                event?.preventDefault();

                if (content) {
                  console.log(
                    `🧪 NewLineInterceptorPlugin : intercept 'Enter' and insert new paragraph`,
                  );
                  editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
                } else {
                  console.log(
                    `🧪 NewLineInterceptorPlugin : intercept 'Enter' and insert line break`,
                  );
                  editor.dispatchCommand(INSERT_LINE_BREAK_COMMAND, false);
                }
              }
            }
          });

          return true;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    [editor],
  );

  return null;
}
