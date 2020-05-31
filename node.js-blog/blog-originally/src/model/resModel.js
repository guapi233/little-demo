class BaseModel {
  constructor (data, message) {
    if (typeof data === "string") {
      this.message = data
      data = null
      message = null
    }

    data && (this.data = data)
    message && (this.message = message)

  }
}

class SuccessModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.isError = 0
  }
}

class FailModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.isError = 1
  }
}

module.exports = {
  SuccessModel,
  FailModel
}