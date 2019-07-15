import express from 'express';
import { checkAdmin } from '../service/auth-tools';
import { StatusMessageModel } from '../models/status-message.model';
import { ContactMessage, User } from '../service/db-mysql';

export async function inboxGet(req: any, res: any) {
  if (!checkAdmin(req, res)) {
    return;
  }
  const messages = await ContactMessage.findAll({include: [{model: User, required: true}]});
  res.status(200).json(messages.map(m => m.toWebModelIncludes()));
}

export async function inboxDelete(req: any, res: any) {
  if (!checkAdmin(req, res)) {
    return;
  }
  await ContactMessage.truncate();
  res.status(200).json(new StatusMessageModel(true, 'Messages deleted'));
}
