import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";

import axios from 'axios'

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})

export class ViewCommentsComponent implements OnInit {

  comments = [];
  rating:any;

  constructor(private service: IdUserService) { }

  ngOnInit() {
    this.getAllComments();
  }

  publicarComentario(nombre, correo, mensaje){
    var a = 0;
    this.rating = document.getElementsByName('rating');
    for (let i = 0; i < this.rating.length; i++) {
      if (this.rating[i].checked) {
        a = this.rating[i].value;        
      }
    }
    
    axios({
      url: 'http://34.73.155.196/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            createPost(post:{
              id: 0
              text:"${mensaje}"
              author_name:"${nombre}"
              author_email:"${correo}"
              restaurant_id:"${this.service.get("id_lunchroom")}"
              score: ${a}
            }){
              restaurant_id
            }
          }
        `
      }
    }).then(result => {
        this.getAllComments()
    }).catch(error => {
      console.log(error)
    });
  }

  getAllComments(){
    axios({
      url: 'http://34.73.155.196/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            postsByRestaurant(id_restaurant:"${this.service.get("id_lunchroom")}"){
              id
              restaurant_id
              author_name
              author_email
              text
            }
          }
        `
      }
    }).then(result => {
        if(result.data.data != null){
          this.comments = result.data.data.postsByRestaurant;
        }
    }).catch(error => {
      console.log(error)
    });
  }
}
