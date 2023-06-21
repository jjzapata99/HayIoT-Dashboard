import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConectionService {
  url = 'http://localhost:8000/';
  constructor(private http:HttpClient) { }
  getQuery(dire : string): any {
    return this.http.get(this.url+dire)
  }
}
