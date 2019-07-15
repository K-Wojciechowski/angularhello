export class UserModel {
  id: number;
  name: string;
  isAdmin: any;

  constructor(name: string, id: number = -1, isAdmin: boolean = false) {
    this.name = name;
    this.id = id;
    this.isAdmin = isAdmin;
  }

  static wrap(rawUser: UserModel): UserModel {
    return new UserModel(rawUser.name, rawUser.id, rawUser.isAdmin);
  }
}
