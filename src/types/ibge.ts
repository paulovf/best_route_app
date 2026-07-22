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
