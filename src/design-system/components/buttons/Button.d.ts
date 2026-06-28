import React from 'react';

declare module 'react' {}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark';
  /** Control size. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Fuselage (fully rounded) shape. @default false */
  pill?: boolean;
  /** Full-width. @default false */
  block?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary action control for CompliantBharat. Gentle hover lift, mechanical press.
 * @startingPoint section="Components" subtitle="Action buttons in 5 variants" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
