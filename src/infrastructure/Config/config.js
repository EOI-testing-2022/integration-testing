export const config = {
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY ?? "",
    domain: process.env.MAILGUN_DOMAIN ?? "sandbox261f754ab73b43388177e85a621a13fb.mailgun.org",
    fromAddressStart: "mailgun", // this means mailgun@domain.com
    fromAddressName: "Dan",
  },
  testmail: {
    apiKey: process.env.TESTMAIL_API_KEY ?? "",
    namespace: process.env.TESTMAIL_NAMESPACE ?? "9eqfr",
  },
}
