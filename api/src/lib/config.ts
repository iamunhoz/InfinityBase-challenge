export const serverData = {
  port: process.env.PORT || 3000,
  APP_VERSION: "0.1",
}

export const ethereumServerData = {
  hostname: "localhost",
  port: "8545",
  protocol: "http",
  getHost() {
    return `${this.protocol}://${this.hostname}:${this.port}`
  },
}
