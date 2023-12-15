import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { PdfService } from "./pdf.services";
// import { DataResponseDto } from "../shared/dto/data-response-dto";

const testpdf = require("./pdf/testpdf");
type input = {
  to: string;
  subject: string;
};
let templateDatas = require("../MAILS/templates/auth/SignupHtml");
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private pdfService: PdfService,
  ) {}

  async AuthMail(data: any) {
    try {
      await this.mailerService.sendMail({
        to: data?.to,
        subject: data?.subject,
        text: "NextME notification",
        html: data?.template,
      });
    } catch (err) {
      console.log("Signup", err);
    }
  }

  async InviteUserMail(data: any) {
    try {
      await this.mailerService.sendMail({
        to: data?.to,
        subject: data?.subject,
        text: "NextME notification",
      });
    } catch (err) {
      console.log("DutyMeidicalLetterMail", err);
    }
  }
  async RequestDocumentMail(data: any) {
    try {
      await this.mailerService.sendMail({
        to: data?.to,
        subject: data?.subject,
        text: "NextME notification",
        html: data?.template,
      });
    } catch (err) {
      console.log("failed to send mail", err);
    }
  }
  async updateEmailNotify(data: input) {
    console.log(data)
    try {
      let updateEmail = await templateDatas(data);
      await this.mailerService.sendMail({
        to: data?.to,
        subject: data?.subject,
        text: `Your email has been updated to ${data?.to} Successfully. You will get updations and notifications to
        this email id henceforth.`,
      });
    } catch (err) {
      console.log("Something Error on updateEmailNotify", err);
    }
  }

  async sellerEmails(data: any) {
    try {
      await this.mailerService.sendMail({
        to: data?.to,
        subject: data?.subject,
        html: data.template,
      });
    } catch (err) {
      console.log("Something Error on sellerEmailNotify", err);
    }
  }
}
