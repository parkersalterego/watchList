import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ListService } from '../../services/list.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dahboard',
  templateUrl: './dahboard.component.html',
  styleUrls: ['./dahboard.component.scss']
})
export class DahboardComponent implements OnInit {
  @ViewChild('listTitleInput') listTitleInput;
  listItems;


  constructor(
              private listService: ListService,
              private userService: UserService
  ) { }

  ngOnInit() {
    this.getLists();
  }

  onlistFormSubmit(f) {
    this.listService.createList(f.value.title)
      .subscribe(data => {
        this.listTitleInput.nativeElement.value = '';
        this.listItems = data.lists;
      });
  }

  getLists() {
    this.userService.getUserById()
      .subscribe(data => {
        this.listItems = data.lists;
      });
  }

  onDeleteClick(i) {
    this.listService.deleteList(this.listItems[i]._id)
      .subscribe(data => {
        if (data) {
          this.listItems.splice(i, 1);
          this.listService.updateUserLists(this.listItems)
            .subscribe(user => {
              console.log(user);
            });
        }
      });

  }

}
