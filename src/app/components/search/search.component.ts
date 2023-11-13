import { Component, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  screenWidth!: number;
  enteredSearchValue: string = '';
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
    console.log(
      'yeah',
      this.searchTextChanged.emit(this.enteredSearchValue),
      ' and ',
      this.enteredSearchValue
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }
}
