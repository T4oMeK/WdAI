import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { PostsComponent } from './posts/posts.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  {path: 'posts', component: PostsComponent},
  {path: 'photos', component: PhotosComponent},
  {path: 'photos/:id', component: PhotoComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
