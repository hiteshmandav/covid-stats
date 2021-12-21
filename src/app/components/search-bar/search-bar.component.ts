import { FetchDataService } from './../../services/fetch-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  selectedCountry: string;
  countryList: string[];
  constructor(private fetchData: FetchDataService) { }

  ngOnInit(): void {
    this.fetchData.getCountryList().subscribe(x => {
      this.countryList = x
      this.selectedCountry = 'India'
      this.fetchData.emitSelectedCountry(this.selectedCountry)
    })
  }

  changeSelectedCountry(countryName) {
    this.selectedCountry = countryName;
    this.fetchData.emitSelectedCountry(this.selectedCountry)
}

}
