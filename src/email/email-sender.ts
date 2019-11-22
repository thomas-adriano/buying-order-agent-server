import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { from, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AppConfigs } from "../app-configs";

export class EmailSender {
  constructor(private transportConfigs: SMTPTransport.Options) {}

  public sendEmail(to: string, configs: AppConfigs): Observable<any> {
    return this.doSendEmail({
      from: `"${configs.getAppEmailName()}" <${configs.getAppEmailFrom()}>`, // sender address
      to, // list of receivers
      subject: configs.getAppEmailSubject(), // Subject line
      text: configs.getAppEmailText(), // plain text body
      html: configs.getAppEmailHtml() // html body
    });
  }

  private doSendEmail(emailConfigs: Mail.Options): Observable<any> {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(this.transportConfigs);
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return from(transporter.sendMail(emailConfigs)).pipe(
      tap(() =>
        console.log(`email-sender: sending e-mail to ${emailConfigs.to}`)
      )
    );
  }
}
