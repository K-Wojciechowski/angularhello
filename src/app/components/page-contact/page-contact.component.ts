import { Component, OnInit, Input } from '@angular/core';
import { ContactMessageModel } from '../../models/contact-message.model';
import { ContactService } from '../../services/contact.service';
import { StatusMessageModel } from '../../models/status-message.model';

@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.css']
})
export class PageContactComponent implements OnInit {
  message: ContactMessageModel;

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit() {
    this.message = new ContactMessageModel();
  }

  onSubmit() {
    this.contactService.send(this.message).subscribe((s: StatusMessageModel) => {
        alert(`Success: ${s.success}\n${s.message}`);
        this.message = new ContactMessageModel();
    });
  }
}
