import { ReplaySubject, Subscription } from 'rxjs';
import { CaseData, CountryDataSummary, TableData } from './../model';
import { FetchDataService } from './../../services/fetch-data.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedCountry: string;
  tile = {
    cols: 3,
    rows: 1
  }
  watchCountry = new Subscription();
  countryData: CaseData = {
    confirmedCases : 0,
    activeCases: 0,
    recoveredCases: 0,
    deaths: 0
};
  isLoading: boolean = true;
  summaryData: CountryDataSummary = {
    population:  0,
    casePerMillion:  0,
    activeRatio:  0,
    recoveryRatio:  0,
    deathRatio:  0,
  };

  summaryTable: TableData[];
  constructor(private fetchDataService: FetchDataService,private bpObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.bpObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          cols: 2,
          rows: 1
        }
      } else {
        return {
          cols: 1,
          rows: 1
        }
      }
    })
  ).subscribe(x =>
    this.tile =x
    )
      this.watchCountry = this.fetchDataService.reciveSelectedCountry().subscribe(country => {
        this.isLoading = true;
        this.selectedCountry = country;
        this.fetchCountryDetails(this.selectedCountry);
      }
      );
  }
  ngOnDestroy() {
    this.watchCountry.unsubscribe();
   }
  fetchCountryDetails(selectedCountry) {
    this.fetchDataService.getCountryData(selectedCountry).subscribe(x => {
      this.countryData.confirmedCases = x?.confirmed;
      this.countryData.deaths = x?.deaths;
      this.countryData.recoveredCases = x?.recovered;
      this.summaryData.population = x?.population
      this.summaryData.casePerMillion = (this.countryData.confirmedCases / this.summaryData.population) * 1000000;
      this.countryData.activeCases = this.getActiveCases()
      this.summaryData.activeRatio = this.getRatio(this.countryData.activeCases)
      this.summaryData.deathRatio = this.getRatio(this.countryData.deaths)
      this.summaryData.recoveryRatio = this.getRatio(this.countryData.recoveredCases)

      this.summaryTable = [{ name: 'Population', value: this.summaryData.population },
        { name: 'Cases per million', value: this.summaryData.casePerMillion },
        { name: 'Active Ratio', value: this.summaryData.activeRatio },
        { name: 'Recovery Ratio', value: this.summaryData.recoveryRatio },
        { name: 'Death Ratio', value: this.summaryData.deathRatio },]
      this.isLoading = false;
    })
  }

  getActiveCases(): number {
    return this.countryData.confirmedCases - (this.countryData.deaths + this.countryData.recoveredCases );
  }
  getRatio(num1: number, num2: number = this.countryData.confirmedCases ): number {
    return (num1/num2)*100;
  }
}
