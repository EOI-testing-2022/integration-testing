import crypto from "node:crypto"
import { IdGenerator } from "../../domain/services/IdGenerator.js"

export class IdGeneratorRandom extends IdGenerator {
  generate() {
    return crypto.randomUUID()
  }
}
