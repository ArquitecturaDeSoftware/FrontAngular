import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  user_def = Math.ceil(1000 + Math.random() * (9999 - 1000));
  user_ced : any;
  body_img = "../../assets/Others/body.jpg"
  biologia = "../../assets/lunchrooms/biologia.png";
  cafe_campus = "../../assets/lunchrooms/cafe-campus.png";
  ciencias_agrarias = "../../assets/lunchrooms/ciencias-agrarias.png"
  ciencias_economicas = "../../assets/lunchrooms/ciencias-economicas.png"
  ciencias_humanas = "../../assets/lunchrooms/ciencias-humanas.png"
  comedor_central = "../../assets/lunchrooms/comedor-central.png"
  geologia = "../../assets/lunchrooms/geologia.png"
  hemeroteca = "../../assets/lunchrooms/hemeroteca.png"
  matematicas = "../../assets/lunchrooms/matematicas.png"
  odontologia = "../../assets/lunchrooms/odontologia.png"


  constructor(private router: Router, private data: IdUserService) { 
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.data.user_ced = this.user_ced;
    this.data.user_def = this.user_def;
  }

  onClick(value){
    this.user_ced = value; 
    if (value != "") {
      this.router.navigate(['lunchrooms'])
    }
  }

  onClick2(){
    this.router.navigate(['lunchrooms'])
  }

}
