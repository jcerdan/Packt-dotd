'use strict'
let config = {
  path: '',         // Temporal file where image will be downloaded and then deleted
  mail: {
    host: '',       // mail server
    port: 587,
    From: '',       // From name
    login: '',      // mail account login
    password: '',   // mail account password
    ToMail: ''      // mail to send dotd image and link
  }
}

module.exports = config
