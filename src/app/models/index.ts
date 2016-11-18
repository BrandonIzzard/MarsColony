
export class NewEncounter {
	constructor(
		public date: string,
		public atype: string,
		public action: string,
		public colonist_id: number,
	) { }
}

export interface Encounter {
	id: number;
	date: string;
	atype: string;
	action: string;
	colonist_id: number;
}


export interface Job {
	name: string;
	id: number;
	description: string;
}

export class NewColonist {
	constructor(
		public name: string,
		public age: number,
		public job_id: string,
	) { }
}

export interface Colonist {
	name: string;
	id: number;
	age: number;
	job: Job;
}

export interface Alien {
	type: string;
	submitted_by: string;
	id: number;
	description: string;
}