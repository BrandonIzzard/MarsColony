import { Component, OnInit } from '@angular/core';
import { Colonist, Job } from '../models';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	colonist = Colonist;
	marsJobs = [Job];
	JOBS_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';

  constructor() {
  	this.colonist = new Colonist('', null, null, null);
   }

  ngOnInit() {
  }

}
