import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ab2aa20d7639d0',
    pass: 'a13aba47fc2446',
  },
});

export const emailService = {
  sendEmail: async (to: string, subject: string, html: string) => {
    try {
      transporter.sendMail({
        from: '"Paulo" <paulo_barbosa_outlook.com>',
        to,
        subject,
        html,
      });
      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
};
