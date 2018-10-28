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

  constructor(private service: IdUserService) { }

  ngOnInit() {
    this.getAllComments();
  }

  publicarComentario(nombre, correo, mensaje){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            createPost(post:{
              id:${this.service.get("user_id")}
              text:"${mensaje}"
              author_name:"${nombre}"
              author_email:"${correo}"
              restaurant_id:"5bce0d459804009c34a97474"
              score:4
            }){
              restaurant_id
            }
          }
        `
      }
    }).then(result => {
        console.log(this.comments);
        this.getAllComments()
    }).catch(error => {
      console.log(error)
    });
  }

  getAllComments(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
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
        this.comments = result.data.data.postsByRestaurant;
    }).catch(error => {
      console.log(error)
    });
  }
}
