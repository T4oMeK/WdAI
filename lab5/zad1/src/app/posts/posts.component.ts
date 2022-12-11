import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostsService } from '../posts.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  constructor(private postsService: PostsService) {}

  posts: any[] = [];

  postForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((res: any[]) => this.posts = res);
  }

  post() {
    let postData = {
      "userId": 0,
      "id": 0,
      "title": this.postForm.get("title")!.value,
      "body": this.postForm.get("text")!.value
    }
    this.postsService.sendPost(JSON.stringify(postData)).subscribe((res: any) => this.posts.splice(0, 0, postData))
  }
}
