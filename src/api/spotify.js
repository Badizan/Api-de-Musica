import axios from 'axios';

const clientID = '5622760cf29a4f9396375eae0d7ddd36';
const clientSecret = '93ab87f569c6412281d95cbf44aa3421';

const getToken = async () => {
  const response = await axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  });

  return response.data.access_token;
};

export const searchArtists = async (query) => {
  const token = await getToken();
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      q: query,
      type: 'artist',
      limit: 10
    }
  });
  return response.data.artists.items;
};

export const getArtistTopTracks = async (artistId, market = 'US') => {
  const token = await getToken();
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      market
    }
  });
  return response.data.tracks;
};
