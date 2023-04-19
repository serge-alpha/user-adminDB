const nodemailer = require("nodemailer");

const sendMail=async(Data)=> {
    try {
    const transporter =await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // creating mail object
  const emailContent={
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: Data.email, // list of receivers
    subject: Data.subject, // Subject line
    html: Data.html // html body
  }
    await transporter.sendMail(emailContent,(err,info)=>{
        if (err) {
            console.log(err);
          } else {
            console.log("Message sent: %s", info.response);
          }
        });

    } catch (error) {
        console.log("Problem sending Email: ", error);
    }
  

}

module.exports=sendMail;