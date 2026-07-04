import React from 'react';

export interface AvatarProps {
  /** Full name — initials are derived from it. */
  name?: string;
  /** Optional image URL. */
  src?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Optional status dot. */
  status?: 'clear' | 'caution' | 'stop';
  style?: React.CSSProperties;
}

/** Identity avatar — initials on a deterministic tint, or image, with optional status dot. */
export function Avatar(props: AvatarProps): JSX.Element;
