import { Component, OnInit } from '@angular/core';
import { ContactMessageModel } from 'src/app/models/contact-message.model';
import { InboxService } from 'src/app/services/inbox.service';
import { StatusMessageModel } from 'src/app/models/status-message.model';

@Component({
  selector: 'app-page-inbox',
  templateUrl: './page-inbox.component.html',
  styleUrls: ['./page-inbox.component.css']
})
export class PageInboxComponent implements OnInit {
  messages: ContactMessageModel[] = [];
  error = '';

  constructor(
    private inboxService: InboxService,
  ) { }

  ngOnInit() {
    this.inboxService.getInboxMessages().subscribe(
      (messages: ContactMessageModel[]) => this.messages = messages,
      error => this.error = error.error.message
    );
  }

  deleteAll() {
    this.inboxService.deleteAllInboxMessages().subscribe(
      (status: StatusMessageModel) => {
        if (status.success) {
          this.messages = [];
          this.error = '';
        } else {
          this.error = status.message;
        }
      },
      error => this.error = error.error.message
    );
  }

}
