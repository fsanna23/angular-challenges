import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    [type]="cardType"
    customClass="bg-light-red"
    (addItem)="onAddItem()"
    (deleteItem)="onDeleteItem($event)">
    <img head-img src="assets/img/teacher.png" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  onAddItem() {
    this.store.addOne(randTeacher());
  }

  onDeleteItem(itemId: number) {
    this.store.deleteOne(itemId);
  }
}
