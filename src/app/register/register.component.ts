import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobsService from '../services/jobs.service';

const notNone = (value) => {
    return value === '(none)' ? false : true;  //ternary function?
}



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [JobsService]
})
export class RegisterComponent implements OnInit {

    // colonist: NewColonist; 
    marsJobs: Job[];
    registerForm: FormGroup;


    NO_JOB_SELECTED = '(none)';

    constructor(public jobService: JobsService) {
        // this.colonist = new NewColonist(null, null, this.NO_JOB_SELECTED); --- before FormGroup

        //  asynchronus API request.
        jobService.getJobs().subscribe((jobs) => {
            this.marsJobs = jobs;
        }, (err) => {
            console.log(err);
        });
    }

    onSubmit(event) {
        event.preventDefault();
    }
    cantBe(value: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return control.value === value ? { 'cant be none': { value } } : null;
        };
    }
    ngOnInit() {

        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
            job_id: new FormControl('(none)', [this.cantBe(this.NO_JOB_SELECTED)])
        });
    }

}
  // get jobSelected() {
  //   return this.colonist.job_id !== this.NO_JOB_SELECTED;
  // }}
