import React from 'react';

export interface TabItem {
  value: string;
  label: string;
  /** Optional count pill. */
  count?: number;
}

export interface TabsProps {
  /** Tab list (string or {value,label,count}). */
  tabs?: Array<string | TabItem>;
  /** Controlled active value. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/**
 * Underline tabs — product view switcher with optional count pills.
 * @startingPoint section="Components" subtitle="Underline tabs" viewport="700x120"
 */
export function Tabs(props: TabsProps): JSX.Element;
