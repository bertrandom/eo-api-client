var client = require('../client');

(async () => {

    console.log(await client.displayPlaylist(1383, 30138, true));

})();