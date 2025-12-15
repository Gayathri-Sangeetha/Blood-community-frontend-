import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RequesterDetails = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [donorDetails, setDonorDetails] = useState([]);

  useEffect(() => {
    const req = JSON.parse(localStorage.getItem("requests")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Match donor details
    const mapped = req.map((r) => {
      const donor = users.find((u) => u.email === r.donorEmail);
      return {
        ...r,
        donorName: donor?.donation?.name || "Unknown Donor",
        donorBlood: donor?.donation?.blood || "-",
        donorPhone: donor?.phone || "",
        donorStatus: r.status || "Pending", // default no response
      };
    });

    setRequests(mapped);
    setDonorDetails(users);
  }, []);

  const handleViewContact = (index) => {
    const updated = [...requests];
    updated[index].showContact = true;
    setRequests(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
      
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-white text-red-600 px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
      >
        ⬅ Back
      </button>

      <h2 className="text-3xl font-bold text-red-600 mb-6 mt-10">
        Your Blood Requests
      </h2>

      <div className="w-full max-w-2xl space-y-5">
        {requests.length === 0 ? (
          <p className="text-center text-gray-700 font-medium">
            No requests made yet.
          </p>
        ) : (
          requests.map((req, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-lg border border-red-400"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-gray-900">
                    {req.donorName}
                  </p>
                  <p className="text-sm text-gray-600">Blood Group: {req.donorBlood}</p>
                </div>

                <span
                  className={`px-4 py-1 text-sm rounded-full font-semibold ${
                    req.donorStatus === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : req.donorStatus === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {req.donorStatus}
                </span>
              </div>

              <div className="mt-3 text-gray-700">
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Units Requested:</strong> {req.units}</p>
              </div>

              {/* Show Contact Only if Accepted */}
              {req.donorStatus === "Accepted" ? (
                req.showContact ? (
                  <p className="mt-4 bg-green-50 text-green-800 p-3 rounded-xl font-semibold">
                    Donor Contact: {req.donorPhone}
                  </p>
                ) : (
                  <button
                    onClick={() => handleViewContact(index)}
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                  >
                    View Contact
                  </button>
                )
              ) : (
                <p className="mt-4 bg-yellow-100 text-yellow-700 p-3 rounded-xl font-medium text-center">
                  Donor has not accepted yet.
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequesterDetails;
