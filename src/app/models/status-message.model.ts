export class StatusMessageModel {
  success: boolean;
  message: string;

  constructor(success: boolean, message: string = '') {
    this.success = success;
    this.message = message;
  }
}
