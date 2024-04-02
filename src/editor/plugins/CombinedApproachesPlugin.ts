import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  INSERT_LINE_BREAK_COMMAND,
  KEY_ENTER_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
} from "lexical";
import { useEffect } from "react";

export function CombinedApproachesPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          const selection = $getSelection();

          if (!$isRangeSelection(selection)) return false;

          const fontFamily = $getSelectionStyleValueForProperty(
            selection,
            "font-family",
            "Arial",
          );

          console.log(
            `🧪 CombinedApproachesPlugin : should apply the font "${fontFamily}"`,
          );

          const paragraph = $createParagraphNode();
          selection.insertNodes([paragraph]);
          selection.insertText("");
          $patchStyleText(selection, { "font-family": fontFamily });

          return true;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
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
                    `🧪 CombinedApproachesPlugin : intercept 'Enter' and insert new paragraph`,
                  );
                  editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
                } else {
                  console.log(
                    `🧪 CombinedApproachesPlugin : intercept 'Enter' and insert line break`,
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
    );
  }, [editor]);

  return null;
}
