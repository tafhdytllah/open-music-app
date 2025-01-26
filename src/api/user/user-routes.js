/**
 * Defines the routes for the user API.
 * @param {import("./user-handler")} handler
 */
const routes = (handler) => [
  {
    method: "POST",
    path: "/users",
    handler: (request, h) => handler.postUserHandler(request, h),
  },
];

module.exports = routes;
