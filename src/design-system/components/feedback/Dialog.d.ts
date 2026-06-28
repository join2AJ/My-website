import React from 'react';

export interface DialogProps {
  /** Controls visibility. */
  open?: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  /** Footer actions (e.g. Button group). */
  footer?: React.ReactNode;
  /** Card width in px. @default 460 */
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Modal dialog — backdrop blur, instrument-panel card.
 * @startingPoint section="Components" subtitle="Modal dialog" viewport="700x360"
 */
export function Dialog(props: DialogProps): JSX.Element;
