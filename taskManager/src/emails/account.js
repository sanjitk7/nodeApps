const sgMail = require("@sendgrid/mail")

const sendgridAPIkey = "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"

sgMail.setApiKey(sendgridAPIkey)

sgMail.send({
    to: "sanjitk2018@gmail.com",
    from: "sanjitcks@gmail.com",
    subject: "SG MAIL 2",
    text: "You will be fine"
})