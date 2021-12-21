import { Subscription } from 'rxjs';
import { FetchDataService } from './../../services/fetch-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {

  isLoading: boolean = true;
  selectedCountry: string;
  watchCountry = new Subscription();
  vaccineData: any;
  constructor(private fetchDataService: FetchDataService) { }

  ngOnInit(): void {

      this.fetchDataService.reciveSelectedCountry().subscribe(country => {
        this.isLoading = true;
        this.selectedCountry = country;
        this.fetchStateDetails(this.selectedCountry);

      }
      );
  }

  fetchStateDetails(selectedCountry) {
    this.fetchDataService.getVaccineData(selectedCountry).subscribe(x => {
      this.vaccineData = x;
      console.log(x)
    })
  }


  ngOnDestroy() {
    this.watchCountry.unsubscribe();
   }
}
