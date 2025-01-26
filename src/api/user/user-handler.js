class UserHandler {
  /**
   * Creates an instance of UserHandler.
   * @param {Object} service - The service instance.
   * @param {Object} validator - The validator instance.
   */
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  /**
   * Handles the request to add a new user.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);

    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({
      username,
      password,
      fullname,
    });

    const response = h.response({
      status: "success",
      message: "User berhasil ditambahkan",
      data: {
        userId,
      },
    });
    response.code(201);

    return response;
  }
}

module.exports = UserHandler;
