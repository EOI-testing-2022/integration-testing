import { EmailSender } from "../../domain/services/EmailSender.js"
import { config } from "../Config/config.js"

const INVALID_DESTINATION_ERROR = "to parameter is not a valid address. please check documentation"

export class EmailSenderMailgun extends EmailSender {
  constructor({
    apiKey = config.mailgun.apiKey,
    domain = config.mailgun.domain,
    fromAddressStart = config.mailgun.fromAddressStart,
    fromAddressName = config.mailgun.fromAddressName,
  } = {}) {
    super()

    if (!apiKey) {
      throw new Error("EmailSenderMailgun: apiKey is required")
    }

    this.apiKey = apiKey
    this.domain = domain
    this.from = `${fromAddressName} <${fromAddressStart}@${domain}>`
  }

  async sendWelcomeEmail(user) {
    const url = `https://api.mailgun.net/v3/${this.domain}/messages`

    const data = new FormData()
    data.append("from", this.from)
    data.append("to", user.email.email)
    data.append("subject", "Welcome To My Project")
    data.append("template", "welcome")
    data.append("t:variables", JSON.stringify({ name: user.name }))

    const options = {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${this.apiKey}`).toString("base64")}`,
      },
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      await this.handleError(response)
    }
  }

  async handleError(response) {
    if (response.status === 401) {
      throw new Error("Invalid Mailgun API key")
    }

    const data = await response.json()

    if (data.message === INVALID_DESTINATION_ERROR) {
      throw new Error("Invalid user destination email")
    }

    throw new Error(data.message)
  }
}
