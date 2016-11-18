import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Colonist, NewColonist, Job } from '../models';
import JobsService from '../services/jobs.service';
import ColonistsService from '../services/colonists.service';
import { cantBe } from '../shared/validators';
import { Router } from '@angular/router';

const notNone = (value) => {
    return value === '(none)' ? false : true;  //ternary function?
}



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [JobsService, ColonistsService]
})
export class RegisterComponent implements OnInit {

    colonist: NewColonist; 
    marsJobs: Job[];
    marsColonist: Colonist;
    registerForm: FormGroup;


    NO_JOB_SELECTED = '(none)';

    constructor( jobService: JobsService,
    private colonistsService: ColonistsService,
    private route: Router ) {
        // this.colonist = new NewColonist(null, null, this.NO_JOB_SELECTED); --- before FormGroup

        //  asynchronus API request.
        jobService.getJobs().subscribe((jobs) => {
            this.marsJobs = jobs;
        }, (err) => {
            console.log(err);
        });
    }



    tooOld(value: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return control.value > 184 ? { 'too old': { value } } : null;
        };
    }

    ngOnInit() {

        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            age: new FormControl('', [Validators.required, this.tooOld(184)]),
            job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
        });
    }


    onSubmit(event) {
        event.preventDefault();
        const name = this.registerForm.get('name').value;
        const age = this.registerForm.get('age').value;
        const job_id = this.registerForm.get('job_id').value;
        const colonist = new NewColonist(name, age, job_id);
  
        console.log(this.registerForm);

        if (this.registerForm.valid) {

            this.colonistsService.submitColonist(colonist).subscribe(
           (colonist) => {
               localStorage.setItem('colonist_id', JSON.stringify(colonist.id));
               this.route.navigate(['/Encounters']);
                   }, (err) => {
            console.log(err);
        });

            console.log('Ok, let\'s register this new colonist', new NewColonist(name, age, job_id));
        }

    }
}
  // get jobSelected() {
  //   return this.colonist.job_id !== this.NO_JOB_SELECTED;
  // }}
