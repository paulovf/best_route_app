export interface Fail {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  [key: string]: unknown;
}
