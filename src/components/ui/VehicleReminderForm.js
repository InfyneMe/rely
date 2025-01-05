'use client';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Car, Bell, MapPin} from "lucide-react";
import LoadingSpinner from './Loading';

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
  console.log(error)
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

    // setIsLoading(true);
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
    setIsLoading(true)
    const saveAlert = await axios.post('/api/alerts', {
      ...formData,
      location: selectedPlace
    });
    const data = await saveAlert.data
    console.log('resData:',data)
    if(data.status === true){
      setIsLoading(false)
      setCreateAlert(true)
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {isLoading && <LoadingSpinner message="Creating Alert Please Wait" /> }
        {/* Header Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
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

                    {createAlert && (
                      <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Alert Created Successfully</span>
                        </p>
                      </div>
                    )}
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
          {/* Right: Alerts Section */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Alerts</h2>

            {/* Card 1 */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-gray-50 hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">Vehicle ABC123</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Reminder Type:</strong> Service Due
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Reminder Date & Time:</strong> 2025-01-06 10:00 AM
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 bg-gray-50 hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">Vehicle XYZ456</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Reminder Type:</strong> Insurance Renewal
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Reminder Date & Time:</strong> 2025-01-10 03:00 PM
                </p>
              </div>
            </div>

            {/* View More Button */}
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl 
                        hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium 
                        shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View More
            </button>
          </div>


        </div>
    </div>
  );
};

export default VehicleReminderForm;
