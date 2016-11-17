import { Component, OnInit } from '@angular/core';
import { Alien } from '../models';
import AliensService from '../services/aliens.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  alien: Alien;
  marsAliens: Alien[];

  // NO_ALIEN_SELECTED = '(none)';

  constructor(aliensService: AliensService) {
    this.alien = new Alien(null, null, null, null);
    aliensService.getAliens().subscribe((aliens) => {
      this.marsAliens = aliens;
      console.log(this.marsAliens);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
// get alienSelected() {
//     return this.alien.type !== this.NO_ALIEN_SELECTED;
//   }}