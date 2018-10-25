import { Component, OnInit, Input, Directive} from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  id_user = Math.ceil(1000 + Math.random() * (9999 - 1000));
  id_user_ced : String;
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


  constructor(private router: Router) { 
    
  }

  ngOnInit() {
  }

  onClick(value){
    this.id_user_ced = value; 
    this.router.navigate(['lunchrooms'], )
    console.log(this.id_user_ced);
  }

}
