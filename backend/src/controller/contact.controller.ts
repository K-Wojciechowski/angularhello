import express from 'express';
import { checkAdmin, checkLogin } from '../service/auth-tools';
import { StatusMessageModel } from '../models/status-message.model';
import { ContactMessage } from '../service/db-mysql';

export async function contactPost(req: any, res: any) {
  const message = await ContactMessage.create({
    subject: req.body.subject,
    text: req.body.text,
    authorId: req.user.id
  });
  res.status(200).json(new StatusMessageModel(true,
    `User: ${req.user.name}\nSubject: ${message.subject}\n${message.text}`));
}
