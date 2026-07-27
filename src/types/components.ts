export interface LoadingModalProps {
  /** Modal open status. */
  isOpen: boolean;
}
export interface TopbarProps {
  /** Topbar display status. */
  show: boolean;
  /** Topbar result link. */
  resultHref: string;
}

export interface DatePickerFieldProps {
  /** Input value. */
  value: Date | undefined;
  /** Input onchange event. */
  onChange: (date: Date | undefined) => void;
  /** Input error message. */
  error?: string;
}
