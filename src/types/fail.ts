export interface Fail {
  /** Timestamp route. */
  timestamp?: string;
  /** Http response status. */
  status?: number;
  /** Http response error. */
  error?: string;
  /** Http response message. */
  message?: string;
  /** Request path. */
  path?: string;
  /** Http error key. */
  [key: string]: unknown;
}
