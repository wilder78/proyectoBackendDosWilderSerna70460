import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";

// Función para enviar un correo electrónico
export const sendEmail = async (template, subject, email) => {
  // Creamos el transporte para el envío del correo utilizando Gmail
  const transport = nodemailer.createTransport({
    service: "gmail",  
    port: 587,         
    auth: {
      user: "profeluismeradev@gmail.com",  
      pass: envsConfig.GMAIL_PASS          
    }
  });

  try {
    // Enviamos el correo utilizando el transporte configurado
    await transport.sendMail({
      from: "profeluismeradev@gmail.com",   
      to: email,                           
      subject: subject,                    
      html: template,                       
      // Si deseas enviar archivos adjuntos, puedes descomentar la sección a continuación
      // attachments:[
      //   {
      //     filename: "gatito.jpg",          
      //     path:"public/images/gatito.jpg", 
      //     cid: "gatito"                    
      //   }
      // ]
    });
    console.log("Correo enviado exitosamente");
  } catch (error) {
    console.log("Error al enviar el correo: ", error);
  }
};
