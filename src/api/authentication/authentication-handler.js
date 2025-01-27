class AuthenticationHandler {
  /**
   * Creates an instance of AuthenticationHandler.
   * @param {Object} authenticationService - The authentication service instance.
   * @param {Object} userService - The user service instance.
   * @param {Object} validator - The validator instance.
   * @param {Object} tokenManager - The token manager instance.
   */
  constructor(authenticationService, userService, tokenManager, validator) {
    this._authenticationService = authenticationService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  /**
   * Handles the request to authenticate a user.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);

    const { username, password } = request.payload;

    const id = await this._userService.verifyUserCredential(username, password);

    const accessToken = this._tokenManager.generateAccessToken({ id });

    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authenticationService.addRefreshToken(refreshToken);

    const response = h.response({
      status: "success",
      message: "Authentication berhasil ditambahkan",
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);

    return response;
  }

  /**
   * Handles the request to refresh an access token.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object containing the new access token.
   */
  async putAuthenticationHandler(request, h) {
    this._validator.validatePutAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._authenticationService.verifyRefreshToken(refreshToken);

    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });

    const response = h.response({
      status: "success",
      data: {
        accessToken,
      },
    });
    response.code(200);

    return response;
  }

  /**
   * Handles the request to delete a refresh token.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async deleteAuthenticationHandler(request, h) {
    this._validator.validateDeleteAuthenticationPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._authenticationService.verifyRefreshToken(refreshToken);

    await this._authenticationService.deleteRefreshToken(refreshToken);

    const response = h.response({
      status: "success",
      message: "Refresh token berhasil dihapus",
    });
    response.code(200);

    return response;
  }
}

module.exports = AuthenticationHandler;
