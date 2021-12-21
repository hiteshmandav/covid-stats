import { Subscription } from 'rxjs';
import { FetchDataService } from './../../services/fetch-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  isLoading: boolean = true;
  selectedCountry: string;
  watchCountry = new Subscription();
  stateData: any;
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
    this.fetchDataService.getStatesData(selectedCountry).subscribe(x => {
      this.stateData = x;
      console.log(x)
    })
  }


  ngOnDestroy() {
    this.watchCountry.unsubscribe();
   }

}
