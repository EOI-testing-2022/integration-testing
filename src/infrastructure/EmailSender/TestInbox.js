import { sleep } from "../../domain/utils/sleep.js"

export class TestInbox {
  constructor() {
    this.apiKey = "*****"
    this.namespace = "9eqfr"
  }

  getTestEmailAddress() {
    return `${this.namespace}.test@inbox.testmail.app`
  }

  async getEmails({ from = new Date() }) {
    const params = new URLSearchParams()

    params.append("apikey", this.apiKey)
    params.append("namespace", this.namespace)
    params.append("pretty", "true")
    params.append("timestamp_from", from.getTime().toString())

    const response = await fetch(`https://api.testmail.app/api/json?${params.toString()}`)

    const data = await response.json()

    return data.emails
  }

  async getEmailsArrivedInLastSeconds() {
    return await this.getEmails({ from: new Date(Date.now() - 10000) })
  }

  async waitForNextEmail() {
    const seconds = 10
    const timeout = seconds * 1000
    let passedTime = 0

    while (passedTime < timeout) {
      const emails = await this.getEmailsArrivedInLastSeconds()

      if (emails.length > 0) {
        return emails[0]
      }

      await sleep(100)
      passedTime += 100
    }

    throw new Error("Timeout waiting for email")
  }
}
