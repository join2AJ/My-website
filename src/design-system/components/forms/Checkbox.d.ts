import React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Checkbox — navy when checked, mechanical check. */
export function Checkbox(props: CheckboxProps): JSX.Element;
