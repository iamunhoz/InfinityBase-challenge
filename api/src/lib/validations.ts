class Validations {
  constructor() {
    this.validateDto = this.validateDto.bind(this)
  }

  /**
   * @param dto: um objeto vindo do request, considerado impossível de validar antes deste momento
   * @param expectedKeys: as chaves que este objeto deve conter
   * @param errorCallback: o que ser feit0
   */

  validateDto<T>(dto: T, expectedKeys: string[]): T {
    if (typeof dto !== "object") {
      throw new Error("first argument must be an object")
    }

    const dtoKeys = Object.keys(dto as Record<string, unknown>)

    const wrongKeys: string[] = []
    // rodar pela maior array das duas
    if (expectedKeys.length >= dtoKeys.length) {
      expectedKeys.forEach((K) => {
        // objeto fornecido não possui uma das chaves esperadas
        if (!dtoKeys.includes(K)) {
          wrongKeys.push(K)
        }
      })
    } else {
      dtoKeys.forEach((K) => {
        // objeto fornecido possui chaves a mais além das chaves esperadas
        if (!expectedKeys.includes(K)) {
          wrongKeys.push(K)
        }
      })
    }

    if (wrongKeys.length) {
      throw new Error(
        process.env.NODE_ENV === "production"
          ? `[1001]: Irregular Request`
          : `irregular keys: ${wrongKeys.toString()}`
      )
    }

    return dto
  }
}

export default new Validations()
