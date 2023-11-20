import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormControl} from "@angular/forms";
import { cilSearch} from "@coreui/icons";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  icons = { cilSearch};
  searchInput: FormControl = new FormControl();
  @Input() placeholder = "Buscar";
  @Output() search = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(text => {
        this.search.emit(text);
      });
  }
}
