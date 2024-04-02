import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  INSERT_PARAGRAPH_COMMAND,
} from "lexical";
import { useEffect } from "react";

export function FontTypePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(
    () =>
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
            `🧪 FontTypePlugin : should apply the font "${fontFamily}"`,
          );

          const paragraph = $createParagraphNode();
          selection.insertNodes([paragraph]);
          selection.insertText("");
          $patchStyleText(selection, { "font-family": fontFamily });

          return true;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    [editor],
  );

  return null;
}
