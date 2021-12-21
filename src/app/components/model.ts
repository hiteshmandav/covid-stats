export type CaseData  = {
  confirmedCases: number;
  activeCases: number;
  recoveredCases: number;
  deaths: number;
  name?: string;
}

export type CountryDataSummary = {
  population: number;
  casePerMillion: number;
  activeRatio: number;
  recoveryRatio: number;
  deathRatio: number;
}

export type VaccineData = {
  administered: number;
  peopleVaccinated: number;
  peoplePartiallyVaccinated: number;
}

export type TableData = {
  name: string;
  value: any;
}
