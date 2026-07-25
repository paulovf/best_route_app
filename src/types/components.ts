import { Option, Step } from "./route";

export interface LoadingModalProps {
  /** Modal open status. */
  isOpen: boolean;
}

export interface OptionCardProps {
  /** Option component props. */
  option: Option;
}

export interface TopbarProps {
  /** Topbar display status. */
  show: boolean;
  /** Topbar result link. */
  resultHref: string;
}

export interface OptionStepsTimelineProps {
  /** Routes list. */
  steps: Step[];
}
