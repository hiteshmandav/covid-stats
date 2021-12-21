import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FetchDataService } from './../../services/fetch-data.service';
import { Component, OnInit } from '@angular/core';
import { CaseData, TableData } from '../model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  isLoading: boolean = true;
  selectedCountry: string;

  tile = {
    cols: 3,
    rows: 1
  }

  watchCountry = new Subscription();
  stateData: TableData[][] = [];
  constructor(private fetchDataService: FetchDataService, private bpObserver: BreakpointObserver) { }



  ngOnInit(): void {
    this.bpObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          cols: 3,
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
        this.stateData = [];
        this.fetchStateDetails(this.selectedCountry);

      }
      );
  }

  fetchStateDetails(selectedCountry) {
    this.fetchDataService.getStatesData(selectedCountry).subscribe(x => {
      Object.entries(x).forEach((x: any) => {
        if (x[0] !== 'All') {
          let caseData: CaseData = {
              confirmedCases: x[1]?.confirmed,
              activeCases: x[1]?.confirmed - (x[1]?.recovered + x[1]?.deaths),
              recoveredCases: x[1]?.confirmed,
              deaths: x[1]?.deaths,
              name: x[0]
          }

          this.stateData.push([{
            name: 'State Name',
            value: caseData.name
          },
            {
            name: 'Confirmed',
            value: caseData.confirmedCases
          },
          {
            name: 'Active',
            value: caseData.activeCases
            },
          {
            name: 'Recovered',
            value: caseData.recoveredCases
            },
          {
            name: 'Death',
            value: caseData.deaths
          },
          ])
        }
      });
      this.isLoading = false;
    })
  }


  ngOnDestroy() {
    this.watchCountry.unsubscribe();
  }

  getStateName(index: number, state: any[]) {
    return state[0];
  }

}
