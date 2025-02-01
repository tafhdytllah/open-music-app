const routes = (handler) => [
  {
    method: "POST",
    path: "/export/playlists/{id}",
    handler: (request, h) => handler.postExportNotesHandler(request, h),
    options: {
      auth: "openmusic_jwt",
    },
  },
];

module.exports = routes;
