import { CityOption } from "./form";
import { RouteApiResponse } from "./route";
import { Fail } from "./fail";

export interface RouteContextType {
  /** Route data when api result is ok. */
  routeData: RouteApiResponse | null;
  /** Route data error when api result is fail. */
  errorData: Fail | null;
  /** Set route data function. */
  setRouteData: (data: RouteApiResponse) => void;
  /** Set error data function. */
  setErrorData: (error: Fail) => void;
  /** Clear storage function. */
  clearStorage: () => void;
}

export interface CityContextType {
  /** Cities list. */
  cities: CityOption[];
  /** Cities list loading status. */
  isLoadingCities: boolean;
}
