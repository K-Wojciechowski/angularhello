export class ContactMessageModel {
  public subject: string;
  public text: string;
  public author: string;

  constructor(subject: string = '', text: string = '', author: string = '') {
    this.subject = subject;
    this.text = text;
    this.author = author;
  }
  static wrap(rawMessage: ContactMessageModel): ContactMessageModel {
    return new ContactMessageModel(rawMessage.subject, rawMessage.text, rawMessage.author);
  }
}
