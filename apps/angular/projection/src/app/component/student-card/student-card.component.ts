import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    [type]="cardType"
    customClass="bg-light-green"
    (addItem)="onAddItem()"
    (deleteItem)="onDeleteItem($event)">
    <img head-img src="assets/img/student.webp" width="200px" />
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  onAddItem() {
    this.store.addOne(randStudent());
  }

  onDeleteItem(itemId: number) {
    this.store.deleteOne(itemId);
  }
}
