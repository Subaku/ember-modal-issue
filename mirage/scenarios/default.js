export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('place', 5);
  // server.createList('asset', 5);
  server.createList('assetLocationSummary', 8).forEach(summary => {
    server.createList('assetLocation', 15, { location: summary.location });
  });
}
