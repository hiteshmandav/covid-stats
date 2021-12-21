import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  menuItems: string[] = ['home', 'states', 'vaccine']

  reactiveProperties = {
    isHandset: false,
    isOpen: true,
    mode: 'side'
  }


  constructor(private bpObserver: BreakpointObserver) { }

  ngOnInit(): void {
    console.log(Breakpoints.Handset)
    this.bpObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return {
    isHandset: true,
    isOpen:false,
    mode: 'over'
  }
        }
        else {
          return {
    isHandset: false,
    isOpen:true,
    mode: 'side'
  }
        }
      })
    ).subscribe(x=> this.reactiveProperties =x)
  }

  toggleSideBar() {
    this.reactiveProperties.isOpen = !this.reactiveProperties.isOpen;
  }
}
