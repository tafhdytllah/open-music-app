/**
 *
 * @param {import("./authentication-handler")} handler
 * @returns
 */
const routes = (handler) => [
  {
    method: "POST",
    path: "/authentications",
    handler: (request, h) => handler.postAuthenticationHandler(request, h),
  },
];

module.exports = routes;
