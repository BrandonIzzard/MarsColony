import { Component, OnInit } from '@angular/core';
import { Encounter, NewEncounter } from '../models';
import EncounterService from '../services/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncounterService]

})
export class EncountersComponent implements OnInit {

  encounter: NewEncounter;
  marsEncounters: NewEncounter[];


  constructor(encounterService: EncounterService) {
    this.encounter = new NewEncounter(null, null, null, null);
    encounterService.getEncounters().subscribe((encounters) => {
      this.marsEncounters = encounters.sort((a, b) => {
        return b.id - a.id;
      })
        .splice(0, 100);

    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}

