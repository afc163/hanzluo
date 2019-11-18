const nodemailer = require('nodemailer')
const { emailTransporterSettings } = require('../../settings')

const mailTransporter = nodemailer.createTransport(emailTransporterSettings)

module.exports = {
  mailTransporter,
}
