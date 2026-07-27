export interface IBGECity {
  /** City ID. */
  id: number;
  /** City name. */
  nome: string;
  /** City region. */
  microrregiao: {
    /** City sub region. */
    mesorregiao: {
      /** City state. */
      UF: { sigla: string };
    };
  };
}

export interface CityOption {
  /** City name. */
  name: string;
  /** State name. */
  uf: string;
  /** Formatted city and state name to UX display. */
  displayName: string;
}

export interface CityAutocompleteProps {
  /** Input placeholder text. */
  placeholder: string;
  /** Input name prefix. */
  namePrefix: string;
  /** Input value. */
  value: CityOption | null;
  /** List of available cities. */
  cities: CityOption[];
  /** Cities list loading status. */
  isLoadingCities: boolean;
  /** Input onchange event. */
  onChange: (city: CityOption | null) => void;
}

export interface CityFormFieldProps extends CityAutocompleteProps {
  /** Input error message. */
  error?: string;
}

export interface CitySearchRouteApiResponse {
  /* Cities list */
  list: CityOption[];
}

export interface CitySearchContextType {
  /** Cities list. */
  cities: CityOption[];
  /** Cities list loading status. */
  isLoadingCities: boolean;
  /** Set cities list function. */
  setCities: (cities: CityOption[]) => void;
}

export interface MockMessages {
  /** Mock messages for CityFormField component. */
  CityFormField: {
    /** Loading message. */
    loading: string;
    /** Not found message. */
    notFound: string;
  };
}
