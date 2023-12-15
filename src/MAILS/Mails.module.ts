import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { MailService } from "./Mails.services";
import { PdfService } from "./pdf.services";
import { SettingsModule } from "../SETTINGS/settings.module";
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: "smtp.hostinger.com",
          secure: false,
          auth: {
            user: "irshad@bairuhatech.com",
            pass: "Irshad_275",
          },
        },
        defaults: {
          from: `irshad@bairuhatech.com`,
        },
        template: {
          options: {
            strict: true,
          },
        },
      }),
    }),
    SettingsModule,
  ],
  providers: [MailService, PdfService],
  exports: [MailService, PdfService],
})
export class EmailModule {}
