import { EmailSender } from "../../domain/services/EmailSender.js"

const INVALID_DESTINATION_ERROR = "to parameter is not a valid address. please check documentation"

export class EmailSenderSendgrid extends EmailSender {
  async sendWelcomeEmail(user) {
    const apiKey = "*****"
    const url = "https://api.mailgun.net/v3/sandbox261f754ab73b43388177e85a621a13fb.mailgun.org/messages"

    const data = new FormData()
    data.append("from", "Dan <mailgun@sandbox261f754ab73b43388177e85a621a13fb.mailgun.org>")
    data.append("to", user.email)
    data.append("subject", "Welcome To My Project")
    data.append("template", "welcome")
    data.append("t:variables", JSON.stringify({ name: user.name }))

    const options = {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
      },
    }

    const response = await fetch(url, options)
    const body = await response.json()

    if (!response.ok) {
      this.handleError(body)
    }
  }

  handleError(body) {
    if (body.message === INVALID_DESTINATION_ERROR) {
      throw new Error("Invalid user destination email")
    }

    throw new Error(body.message)
  }
}
