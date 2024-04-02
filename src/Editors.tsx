import { Tabs, Typography } from "antd";
import { useState } from "react";

import type { TabsProps } from "antd";

import { RichTextEditor } from "./editor";
import { Toolbar } from "./editor/ui/Toolbar";
import { EditorToolbarProvider } from "./contexts";

import styles from "./Editors.module.css";

export const Editors = () => {
  const [lastSelectedFont, setLastSelectedFont] = useState("");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Patch new paragraph approach",
      children: (
        <>
          <Toolbar onChange={setLastSelectedFont} />
          <Typography style={{ marginTop: "0.5em" }}>
            Selected plugin : FontTypePlugin
          </Typography>
          <Typography style={{ marginTop: "0.5em" }}>
            Last selected font : {lastSelectedFont}
          </Typography>
          <RichTextEditor enableFontTypePlugin namespace="approach-1" />
        </>
      ),
    },
    {
      key: "2",
      label: "Hack new line commands approach",
      children: (
        <>
          <Toolbar onChange={setLastSelectedFont} />
          <Typography style={{ marginTop: "0.5em" }}>
            Selected plugin : NewLineInterceptorPlugin
          </Typography>
          <Typography style={{ marginTop: "0.5em" }}>
            Last selected font : {lastSelectedFont}
          </Typography>
          <RichTextEditor
            enableNewLineInterceptorPlugin
            namespace="approach-2"
          />
        </>
      ),
    },
    {
      key: "3",
      label: "Combined approaches",
      children: (
        <>
          <Toolbar onChange={setLastSelectedFont} />
          <Typography style={{ marginTop: "0.5em" }}>
            Selected plugin : CombinedApproachesPlugin
          </Typography>
          <Typography style={{ marginTop: "0.5em" }}>
            Last selected font : {lastSelectedFont}
          </Typography>
          <RichTextEditor enableCombinedApproaches namespace="approach-3" />
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <EditorToolbarProvider>
        <Tabs
          defaultActiveKey="1"
          destroyInactiveTabPane
          items={items}
          onTabClick={() => setLastSelectedFont("")}
        />
      </EditorToolbarProvider>
    </div>
  );
};
