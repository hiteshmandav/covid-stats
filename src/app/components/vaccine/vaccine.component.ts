import { TableData } from './../model';
import { Subscription } from 'rxjs';
import { FetchDataService } from './../../services/fetch-data.service';
import { Component, OnInit } from '@angular/core';
import { VaccineData } from '../model';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {

  isLoading: boolean = true;
  selectedCountry: string;
  watchCountry = new Subscription();
  vaccineTableData: TableData[];
  constructor(private fetchDataService: FetchDataService) { }

  ngOnInit(): void {

      this. watchCountry = this.fetchDataService.reciveSelectedCountry().subscribe(country => {
        this.isLoading = true;
        this.selectedCountry = country;
        this.fetchStateDetails(this.selectedCountry);

      }
      );
  }

  fetchStateDetails(selectedCountry) {
    this.fetchDataService.getVaccineData(selectedCountry).subscribe(x => {

      let vaccineData: VaccineData = {
        administered: x?.administered,
        peopleVaccinated: x?.people_vaccinated,
        peoplePartiallyVaccinated: x?.people_partially_vaccinated
   };
      this.vaccineTableData = [{
        name: 'Administered',
        value: vaccineData.administered
      },
      {
        name: 'People Vaccinated',
        value: vaccineData.peopleVaccinated
        },
      {
        name: 'People Partially Vaccinated',
        value: vaccineData.peoplePartiallyVaccinated
        }]
      this.isLoading = false;
    })
  }


  ngOnDestroy() {
    this.watchCountry.unsubscribe();
   }
}
