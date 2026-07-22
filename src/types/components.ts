import { Option } from "./route";
import { Step } from "./route";

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
}

export interface OptionStepsTimelineProps {
  /** Routes list. */
  steps: Step[];
}
