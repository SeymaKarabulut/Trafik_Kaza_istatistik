
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '210541012@firat.edu.tr', 
      pass: 'touv vstg qzvz vsqj' 
    }
  });

  const mailOptions = {
    from: '210541012@firat.edu.tr',
    to: to.join(', '),
    subject: subject,
    text: text
  };

  return transporter.sendMail(mailOptions);
};

const sendMessageToUsers = async (users, messageContent) => {
  try {
    const userEmails = users.map(user => user.email);
    await sendEmail(userEmails, 'Toplu Mesaj', messageContent);

    console.log(`Toplu mesaj gönderildi: ${messageContent}`);
  } catch (error) {
    console.error('Toplu mesaj gönderme hatası:', error);
    throw new Error('Toplu mesaj gönderme başarısız oldu');
  }
};

module.exports = { sendMessageToUsers };
