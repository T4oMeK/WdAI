import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  constructor(private photosService: PostsService) {}

  photos: any[] = [];

  ngOnInit(): void {
    this.photosService.getPhotos().subscribe(res => this.photos = res)
  }
}
