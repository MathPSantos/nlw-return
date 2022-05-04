import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../mail.adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d6d3905445c11e",
    pass: "a15552f2b9a94b",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Matheus Santos <mathsantos.dev@gmail.com>",
      subject,
      html: body,
    });
  }
}
