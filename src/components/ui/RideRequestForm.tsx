"use client";
import React, { useState } from "react";

interface RideRequestFormProps {
  onSubmit?: (data: {
    startFrom: string;
    endsAt: string;
    vehicleType: string;
    dateTime: string;
  }) => void;
}

const RideRequestForm: React.FC<RideRequestFormProps> = ({ onSubmit }) => {
  const [startFrom, setStartFrom] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [vehicleType, setVehicleType] = useState("Auto");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ startFrom, endsAt, vehicleType, dateTime });
    }
    // Reset form to default values
    setStartFrom("");
    setEndsAt("");
    setVehicleType("Auto");
    setDateTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Location Inputs */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Start Location
          </label>
          <input
            type="text"
            value={startFrom}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartFrom(e.target.value)
            }
            placeholder="Enter start location"
            className="w-full px-4 py-3 rounded-xl border border-gray-200
              bg-gray-100 text-gray-800 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
              transition-all duration-300 ease-in-out 
              hover:bg-white hover:shadow-lg"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Destination Location
          </label>
          <input
            type="text"
            value={endsAt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndsAt(e.target.value)
            }
            placeholder="Enter destination location"
            className="w-full px-4 py-3 rounded-xl border border-gray-200
              bg-gray-100 text-gray-800 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
              transition-all duration-300 ease-in-out 
              hover:bg-white hover:shadow-lg"
          />
        </div>

        {/* Vehicle Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200
              bg-gray-100 text-gray-800 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
              transition-all duration-300 ease-in-out 
              hover:bg-white hover:shadow-lg"
          >
            {["Auto", "Toto", "Taxi", "Car"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* DateTime Picker */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200
              bg-gray-100 text-gray-800 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
              transition-all duration-300 ease-in-out 
              hover:bg-white hover:shadow-lg"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
          py-3 px-6 rounded-xl 
          hover:from-blue-700 hover:to-purple-700 
          focus:ring-4 focus:ring-blue-500/50
          transition-all duration-300"
      >
        Submit Ride Request
      </button>
    </form>
  );
};

export default RideRequestForm;
