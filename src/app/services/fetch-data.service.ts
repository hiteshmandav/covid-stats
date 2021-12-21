import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter, map, tap,  publishReplay, refCount} from 'rxjs/operators'
import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private selectedCountry = new ReplaySubject<string>(1);

  constructor(private httpClient: HttpClient) { }

  getCountryList() {
    return this.httpClient.get('https://covid-api.mmediagroup.fr/v1/cases?country').pipe(
      map(x =>  Object.keys(x))
    );
  }

  getCountryData(country) {
    return this.httpClient.get(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`).pipe(
      map((x:any) => x?.All)
    );
  }

  getStatesData(country) {
    return this.httpClient.get(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`).pipe(
      map((x: any) => x),
    );
  }

  getVaccineData(country) {
    return this.httpClient.get(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`).pipe(
      map((x: any) => x),
    );
  }


  emitSelectedCountry(countryName : string) {
    this.selectedCountry.next(countryName);
  }

  reciveSelectedCountry() : Observable<string>{
    return this.selectedCountry.asObservable()
  }



}
