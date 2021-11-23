var eoAuth = require('eo-auth');
const rp = require('request-promise-native');

const call = async (method, url, formData, body) => {

    var accessToken = await eoAuth.getAccessToken();

    var options = {
        'method': method,
        'url': 'https://api.electricobjects.com/api/' + url,
        'headers': {
            'Authorization': 'Bearer ' + accessToken,
        },
        json: true
    };

    if (formData) {
        options.formData = formData;
    }

    if (body) {
        options.body = body;
    }

    return rp(options);

};

const getAllEvents = async () => {
    return call('GET', 'v5/events?' + (new URLSearchParams({
        type: 'DisplayEvent',
        group_by: 'user',
    })).toString());
}

const getArtwork = async (artworkId) => {
    return call('GET', `v5/artworks/${artworkId}`);
}

const getArtworkDisplayers = async (artworkId) => {
    return call('GET', `v5/artworks/${artworkId}/users/displayed`);
}

const getObfuscatedArtwork = async (obfId) => {
    return call('GET', 'v5/artworks/show?' + (new URLSearchParams({
        obf_id: obfId,
    })).toString());
}

const turnOn = async (deviceId) => {
    return call('PUT', `v6/devices/${deviceId}?backlight_state=true`);
}

const turnOff = async (deviceId) => {
    return call('PUT', `v6/devices/${deviceId}?backlight_state=false`);
}

const getUser = async () => {
    return call('GET', `v5/user`);
}

const getUserDevices = async () => {
    return call('GET', `v5/user/devices`);
}

const getUserById = async (userId) => {
    return call('GET', `v5/users/${userId}`);
}

const getUserByUsername = async (username) => {
    return call('GET', `v5/users/show?` + (new URLSearchParams({
        username: username,
    })).toString());
}

const getSuggestedUsers = async () => {
    return call('GET', `v5/user/recommended/users`);
}

const getSections = async () => {
    return call('GET', `v5/user/browse`);
}

const getUserEvents = async () => {
    return call('GET', 'v5/user/events?' + (new URLSearchParams({
        type: 'DisplayEvent',
        group_by: 'payload.ref',
    })).toString());
}

const getUserFavoritesReproductions = async () => {
    return call('GET', `v5/user/artworks/favorited`);
}

const getUserFoundArtwork = async () => {
    return call('GET', `v5/user/artworks/found`);
}

const getUserPlaylists = async () => {
    return call('GET', `v5/user/playlists`);
}

const publishArtwork = async (artworkId) => {
    return call('PUT', `v5/artworks/${artworkId}/publish`);
}

const publishPlaylist = async (playlistId) => {
    return call('PUT', `v5/playlists/${playlistId}/publish`);
}

const reorderPlaylistArtwork = async (playlistId, ids) => {
    return call('PUT', `v5/playlists/${playlistId}/playlist_artworks`, { ids: ids });
}

const getPlaylist = async (playlistId) => {
    return call('GET', `v5/playlists/${playlistId}`);
}

const getPlaylistArtworks = async (playlistId) => {
    return call('GET', `v5/playlists/${playlistId}/playlist_artworks`);
}

const favoriteArtwork = async (artworkId) => {
    return call('PUT', `v5/user/artworks/favorited/${artworkId}`);
}

const unFavoriteArtwork = async (artworkId) => {
    return call('DELETE', `v5/user/artworks/favorited/${artworkId}`);
}

const addArtworkToPlaylist = async (playlistId, artworkId) => {
    return call('PUT', `v5/playlists/${playlistId}/artworks/${artworkId}`);
}

const deletePlaylist = async (playlistId) => {
    return call('DELETE', `v5/playlists/${playlistId}`);
}

const displayArtwork = async (deviceId, artworkId) => {
    return call('PUT', `v5/devices/${deviceId}/displayed/artworks/${artworkId}`);
}

const displayPlaylist = async (deviceId, playlistId, shuffle) => {
    var data = null;
    if (shuffle) {
        data = {
            shuffle: true
        }
    }
    return call('PUT', `v5/devices/${deviceId}/displayed/playlists/${playlistId}`, null, data);
}

module.exports = {
    call,
    getAllEvents,
    getArtwork,
    getArtworkDisplayers,
    getObfuscatedArtwork,
    turnOn,
    turnOff,
    getUser,
    getUserById,
    getUserByUsername,
    getUserDevices,
    getSuggestedUsers,
    getUserEvents,
    getUserFavoritesReproductions,
    getUserFoundArtwork,
    getUserPlaylists,
    publishArtwork,
    publishPlaylist,
    reorderPlaylistArtwork,
    getPlaylist,
    getPlaylistArtworks,
    favoriteArtwork,
    unFavoriteArtwork,
    addArtworkToPlaylist,
    deletePlaylist,
    displayArtwork,
    displayPlaylist,
}