import { EmailSender } from "../domain/services/EmailSender.js"

export class EmailSenderMock extends EmailSender {
  send() {}
}
