import { sleep } from "../../domain/utils/sleep.js"
import { config } from "../Config/config.js"

export class TestInbox {
  constructor({ apiKey = config.testmail.apiKey, namespace = config.testmail.namespace } = {}) {
    this.apiKey = apiKey
    this.namespace = namespace

    if (!apiKey) {
      throw new Error("TestInbox: apiKey is required")
    }
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

    if (data.result === "fail") {
      throw new Error(data.message)
    }

    return data.emails
  }

  async getEmailsArrivedInLastSeconds() {
    return await this.getEmails({ from: new Date(Date.now() - 4000) })
  }

  async waitForNextEmail() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const emails = await this.getEmailsArrivedInLastSeconds()

      if (emails.length > 0) {
        return emails[0]
      }

      await sleep(100)
    }
  }
}
