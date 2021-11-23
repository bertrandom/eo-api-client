var client = require('../client');

(async () => {

    console.log(await client.getUserPlaylists());

})();