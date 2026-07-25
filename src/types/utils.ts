import { LocationType, TransportType } from "@/types/route";

export interface LocationIconProps {
  /** Location type. */
  type: LocationType;
  /** Custom class. */
  className?: string;
}

export interface TransportIconProps {
  /** Transport type. */
  type: TransportType;
  /** Custom class. */
  className?: string;
}
