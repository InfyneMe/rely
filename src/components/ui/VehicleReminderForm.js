'use client';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Car, Bell, MapPin } from "lucide-react";
import LoadingSpinner from './Loading';
import RideRequestForm from './RideRequestForm';

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
  const [createAlert, setCreateAlert] = useState(false);
  const autoCompleteRef = useRef(null);
  const reminderTypes = [
    'Service Due',
    'Insurance Renewal',
    'Pollution Check',
    'Registration Renewal',
    'Tire Rotation',
    'Oil Change'
  ];
  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is required');
      return;
    }

    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      initializeGooglePlaces();
    } else {
      const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');

      // If the script is not already loaded, load it
      if (!existingScript) {
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

    // setIsLoading(true);
    try {
      const response = await autoCompleteRef.current.getPlacePredictions({
        input: value,
      });
      setPredictions(response.predictions || []);
    } catch (error) {
      setPredictions([]);
      setError('Failed to fetch location predictions', error.message);
    }
    // setIsLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!formData.vehicleNumber || !formData.reminderType || !formData.reminderDateTime || !selectedPlace) {
      alert("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const saveAlert = await axios.post('/api/alerts', {
        ...formData,
        location: selectedPlace,
      });

      const data = saveAlert.data;
      if (data.status === true) {
        setIsLoading(false);
        setCreateAlert(true);
        const response = await axios.get('/api/getAlerts');
        setFormData({
          vehicleNumber: '',
          reminderType: '',
          reminderDateTime: '',
        });
        setSelectedPlace(null);
        setSearchValue('');

        setTimeout(() => {
          if (response) {
            alert("Alert Created Successfully!");
          }
          setCreateAlert(false)
        }, 2000);

      }
    } catch (error) {
      console.error("Error saving alert:", error.response?.data || error.message);
      alert("Failed to save alert. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      {error && <p className="text-red-500">{error}</p>}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-900 mb-6">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Relx</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 font-medium mb-4">
          Your trusted platform for managing vehicle maintenance reminders.
        </p>
        <p className="text-sm sm:text-base text-gray-500">
          Stay on top of your vehicles needs with easy-to-use reminders, and never miss an important service or checkup again.
        </p>
        {isLoading && <LoadingSpinner message="Creating Alert, Please Wait..." />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: Form Section */}
        <div className="flex flex-col bg-white border border-purple-700 rounded-3xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vehicle Reminder System
            </h1>
            <p className="text-gray-600 mt-2">Set up your vehicle maintenance reminders</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Vehicle Number */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Car className="w-5 h-5 mr-2 text-blue-500" />
                  Vehicle Number
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  placeholder="Enter vehicle number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Reminder Type */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Bell className="w-5 h-5 mr-2 text-blue-500" />
                  Reminder Type
                </label>
                <select
                  value={formData.reminderType}
                  onChange={(e) => setFormData({ ...formData, reminderType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">Select reminder type</option>
                  {reminderTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* DateTime */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Reminder Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.reminderDateTime}
                  onChange={(e) => setFormData({ ...formData, reminderDateTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Location Search */}
              <div className="space-y-3 relative">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  Service Location
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={isApiLoaded ? "Search for a location" : "Loading Google Maps..."}
                  disabled={!isApiLoaded}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                {/* Dropdown */}
                {predictions.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-auto">
                    {predictions.map((prediction) => (
                      <div
                        key={prediction.place_id}
                        onClick={() => handlePlaceSelect(prediction.place_id)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        {prediction.description}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Alert Message */}
            {createAlert && (
              <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>Alert Created Successfully!</strong>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Set Reminder
            </button>
          </form>
        </div>

        {/* Right: Alerts Section */}
        <div className="flex flex-col bg-white border border-purple-700 rounded-3xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Book Your Next Ride
            </h1>
            <p className="text-gray-600 mt-2">Plan your trips effortlessly and ensure timely vehicle maintenance.</p>
          </div>
          <RideRequestForm />
        </div>
        {/* Testimonial Section */}
        <div className="flex flex-col bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl text-white font-semibold mb-4">What Our Users Say</h2>
          <p className="text-lg text-white mb-6">
            Relx has completely transformed how I manage my vehicle maintenance. I never forget an oil change or tire check anymore!
          </p>
          <p className="text-sm text-white italic">- John D., Happy Customer</p>
        </div>


        <div className="flex flex-col bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl text-white font-semibold mb-4">What Our Users Say</h2>
          <p className="text-lg text-white mb-6">
            Relx has completely transformed how I manage my vehicle maintenance. I never forget an oil change or tire check anymore!
          </p>
          <p className="text-sm text-white italic">- John D., Happy Customer</p>
        </div>
        {/* <Testimonial /> */}
      </div>
    </div>
  );
};

export default VehicleReminderForm;
