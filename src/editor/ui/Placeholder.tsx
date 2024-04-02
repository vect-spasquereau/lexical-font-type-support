import cn from "classnames";

import type { HTMLProps } from "react";

import styles from "../RichTextEditor.module.css";

export const Placeholder = ({
  children,
  className,
}: HTMLProps<HTMLDivElement>) => (
  <div className={cn(styles.placeholder, className)}>{children}</div>
);
