import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Colonist, NewColonist } from '../models';


@Injectable()
export default class ColonistService {


	COLONIST_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/colonist';


	constructor(private http: Http) { }

	getColonist(): Observable<Colonist[]> {
		return this.http.get(this.COLONIST_JSON)
						.map((res: Response) => res.json().colonist);
          
	}
  submitColonist(colonist: NewColonist): Observable<Colonist> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.COLONIST_JSON, { colonist }, { headers })
			.map((res: Response) => res.json().colonist);

}
