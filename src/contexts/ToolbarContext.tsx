import { LexicalEditor } from "lexical";
import React, { PropsWithChildren, createContext, useState } from "react";

interface ToolbarContextType {
  activeEditor: LexicalEditor | null;
  setActiveEditor: (newEditor: LexicalEditor) => void;
}

const defaultToolbarContext: ToolbarContextType = {
  activeEditor: null,
  setActiveEditor: () => null,
};

const ToolbarContext = createContext<ToolbarContextType>(defaultToolbarContext);

export const useToolbar = () => {
  const context = React.useContext(ToolbarContext);

  if (context === undefined) {
    throw new Error("useToolbar must be used within EditorToolbarProvider");
  }

  return context;
};

export const EditorToolbarProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [activeEditor, setActiveEditor] = useState<LexicalEditor | null>(null);

  return (
    <ToolbarContext.Provider value={{ activeEditor, setActiveEditor }}>
      {children}
    </ToolbarContext.Provider>
  );
};
