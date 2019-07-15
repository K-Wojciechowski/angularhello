import bcrypt from 'bcrypt';
import { Sequelize, DataTypes, Transaction } from 'sequelize';
import { Model } from 'sequelize';
import {
  HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin,
  Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin
} from 'sequelize';
import { UserModel } from '../models/user.model';
import { ContactMessageModel } from '../models/contact-message.model';
import { CONFIG } from '../config/config';

export class User extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
  public isAdmin!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMessages!: HasManyGetAssociationsMixin<ContactMessage>;
  public addMessage!: HasManyAddAssociationMixin<ContactMessage, number>;
  public hasMessage!: HasManyHasAssociationMixin<ContactMessage, number>;
  public countMessages!: HasManyCountAssociationsMixin;
  public createMessage!: HasManyCreateAssociationMixin<ContactMessage>;

  public readonly messages?: ContactMessage[];

  // tslint:disable-next-line: member-ordering
  public static associations: {
    messages: Association<User, ContactMessage>;
  };

  public toWebModel(): UserModel {
    return UserModel.wrap(this.toJSON() as UserModel);
  }

  public getTokenPayload(): any {
    return {id: this.id, name: this.name, isAdmin: this.isAdmin};
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export class ContactMessage extends Model {
  public id!: number;
  public authorId!: number;
  public subject!: string;
  public text!: string;

  // tslint:disable-next-line: variable-name
  public readonly User?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async toWebModel(): Promise<ContactMessageModel> {
    const userDB: User = await User.findByPk(this.authorId);
    return ContactMessageModel.wrap({ subject: this.subject, text: this.text, author: userDB.name });
  }

  public toWebModelIncludes(): ContactMessageModel {
    return ContactMessageModel.wrap({ subject: this.subject, text: this.text, author: this.User.name });
  }
}

export const sequelize = new Sequelize(CONFIG.dbUrl, {transactionType: Transaction.TYPES.IMMEDIATE});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

ContactMessage.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  subject: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  text: {
    type: new DataTypes.STRING(1024),
    allowNull: false,
  }
}, {
    sequelize,
    tableName: 'messages',
  });

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
    sequelize,
    tableName: 'users',
  });

User.hasMany(ContactMessage, {
  sourceKey: 'id',
  foreignKey: 'authorId',
  as: 'messages'
});
ContactMessage.belongsTo(User, { foreignKey: 'authorId' });

async function doHash(user: User) {
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (err) {
    throw new Error();
  }
}

User.beforeSave((user, options) => {
  if (user.changed('password')) {
    return doHash(user);
  }
});

sequelize.sync();

// Create sample user accounts
User.findOrCreate({ where: { id: 1, name: 'alice', isAdmin: false }, defaults: {password: 'password123'} });
User.findOrCreate({ where: { id: 2, name: 'bob', isAdmin: true }, defaults: {password: 'bob'} });
