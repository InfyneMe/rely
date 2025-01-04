'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Car, Bell, MapPin } from "lucide-react";

const VehicleReminderForm = ({ apiKey }) => {
  // All existing state management and logic remains the same
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    reminderType: '',
    reminderDateTime: '',
  });

  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [error, setError] = useState('');
  const autoCompleteRef = useRef(null);
  console.log(error)
  const reminderTypes = [
    'Service Due',
    'Insurance Renewal',
    'Pollution Check',
    'Registration Renewal',
    'Tire Rotation',
    'Oil Change'
  ];

  // All existing useEffect and handler functions remain the same
  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is required');
      return;
    }

    if (window.google && window.google.maps) {
      initializeGooglePlaces();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGooglePlaces();
      script.onerror = () => setError('Failed to load Google Maps API');
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [apiKey]);

  const initializeGooglePlaces = () => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autoCompleteRef.current = new window.google.maps.places.AutocompleteService();
      setIsApiLoaded(true);
      setError('');
    }
  };

  const handleSearch = async (value) => {
    setSearchValue(value);
    if (!value || value.trim() === '' || !isApiLoaded) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await autoCompleteRef.current.getPlacePredictions({
        input: value,
      });
      setPredictions(response.predictions || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
      setError('Failed to fetch location predictions');
    }
    setIsLoading(false);
  };

  const handlePlaceSelect = async (placeId) => {
    if (!isApiLoaded) return;

    const placesService = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['formatted_address', 'geometry', 'name']
      },
      (place, status) => {
        if (status === 'OK') {
          const location = {
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.name
          };
          setSelectedPlace(location);
          setSearchValue(place.formatted_address);
          setPredictions([]);
        } else {
          setError('Failed to fetch place details');
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      location: selectedPlace
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Vehicle Reminder System
          </h1>
          <p className="text-gray-600 mt-2">Set up your vehicle maintenance reminders</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-lg backdrop-filter">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Two Fields in One Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Vehicle Number Section */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Car className="w-4 h-4 mr-2 text-blue-500" />
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                      placeholder="Enter vehicle number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                  </div>

                  {/* Reminder Type Section */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Bell className="w-4 h-4 mr-2 text-blue-500" />
                      Reminder Type
                    </label>
                    <select
                      value={formData.reminderType}
                      onChange={(e) => setFormData({...formData, reminderType: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select reminder type</option>
                      {reminderTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Two Fields in One Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* DateTime Section */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      Reminder Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.reminderDateTime}
                      onChange={(e) => setFormData({...formData, reminderDateTime: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                  </div>

                  {/* Location Search Section */}
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      Service Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={isApiLoaded ? "Search for a location" : "Loading Google Maps..."}
                        disabled={!isApiLoaded}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />

                      {isLoading && (
                        <div className="absolute right-3 top-3">
                          <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                        </div>
                      )}

                      {predictions.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-auto border border-gray-100">
                          {predictions.map((prediction) => (
                            <div
                              key={prediction.place_id}
                              onClick={() => handlePlaceSelect(prediction.place_id)}
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                            >
                              <p className="text-sm text-gray-700">{prediction.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedPlace && (
                  <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Selected Location:</span> {selectedPlace.address}
                    </p>
                    <div className="mt-2 text-xs text-gray-500 flex gap-4">
                      <span>Lat: {selectedPlace.lat}</span>
                      <span>Long: {selectedPlace.lng}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl 
                          hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium 
                          shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Set Reminder
                </button>
              </form>
            </div>
        </div>
    </div>
  );
};

export default VehicleReminderForm;
