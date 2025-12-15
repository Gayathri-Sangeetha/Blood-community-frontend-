import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import BackButton from "../components/BackButton";


const Donate = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [search, setSearch] = useState("");

  const [donation, setDonation] = useState({
    name: storedUser?.name || "",
    number: storedUser?.number || "",
    blood: "",
    location: "",
    lat: null,
    lng: null,
    availability: "Yes",
  });

  useEffect(() => {
    if (!storedUser) {
      alert("Please login first!");
      navigate("/login");
    }
  }, [storedUser, navigate]);

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  // Leaflet marker icon fix
  const icon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Search location
  const handleSearchLocation = async () => {
    if (!search) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${search}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      setDonation({
        ...donation,
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        location: display_name,
      });
    } else {
      alert("Location not found!");
    }
  };

  // Move map when lat/lng updates
  function RecenterMap() {
    const map = useMap();
    useEffect(() => {
      if (donation.lat && donation.lng) {
        map.setView([donation.lat, donation.lng], 13);
      }
    }, [donation.lat, donation.lng, map]);
    return null;
  }

  // Location picker
  function LocationPicker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setDonation((prev) => ({
          ...prev,
          lat,
          lng,
          location: "Loading location...",
        }));

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then((res) => res.json())
          .then((data) => {
            setDonation((prev) => ({
              ...prev,
              location: data.display_name || "Unknown Location",
            }));
          })
          .catch(() => {
            setDonation((prev) => ({
              ...prev,
              location: "Failed to fetch location",
            }));
          });
      },
    });

    return donation.lat ? <Marker position={[donation.lat, donation.lng]} icon={icon} /> : null;
  }

  // Final submit
  const handleDonate = () => {
    if (!donation.name || !donation.number || !donation.blood || !donation.location) {
      alert("Please fill all fields!");
      return;
    }

    const updatedUser = { ...storedUser, donation };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Your donation info has been updated!");
    navigate("/button-page");
  };

  return (
    <div className="min-h-screen bg-red-600 flex justify-center items-center px-3 sm:px-4 py-4 sm:py-8">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-2xl shadow-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-4 sm:mb-6 text-center">
          Donate Blood
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4">

          {/* Name */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Name:</label>
            <input
              type="text"
              name="name"
              value={donation.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all"
            />
          </div>

          {/* Number */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Phone Number:</label>
            <input
              type="tel"
              name="number"
              value={donation.number}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all"
            />
          </div>

          {/* Blood group */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Blood Group:</label>
            <select
              name="blood"
              value={donation.blood}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all appearance-none bg-white cursor-pointer"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Search location */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Search Location:</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter city or place…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchLocation()}
                className="flex-1 border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-sm sm:text-base transition-all"
              />
              <button
                onClick={handleSearchLocation}
                className="bg-blue-600 text-white px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 text-sm sm:text-base font-medium whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
          </div>

          {/* Map */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">
              Pick Location on Map:
            </label>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              Click anywhere on the map to select your location
            </p>
            <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                className="w-full h-full"
                scrollWheelZoom={true}
                style={{ touchAction: 'auto' }}
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationPicker />
                <RecenterMap />
              </MapContainer>
            </div>
          </div>

          {/* Selected location */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Selected Location:</label>
            <textarea
              name="location"
              value={donation.location}
              readOnly
              rows="2"
              placeholder="No location selected"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 text-sm sm:text-base resize-none"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Availability:</label>
            <select
              name="availability"
              value={donation.availability}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all appearance-none bg-white cursor-pointer"
            >
              <option value="Yes">Available</option>
              <option value="No">Not Available</option>
            </select>
          </div>

          {/* Submit */}
          <button
            onClick={handleDonate}
            className="w-full bg-red-600 text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-red-700 active:bg-red-800 transition-all duration-200 mt-2 sm:mt-4 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Submit Donation Info
          </button>

          <div className="mt-2">
            <BackButton onClick={() => navigate("/button-page")} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donate;
