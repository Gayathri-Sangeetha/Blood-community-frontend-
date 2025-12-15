import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DonateDetails = () => {
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [donation, setDonation] = useState({
    name: "",
    number: "",
    blood: "",
    availability: "Yes",
    location: "",
    lat: 17.3850,
    lng: 78.4867,
  });

  // Load user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    setStoredUser(user);

    const userDonation = user.donation || {};

    setDonation({
      name: userDonation.name || "",
      number: userDonation.number || "",
      blood: userDonation.blood || "",
      availability: userDonation.availability || "Yes",
      location: userDonation.location || "",
      lat: userDonation.lat || 17.3850,
      lng: userDonation.lng || 78.4867,
    });

    setLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation((prev) => ({ ...prev, [name]: value }));
  };

  // 🔍 Search location with button
  const handleSearchLocation = async () => {
    if (!search.trim()) {
      alert("Please enter a location to search");
      return;
    }

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
      setSearch(""); // Clear search after successful location found
    } else {
      alert("Location not found! Please try a different search term.");
    }
  };

  // Move map programmatically with animation
  function MapMover({ lat, lng }) {
    const map = useMap();
    
    useEffect(() => {
      if (lat && lng) {
        map.flyTo([lat, lng], 14, {
          duration: 1.5
        });
      }
    }, [lat, lng, map]);
    
    return null;
  }

  // 📍 Map click location picker with mobile support
  function LocationPicker() {
    const map = useMap();

    useEffect(() => {
      // Enable tap on mobile
      map.tap?.enable();
      
      // Fix for mobile touch
      const container = map.getContainer();
      container.style.touchAction = 'pan-y pinch-zoom';
      
      return () => {
        map.tap?.disable();
      };
    }, [map]);

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        setDonation((prev) => ({
          ...prev,
          lat,
          lng,
          location: "Fetching address...",
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

    return <Marker position={[donation.lat, donation.lng]} />;
  }

  const handleSave = () => {
    if (!donation.name || !donation.number || !donation.blood || !donation.location) {
      alert("Please fill all required fields!");
      return;
    }

    const updatedUser = {
      ...storedUser,
      donation: { ...donation },
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // update all users list
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setStoredUser(updatedUser);
    setIsEditing(false);
    alert("Details updated successfully!");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-white text-lg sm:text-xl bg-red-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-600 flex justify-center items-center px-3 sm:px-4 py-4 sm:py-8">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-2xl shadow-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-4 sm:mb-6 text-center">
          Donor Details
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
              disabled={!isEditing}
              placeholder="Enter your name"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Phone Number:</label>
            <input
              type="tel"
              name="number"
              value={donation.number}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter phone number"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Blood Group:</label>
            <select
              name="blood"
              value={donation.blood}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all appearance-none bg-white cursor-pointer"
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

          {/* Availability */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Availability:</label>
            <select
              name="availability"
              value={donation.availability}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:outline-none text-sm sm:text-base transition-all appearance-none bg-white cursor-pointer"
            >
              <option value="Yes">Available</option>
              <option value="No">Not Available</option>
            </select>
          </div>

          {/* Location Text - Always visible */}
          <div>
            <label className="font-semibold text-sm sm:text-base block mb-1.5">Selected Location:</label>
            <textarea
              value={donation.location || "No location set"}
              readOnly
              rows="2"
              placeholder="No location selected"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 text-sm sm:text-base resize-none"
            />
          </div>

          {/* 🔍 Search Bar with Button - Only when editing */}
          {isEditing && (
            <div>
              <label className="font-semibold text-sm sm:text-base block mb-1.5">
                Search Location:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter city or place..."
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
          )}

          {/* MAP WHEN EDITING */}
          {isEditing && (
            <div className="mt-2">
              <label className="font-semibold text-sm sm:text-base block mb-1.5">
                Pick Location on Map:
              </label>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Tap anywhere on the map to select your precise location
              </p>
              <div className="h-64 sm:h-72 md:h-80 lg:h-96 w-full rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                <MapContainer
                  center={[donation.lat, donation.lng]}
                  zoom={13}
                  scrollWheelZoom={false}
                  doubleClickZoom={true}
                  touchZoom={true}
                  dragging={true}
                  tap={true}
                  className="h-full w-full"
                  style={{ 
                    touchAction: 'none',
                    cursor: 'pointer'
                  }}
                  zoomControl={true}
                >
                  <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapMover lat={donation.lat} lng={donation.lng} />
                  <LocationPicker />
                </MapContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Use two fingers to zoom in/out on mobile
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-2 sm:mt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Edit Details
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-green-700 active:bg-green-800 transition-all duration-200 font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Save Changes
              </button>
            )}
          </div>

          <div className="mt-2">
            <BackButton to="/button-page" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateDetails;