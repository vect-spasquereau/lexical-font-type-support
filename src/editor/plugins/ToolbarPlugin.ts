import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical";
import { useEffect } from "react";

import { useToolbar } from "../../contexts";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const { setActiveEditor } = useToolbar();

  useEffect(
    () =>
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    [editor, setActiveEditor],
  );

  return null;
}
