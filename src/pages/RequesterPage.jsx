import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RequestPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const [requestForm, setRequestForm] = useState({
    blood: "",
    location: "",
    units: "",
  });

  const [mapPosition, setMapPosition] = useState([11.0168, 76.9558]); // Default Coimbatore
  const [markerPosition, setMarkerPosition] = useState([11.0168, 76.9558]);

  // Load donors
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const available = users.filter((u) => u.donation?.availability === "Yes");
    setDonors(available);
    setFilteredDonors(available);
  }, []);

  // Filter donors by blood group
  const handleSearchBlood = (e) => {
    const value = e.target.value.trim();
    setSearch(value);

    if (value === "") {
      setFilteredDonors(donors);
      return;
    }

    const results = donors.filter(
      (d) => d.donation?.blood?.toUpperCase() === value.toUpperCase()
    );
    setFilteredDonors(results);
  };

  const handleRequestClick = (donor) => {
    setSelectedDonor(donor);
    setRequestForm({
      blood: donor.donation.blood,
      location: "",
      units: "",
    });
    setMapPosition([11.0168, 76.9558]);
    setMarkerPosition([11.0168, 76.9558]);
  };

  const handleChange = (e) => {
    setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!requestForm.location) {
      alert("Please select a location!");
      return;
    }

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push({ ...requestForm, donorEmail: selectedDonor.email });
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Request submitted successfully!");
    setSelectedDonor(null);
  };

  // Search location by name using Nominatim
  const handleLocationSearch = async () => {
    if (!requestForm.location.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          requestForm.location
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setMapPosition([lat, lon]);
        setMarkerPosition([lat, lon]);
        setRequestForm({ ...requestForm, location: data[0].display_name });
      } else {
        alert("Location not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching location");
    }
  };

  // Map click component
  const LocationPicker = ({ setLocation }) => {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setMarkerPosition([lat, lon]);

        // Reverse geocode to get human-readable address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          if (data.display_name) {
            setLocation(data.display_name);
          } else {
            setLocation(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
          }
        } catch (err) {
          console.error(err);
          setLocation(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
        }
      },
    });
    return <Marker position={markerPosition}></Marker>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-4 sm:p-6 lg:p-8 flex flex-col items-center relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white text-red-600 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold z-10"
      >
        ⬅ Back
      </button>

      {/* Header Section */}
      <div className="text-center mb-8 mt-12 sm:mt-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
          Find Blood Donors
        </h2>
        <p className="text-red-100 text-sm sm:text-base">Connect with available donors in your area</p>
      </div>

      {/* Blood Group Filter */}
      <div className="w-full max-w-md mb-8">
        <label className="block text-white font-semibold mb-2 text-sm">Filter by Blood Group</label>
        <select
          value={search}
          onChange={handleSearchBlood}
          className="w-full p-4 rounded-2xl bg-white shadow-xl border-2 border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-200 outline-none transition-all text-gray-800 font-medium cursor-pointer"
        >
          <option value="">🩸 All Blood Groups</option>
          {bloodGroups.map((bg, index) => (
            <option key={index} value={bg}>
              {bg}
            </option>
          ))}
        </select>
      </div>

      {/* Donor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-2">
        {filteredDonors.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 inline-block">
              <p className="text-white text-lg font-semibold">No donors found</p>
              <p className="text-red-100 text-sm mt-2">Try selecting a different blood group</p>
            </div>
          </div>
        ) : (
          filteredDonors.map((donor, index) => {
            const name = donor.donation.name || "Unknown";
            const blood = donor.donation.blood;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between hover:scale-105 hover:shadow-3xl transition-all duration-300 border-2 border-red-100"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white font-bold flex items-center justify-center text-2xl shadow-lg ring-4 ring-red-100">
                  {name.charAt(0).toUpperCase()}
                </div>
                <p className="mt-4 text-lg font-bold text-gray-800 text-center">{name}</p>
                <span className="mt-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-base font-bold shadow-lg">
                  {blood}
                </span>
                <button
                  onClick={() => handleRequestClick(donor)}
                  className="mt-5 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl text-base font-bold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Request Blood
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Request Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4 z-50 overflow-y-auto py-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl w-full max-w-2xl shadow-2xl my-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
                Request Blood
              </h3>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white font-bold flex items-center justify-center text-lg shadow-lg">
                  {selectedDonor.donation.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-800">
                    {selectedDonor.donation.name}
                  </h4>
                  <span className="text-sm text-red-600 font-semibold">
                    Blood Group: {selectedDonor.donation.blood}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitRequest} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Blood Group Needed</label>
                <select
                  name="blood"
                  value={requestForm.blood}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  required
                >
                  {bloodGroups.map((bg, index) => (
                    <option key={index} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Search */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Location</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="location"
                    value={requestForm.location}
                    placeholder="Search or click map to select location"
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, location: e.target.value })
                    }
                    className="flex-1 border-2 border-gray-300 p-3 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleLocationSearch}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
                <MapContainer
                  center={mapPosition}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <LocationPicker setLocation={(loc) => setRequestForm({ ...requestForm, location: loc })} />
                </MapContainer>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Units Needed</label>
                <input
                  type="number"
                  name="units"
                  placeholder="Enter number of units"
                  value={requestForm.units}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                  min={1}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all text-base font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Submit Request
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDonor(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestPage;