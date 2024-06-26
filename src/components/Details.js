import React, { useEffect, useState } from 'react';
import { getArtistTopTracks } from '../api/spotify';
import { useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getArtistTopTracks(id);
      if (data.length > 0) {
        setTracks(data);
        setMessage('');
      } else {
        setTracks([]);
        setMessage('Não encontrado');
      }
    };

    fetchTracks();
  }, [id]);

  if (message) return <div className="message">{message}</div>;

  return (
    <div className="details-container">
      <h2>Top Tracks</h2>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            {track.name} - {track.album.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
