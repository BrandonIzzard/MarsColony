import { Component, OnInit } from '@angular/core';
import { Encounter } from '../models';
import EncounterService from '../services/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncounterService]

})
export class EncountersComponent implements OnInit {

  encounter: Encounter;
  marsEncounters: Encounter[];


  constructor(encounterService: EncounterService) { 
    this.encounter = new Encounter(null, null, null, null, null);
    encounterService.getEncounters().subscribe((encounters) => {
      this.marsEncounters = encounters;
      console.log(this.marsEncounters)
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
