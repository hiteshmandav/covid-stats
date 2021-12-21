export type CountryData  = {
  confirmedCases: number;
  activeCases: number;
  recoveredCases: number;
  deaths: number;
}

export type CountryDataSummary = {
  population: number;
  casePerMillion: number;
  activeRatio: number;
  recoveryRatio: number;
  deathRatio: number;
}


export type TableData = {
  name: string;
  value: any;
}
