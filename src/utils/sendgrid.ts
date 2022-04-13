import sgMail from "@sendgrid/mail";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { htmlSignup } from "./emails";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationToken = async (data: {
  email: string;
  name: string;
  token: string;
}) => {
  const html = htmlSignup(data).html;
  const msg = {
    to: data.email,
    from: process.env.EMAIL_SENDGRID,
    subject: "Confirmação de Cadastro",
    text: `Link para confirmação`,
    html,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.log("Email doesn't sent = ", error.message);
    const userRepository = getCustomRepository(UserRepository);
    await userRepository.delete({ email: data.email });
    throw new Error(`Sendgrid: ${error.message}`);
  }
};

const sendForgotPassword = async (data: {
  email: string;
  name: string;
  token: string;
}) => {
  const msg = {
    to: data.email,
    from: process.env.EMAIL_SENDGRID,
    subject: "Confirmação de Cadastro",
    text: `Alteração de senha`,
    html: `<h1>Olá ${data.name}</h1>
      <p>Clique no link abaixo para ALTERAR SUA SENHA:</p>
      <p><strong style='color: red'>SE VOCÊ NÃO SOLICITOU A TROCA DE SENHA IGNORE ESSE EMAIL!</strong></p>
      <a target="_blank" href="${process.env.WEB_URL}/change_password?email=${data.email}&token=${data.token}"> Trocar de senha </a>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.log("Email doesn't sent = ", error.message);
    const userRepository = getCustomRepository(UserRepository);
    await userRepository.delete({ email: data.email });
    throw new Error(`Sendgrid: ${error.message}`);
  }
};

export { sendConfirmationToken, sendForgotPassword };
