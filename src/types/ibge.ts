export interface IBGECity {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: { sigla: string };
    };
  };
}

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
