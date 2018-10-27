import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component-comment',
  templateUrl: './component-comment.component.html',
  styleUrls: ['./component-comment.component.css']
})
export class ComponentCommentComponent implements OnInit {

  @Input () id_comment
  @Input () id_lunchroom
  @Input () name_author
  @Input () email_author
  @Input () text

  constructor() { }

  ngOnInit() {
  }

}
