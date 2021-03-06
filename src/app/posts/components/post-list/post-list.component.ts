import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostSelector } from '../../store/posts.selectors';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/models';
import { GetAllPostsStartAction } from '../../store/actions/get-all-posts.actions';
import { Observable } from 'rxjs';
import { Post } from '../../posts.models';

@Component({
  selector: 'rg-post-list',
  template: `
    <mat-card class="mv2" *ngFor="let post of (posts$ | async)">
      <mat-card-title>
        <a [routerLink]="['/edit-post', post.uuid]">{{ post.title }}</a>
      </mat-card-title>
      <mat-card-content>{{ post.content }}</mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(public postSelector: PostSelector, private store: Store<State>) {
    this.posts$ = this.postSelector.getPosts();
  }

  ngOnInit() {
    this.postSelector.getFetchAllPosts().subscribe(() => {
      this.store.dispatch(new GetAllPostsStartAction());
    });
  }
}
