import { $patchStyleText } from "@lexical/selection";
import { Select } from "antd";
import { $getSelection, $isRangeSelection } from "lexical";
import { useCallback, useMemo } from "react";

import { useToolbar } from "../../contexts";

interface ToolbarProps {
  onChange?: (value: string) => void;
}

const fonts = ["Arial", "Courier New", "Times New Roman", "Verdana"];

export const Toolbar = ({ onChange }: ToolbarProps) => {
  const { activeEditor } = useToolbar();

  const options = useMemo(
    () =>
      fonts.map((fontFamily) => ({
        value: fontFamily,
        label: <span style={{ fontFamily }}>{fontFamily}</span>,
      })),
    [],
  );

  const onChangeFontFamily = useCallback(
    (fontFamily: string) => {
      activeEditor?.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            "font-family": fontFamily,
          });
          onChange?.(fontFamily);
        }
      });
    },
    [activeEditor, onChange],
  );

  return (
    <Select
      defaultValue="Arial"
      options={options}
      style={{ minWidth: 150 }}
      onChange={onChangeFontFamily}
    />
  );
};
