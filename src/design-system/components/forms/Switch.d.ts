import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Toggle switch — mechanical flap motion, navy when on. */
export function Switch(props: SwitchProps): JSX.Element;
