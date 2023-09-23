import { EmailSender } from "../domain/EmailSender.js"

export class EmailSenderMock extends EmailSender {
  send() {}
}
