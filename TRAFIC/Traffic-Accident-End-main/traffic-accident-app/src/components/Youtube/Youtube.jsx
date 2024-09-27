// YouTube.jsx dosyası
import React, { useEffect, useState } from 'react';
import './Youtube.css'; // CSS stil dosyanızın yolu

const YouTube = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // API anahtarınızı buraya ekleyin
    const API_KEY = 'AIzaSyAGQ9i0o9oiUtl2pB83WnbTm_v00_5XZKs';
    const language = 'tr'; // Türkçe videoları çekmek için dil parametresi
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=trafik+eğitim&part=snippet&key=${API_KEY}&regionCode=TR&relevanceLanguage=${language}&type=video&maxResults=12`;

    // API'den video verilerini çekin
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('API request failed');
        }
        return response.json();
      })
      .then(data => {
        // Gelen verileri işleyin ve videoları state'e ekleyin
        setVideos(data.items);
      })
      .catch(error => console.error('API request error:', error));
  }, []); // useEffect sadece bir kez çalışsın diye boş bağımlılık dizisi kullandık

  return (
    <div>
      {/* Videoları göstermek için bir konteyner */}
      <div className="video-container">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <iframe src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen title={video.snippet.title}></iframe>
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTube;
