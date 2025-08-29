import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Lista de versículos
const versiculos = [
  "Filipenses 4:13 – 'Posso todas as coisas naquele que me fortalece.'",
  "Salmos 23:1 – 'O Senhor é o meu pastor; nada me faltará.'",
  "Jeremias 29:11 – 'Porque eu sei os planos que tenho para você, planos de prosperidade e não de mal, para lhe dar um futuro e uma esperança.'",
  "Isaías 41:10 – 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.'",
  "Mateus 11:28 – 'Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.'"
];

// Configuração do Nodemailer (Gmail exemplo)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "giovanifreitasdc@gmail.com", // seu e-mail
    pass: "fxdl mpdb lzga hidx" // senha ou app password
  }
});

// Rota para envio de e-mail
app.post("/send", async (req, res) => {
  const { email } = req.body;
  const versiculoAleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];

  try {
    await transporter.sendMail({
      from: "giovanifreitasdc@gmail.com",
      to: email,
      subject: "Uma bênção especial para você",
      text: `Olá! 🙏\n\nQue a paz de Jesus esteja com você. Hoje Ele quer lhe lembrar desta palavra:\n\n${versiculoAleatorio}\n\nQue essas palavras iluminem seu dia e encham seu coração de esperança!\n\nCom carinho,\nGiovani`
    });

    res.json({ success: true, message: "E-mail enviado com bênçãos de Jesus!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erro ao enviar e-mail." });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
