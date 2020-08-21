class Map {
    constructor() {
        this.showMap();
        this.showMarker();
        this.myMap;
    }

    showMap() {
        this.myMap = L.map('mapid').setView([48.691985, 6.186143], 13); // position en latitude et longitude pour être au dessus de Nancy

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 17,
            minZoom: 14,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoidmFsZW50aW4yNzkyIiwiYSI6ImNrMzRwZ2MyczA0ZDAzY212OHpqOG5iaTcifQ.njZF7F_b7IvKjJL9Hfyenw'
        }).addTo(this.myMap);
    }

    showMarker() {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=nancy&apiKey=6bd2445ea5a07c45fd71dda57fd75c33c214977b", reponse => {
            let stations = JSON.parse(reponse);
            stations.forEach( e => {
                let station = {
                    name: e.name,
                    address: e.address,
                    positionLat: e.position.lat,
                    positionLng: e.position.lng,
                    status: e.status,
                    availableBike: e.available_bikes,
                    availableSpace: e.available_bike_stands
                };

                // changement couleur marqueur si vélo disponible ou non
                let myIcon = L.icon
                if (station.availableBike === 0 || station.status === "CLOSED") {
                    myIcon = L.icon({
                         iconUrl: "images/bike-red.png",
                         iconSize: [35, 35],
                         iconAnchor: [12, 30]
                     })
                } else {
                    myIcon = L.icon({
                        iconUrl: "images/bike-green.png",
                        iconSize: [35, 35],
                        iconAnchor: [12, 30]
                    })
                };

             // Affichage des infos au click sur un marqueur 
                let marker = L.marker([station.positionLat, station.positionLng], {icon: myIcon}).addTo(this.myMap)
                marker.addEventListener("click", function() {
                document.getElementById("reserv_name").textContent = "Nom : " + station.name;
                document.getElementById("reserv_address").textContent = "Adresse : " + station.address;
                document.getElementById("reserv_status").textContent = "Statut : " + station.status;
                document.getElementById("reserv_available_space").textContent = "Places disponibles : " + station.availableSpace;
                document.getElementById("reserv_available_bike").textContent = "Vélos disponibles : " + station.availableBike;

             // récupération nom station et adresse station dans Session storage

             sessionStorage.setItem("Name Station", station.name);
             sessionStorage.setItem("Address Station", station.address);

             // apparition ou disparition bouton "réserver un vélo" si pas de vélo dans la station
             if (station.availableBike === 0) {
                  document.getElementById("reserv_btn").style.display = "none";
             } else if (station.availableBike >= 1) {
                   document.getElementById("reserv_btn").style.display = "block";
             }
             });
         });
      });
    }
}


const map = new Map();