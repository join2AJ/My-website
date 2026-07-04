import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "secondary" */
  variant?: 'secondary' | 'ghost' | 'dark';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  disabled?: boolean;
  /** Accessible label (icon-only control). */
  label?: string;
  children?: React.ReactNode;
}

/** Square icon-only control matching Button heights. */
export function IconButton(props: IconButtonProps): JSX.Element;
