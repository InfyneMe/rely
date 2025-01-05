'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the type for an alert
interface Alert {
  _id: string;
  a_v_id: string;
  a_type: string;
  a_end_date: string;
  a_pass_link: string;
}

function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]); // Use the Alert[] type for the alerts array
  const [currentPage, setCurrentPage] = useState<number>(1); // Explicitly define the type as number
  const [alertsPerPage] = useState<number>(10); // Explicitly define the type as number

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get<Alert[]>("/api/getAlerts"); // Specify the type of the response data
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  // Get current alerts for pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); // Ensure pageNumber is of type number

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Alerts Dashboard
      </h1>

      {/* Alerts Table */}
      <div className="overflow-x-auto bg-white border border-purple-700 shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Vehicle ID</th>
              <th className="px-6 py-3">Reminder Type</th>
              <th className="px-6 py-3">Reminder Date & Time</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAlerts.map((alert) => (
              <tr key={alert._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{alert.a_v_id}</td>
                <td className="px-6 py-4">{alert.a_type}</td>
                <td className="px-6 py-4">{alert.a_end_date}</td>
                <td className="px-6 py-4">
                  <a
                    href={alert.a_pass_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Pass
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from(
          { length: Math.ceil(alerts.length / alertsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-purple-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default AlertsPage;
