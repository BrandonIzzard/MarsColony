import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-list-test',
	templateUrl: './list-test.component.html',
	styleUrls: ['./list-test.component.css']
})
export class ListTestComponent implements OnInit {

	message = 'List works!';

	constructor() { }

	ngOnInit() {
	}

}
