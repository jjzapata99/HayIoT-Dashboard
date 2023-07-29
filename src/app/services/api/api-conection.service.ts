import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConectionService {
  url = 'http://200.126.14.233:8000/';
  constructor(private http:HttpClient) { }
  getQuery(dire : string): any {
    return this.http.get(this.url+dire)
  }
  putQuery(dire : string, json: any) : any{
    return this.http.post(this.url+dire, json)
  }
  deleteQuery(dire: string): any {
    return this.http.delete(this.url + dire);
  }
}
