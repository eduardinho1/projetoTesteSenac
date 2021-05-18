const nodemailer = require("nodemailer")

exports.notificando = function(remetente, senha1, destinatario, usuario_p, senha_p){

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: remetente,
            pass: senha1
        },
        tls: { rejectUnauThorized: false}
    })

    const mailOptions = {
        from: remetente,
        to: destinatario,
        subject: "Email enviado com Node",
        text: "Ola seu usuario é" +usuario_p+ "e sua senha padrão é" +senha_p
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else {
            console.log("Email enviado" + info.response)
        }

    })
}