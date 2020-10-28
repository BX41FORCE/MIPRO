import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opened: boolean = true;
  constructor() { }
  ngOnInit(): void {
  }

  toggleOpened(): void {
    this.opened = !this.opened;
  }

}
