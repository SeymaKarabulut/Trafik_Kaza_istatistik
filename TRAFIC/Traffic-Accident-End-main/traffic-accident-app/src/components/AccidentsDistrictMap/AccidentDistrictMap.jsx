import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AccidentDistrictMap = () => {
  const [accidentData, setAccidentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [map, setMap] = useState(null);
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accidentResponse = await fetch('http://localhost:5001/api/accidents/getAccidentsMapData');
        const accidentData = await accidentResponse.json();
        console.log(accidentData.data);

        const formattedDistrictData = accidentData.data.map((district) => ({
          ...district,
          _id: district.properties.name,
          totalAccidents: district.properties.totalAccidents,
          coordinates: district.geometry.coordinates.reverse(),
        }));

        setAccidentData(formattedDistrictData);
        setLoading(false);

        if (map) {
          // Harita konteynerini temizle
          map.remove();
        }

        // Haritayı başlat
        const newMap = L.map('map-container').setView([38.6742, 39.2201], 12);

        // Sınırları belirle
        const southWest = L.latLng(37.879, 38.194);
        const northEast = L.latLng(40.599, 39.584);
        const bounds = L.latLngBounds(southWest, northEast);
        newMap.setMaxBounds(bounds);
        newMap.on('drag', function () {
          newMap.panInsideBounds(bounds, { animate: false });
        });

        setMap(newMap);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        // Bölgeleri temsil eden marker'ları ekle
        formattedDistrictData.forEach((district) => {
          const { coordinates } = district.geometry;
          const marker = L.marker([coordinates[1], coordinates[0]])
            .addTo(newMap)
            .bindPopup(`<p>${district.properties.name}</p><p>Kaza Sayısı: ${district.properties.totalAccidents}</p>`)
            .on('click', () => handleClick(null, district));
        });

        // GeoJSON katmanını oluştur
        const geoJsonLayer = L.geoJSON(formattedDistrictData, {
          style: (feature) => ({
            fillColor: feature.properties.name === selectedDistrict ? '#ff0000' : '#23823a',
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
          }),
          onEachFeature: (feature, layer) => {
            layer.bindPopup(`<p>${feature.properties.name}</p><p>Kaza Sayısı: ${feature.properties.totalAccidents}</p>`);
            layer.on('click', (e) => handleClick(e, feature));
          },
        }).addTo(newMap);

        setGeoJsonLayer(geoJsonLayer);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDistrict]);

  const handleClick = (e, feature) => {
    setSelectedDistrict(feature.properties.name);
  };

  return (
    <div>
     <h1 style={{ color: 'white', textAlign:'center',borderBottom: '5px solid white',marginTop: '10px' }}>Kazların Kaza Yerlerine Göre Dağılımı</h1>
      {loading && <p>Loading...</p>}
      <div id="map-container" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default AccidentDistrictMap;
