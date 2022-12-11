import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  constructor(private route: ActivatedRoute, private photoService: PostsService) {}
  private subscription: Subscription | undefined;

  id: number = -1;
  photoUrl: string | undefined;

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.photoService.getPhotoUrlById(this.id).subscribe(res => this.photoUrl = res.url);
  }

  ngOnDestroy(): void {
    if (this.subscription)
    this.subscription.unsubscribe();
  }
}
