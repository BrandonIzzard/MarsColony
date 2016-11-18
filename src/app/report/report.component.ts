import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Alien, Encounter, NewEncounter } from '../models';
import { Headers, RequestOptions } from '@angular/http';
import { cantBe } from '../shared/validators'
import AliensService from '../services/aliens.service';
import EncountersService from '../services/encounters.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService, EncountersService]
})
export class ReportComponent implements OnInit {

  marsAliens: Alien[];
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(private aliensService: AliensService,
    private encountersService: EncountersService, 
    private router: Router){

    aliensService.getAliens().subscribe((aliens) => {
      this.marsAliens = aliens;
      // console.log(this.marsAliens);
    }, (err) => {
      console.log(err);
    });
  }


  ngOnInit() {
    this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)])
    })

  }

  private getDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }



  onSubmit(event) {
    event.preventDefault();
    const date = this.getDate();
    const atype = this.reportForm.get('atype').value;
    const action = this.reportForm.get('action').value;
    const encounter = new NewEncounter(date, atype, action, (Math.floor(Math.random() * 5) + 1));

    if (this.reportForm.valid) {

      this.encountersService.submitEncounter(encounter).subscribe(() => {
        this.router.navigate(['/Encounters']);
            console.log("yay")
        }, (err) => {
            console.log(err);
        });

  }}

}

