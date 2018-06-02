const { Router } = require('express');
const nodemailer = require('nodemailer');
const querystring = require('querystring');
const Joi = require('joi');
const config = require('./config');

const router = Router();
const transporter = nodemailer.createTransport(config);

router
  .get('/', (req, res) =>{
    console.log(req.query.message);
    res.render('contact', { error: req.query.message });
  })
  .post('/send', (req, res) => {
    const { name, email, message } = req.body;
    const schema = Joi.object().keys({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      message: [Joi.string(), Joi.number()]
    }).with('name', 'email');

    Joi.validate({ name, email, message }, schema, (err, value) => {
      if (err) {
        console.log(err);
        const data = {
          status: 'error',
          message: err.details[0].message
        };
        res.redirect(`/contact?${querystring.stringify(data)}`);
      }

      const mailOptions = {
        from: '"Fred Foo 👻" <foo@bar.com>', // sender address
        to: 'bar@buz.com, baz@buz.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: `You have a submission with the following details... Name: ${name} Email: ${email} Message: ${message}`,
        html: `<p>You have a submission with the following details...</p>
  <ul><li>Name: ${name}</li><li>Email: ${email}</li><li>Message: ${message}</li></ul>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent:', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.redirect('/');
      });
    });
  });

module.exports = router;
