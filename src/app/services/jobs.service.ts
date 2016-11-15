import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class JobsService {


	JOBS_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';


  constructor(private http: Http) { }

  getJobs(){
  	
  }

}
