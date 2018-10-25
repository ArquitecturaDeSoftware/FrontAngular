import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdUserService {

  constructor() { }
  
  user_def:any;
  user_ced:any;
  all_lunchrooms = {};

}
