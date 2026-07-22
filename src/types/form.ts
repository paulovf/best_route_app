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
  /** Input onchange event. */
  onChange: (city: CityOption | null) => void;
}

export interface CityFormFieldProps extends CityAutocompleteProps {
  /** Input error message. */
  error?: string;
}

export interface DatePickerFieldProps {
  /** Input value. */
  value: Date | undefined;
  /** Input onchange event. */
  onChange: (date: Date | undefined) => void;
  /** Input error message. */
  error?: string;
}
