export interface CityOption {
  name: string;
  uf: string;
  displayName: string;
}

export interface CityAutocompleteProps {
  placeholder: string;
  namePrefix: string;
  value: CityOption | null;
  onChange: (city: CityOption | null) => void;
}

export interface CityFormFieldProps extends CityAutocompleteProps {
  error?: string;
}

export interface DatePickerFieldProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  error?: string;
}
