import { describe, it, expect } from "vitest"
import { IdGeneratorRandom } from "./IdGeneratorRandom.js"

describe("IdGeneratorRandom", () => {
  it("generates random Ids each time", () => {
    const idGenerator = new IdGeneratorRandom()

    const id1 = idGenerator.generate()
    const id2 = idGenerator.generate()

    expect(id1).not.toBe(id2)
  })
})
