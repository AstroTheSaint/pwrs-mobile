// Globe Visualization Module
const PWRS = {
    // Tour data for different years
    TOUR_DATA: [
        // 2024 Tour Data
        { lat: 34.0522, lng: -118.2437, size: 20000, label: 'Los Angeles - $1.2M' },
        { lat: 40.7128, lng: -74.0060, size: 20000, label: 'New York - $1.45M' },
        { lat: 51.5074, lng: -0.1278, size: 15000, label: 'London - $1.1M' },
        { lat: 35.6762, lng: 139.6503, size: 18000, label: 'Tokyo - $1.3M' },
        { lat: 48.8566, lng: 2.3522, size: 16000, label: 'Paris - $1.15M' },
        { lat: -33.9249, lng: 18.4241, size: 12000, label: 'Cape Town - $900K' },
        { lat: -23.5505, lng: -46.6333, size: 17000, label: 'São Paulo - $1.15M' },
        { lat: -33.8688, lng: 151.2093, size: 14000, label: 'Sydney - $1M' },
        
        // 2025 Tour Data
        { lat: 34.0522, lng: -118.2437, size: 22000, label: 'Los Angeles - $1.3M' },
        { lat: 40.7128, lng: -74.0060, size: 22000, label: 'New York - $1.5M' },
        { lat: 51.5074, lng: -0.1278, size: 18000, label: 'London - $1.2M' },
        { lat: 35.6762, lng: 139.6503, size: 20000, label: 'Tokyo - $1.4M' },
        { lat: 48.8566, lng: 2.3522, size: 18000, label: 'Paris - $1.25M' },
        { lat: -33.9249, lng: 18.4241, size: 15000, label: 'Cape Town - $1M' },
        { lat: -23.5505, lng: -46.6333, size: 19000, label: 'São Paulo - $1.25M' },
        { lat: -33.8688, lng: 151.2093, size: 16000, label: 'Sydney - $1.1M' },
        
        // 2026 Tour Data
        { lat: 34.0522, lng: -118.2437, size: 24000, label: 'Los Angeles - $1.4M' },
        { lat: 40.7128, lng: -74.0060, size: 24000, label: 'New York - $1.6M' },
        { lat: 51.5074, lng: -0.1278, size: 20000, label: 'London - $1.3M' },
        { lat: 35.6762, lng: 139.6503, size: 22000, label: 'Tokyo - $1.5M' },
        { lat: 48.8566, lng: 2.3522, size: 20000, label: 'Paris - $1.35M' },
        { lat: -33.9249, lng: 18.4241, size: 18000, label: 'Cape Town - $1.1M' },
        { lat: -23.5505, lng: -46.6333, size: 21000, label: 'São Paulo - $1.35M' },
        { lat: -33.8688, lng: 151.2093, size: 18000, label: 'Sydney - $1.2M' }
    ],

    // Filter tour data by year
    yearFilter: (data, year) => {
        const yearIndex = {
            '2024': 0,
            '2025': 8,
            '2026': 16
        };
        return data.slice(yearIndex[year], yearIndex[year] + 8);
    },

    // Globe Visualization Class
    GlobeVisualization: class {
        constructor(containerId, options = {}) {
            this.container = document.getElementById(containerId);
            this.options = options;
            this.globe = Globe()(this.container)
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
                .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
                .pointRadius('size')
                .pointColor(() => '#1DB954')
                .pointAltitude(0.1)
                .atmosphereColor('#1DB954')
                .atmosphereAltitude(options.atmosphereAltitude || 0.2)
                .atmosphereGlow(0.5)
                .atmosphereGlowColor('#1DB954')
                .atmosphereGlowPower(3)
                .atmosphereGlowCoefficient(0.6)
                .arcColor(() => ['#1DB954', '#1DB954'])
                .arcAltitude(0.1)
                .arcDashLength(0.4)
                .arcDashGap(0.2)
                .arcDashAnimateTime(2000)
                .arcsTransitionDuration(1000)
                .pointLabel(d => d.label)
                .onPointClick(({ lat, lng }) => this.highlightPoint(lat, lng));

            this.data = [];
        }

        setData(data) {
            this.data = data;
            this.globe.pointsData(data);
            
            // Create arcs between consecutive points
            const arcs = [];
            for (let i = 0; i < data.length - 1; i++) {
                arcs.push({
                    startLat: data[i].lat,
                    startLng: data[i].lng,
                    endLat: data[i + 1].lat,
                    endLng: data[i + 1].lng
                });
            }
            this.globe.arcsData(arcs);
        }

        highlightPoint(lat, lng) {
            this.globe.pointOfView({ lat, lng, altitude: 2.5 }, 1000);
        }

        startAnimation(speed = 0.05) {
            this.globe.controls().autoRotate = true;
            this.globe.controls().autoRotateSpeed = speed;
        }
    }
}; 