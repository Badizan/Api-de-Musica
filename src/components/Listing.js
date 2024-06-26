import React, { useState } from 'react';
import { searchArtists } from '../api/spotify';
import { Link } from 'react-router-dom';
import './Listing.css';

const List = () => {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    const results = await searchArtists(query);
    const artistsWithImages = results.filter(artist => artist.images.length > 0);
    if (artistsWithImages.length > 0) {
      setArtists(artistsWithImages);
      setMessage('');
    } else {
      setArtists([]);
      setMessage('Não encontrado');
    }
  };

  return (
    <div className="list-container">
      <h2>Buscar Artistas</h2>
      <input
        type="text"
        placeholder="Nome do Artista"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div className="list">
        {artists.map(artist => (
          <div key={artist.id}>
            <img src={artist.images[0].url} alt={artist.name} />
            <h3>{artist.name}</h3>
            <Link to={`/details/${artist.id}`} className="details-button">Ver detalhes</Link>
          </div>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default List;
