"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Wallet, Save, Calendar } from "lucide-react";
import React, { useState } from "react";
import LoadingSpinner from "@/components/ui/Loading";
interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface GooglePlacesResponse {
  predictions: PlacePrediction[];
  status: string;
}

export default function PlaceholdersAndVanishInputDemo() {
  const reminderType = [
    "Driving Licence Expiry",
    "Fitness Expiry",
    "RC Expiry",
    "Pollution Certificate Expiry",
    "Permit Expiry",
    "Insurance Expiry",
  ];
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [isVehicleNumber, setIsVehicleNumber] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(reminderType);
  const [selectedOption, setSelectedOption] = useState("");
  const [reminderInput, setReminderInput] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [passLink, setPassLink] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);

  console.log(isVehicleNumber)
  const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleNumber(e.target.value);
    setIsVehicleNumber(true);
  };

  const handleReminderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReminderInput(value);
    setFilteredOptions(reminderType);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setReminderInput(option);
    setFilteredOptions([]);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReminderDate(e.target.value);
  };

  const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setLocation(userInput);
  
    if (userInput.trim() === '') {
      setSuggestions([]);
      return;
    }
  
    try {
      const response = await fetch(`/api/place?input=${encodeURIComponent(userInput)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: GooglePlacesResponse = await response.json();
      
      if (data.status === 'OK') {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };
  const createGooglePass = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch("/api/createPass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleNumber,
          selectedOption,
          reminderDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create pass");
      }

      const data = await response.json();
      setPassLink(data.cretePass);
    } catch (error) {
      console.error("Error creating Google Pass:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setVehicleNumber("");
        setReminderInput("");
        setReminderDate("");
      }, 1000);
    }
  };
  const sendWhatsAppMsg = async() => {
    try {
      const response = await fetch('/api/whatsapp');
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const word = [
    {
      text: "Welcome to ",
    },
    {
      text: "Relyx!",
      color: "text-blue-500 dark:text-blue-500",
    },
  ];
  const sharedButtonClasses ="px-6 py-2 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-offset-1 focus:outline-none flex items-center space-x-2";
  const disabledClasses = "bg-sky-300 cursor-not-allowed";
  const enabledClasses = "bg-sky-500 hover:bg-gray-600 focus:ring-gray-400";

  return (
    //relyx div
    <div className="h-[30rem] flex flex-col justify-center items-center px-4">
      {loading && <LoadingSpinner />}
      <TypewriterEffectSmooth
        words={word.map((item) => ({
          ...item,
          className: item.color || "text-black",
        }))}
      />
      <div className="flex mt-4 flex-col items-center w-full">
        <input
          id="inputField"
          type="text"
          value={vehicleNumber}
          onChange={handleFirstInputChange}
          placeholder="Enter your vehicle number"
          className="w-[40rem] px-4 mt-5 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <input
            id="inputField2"
            type="text"
            value={reminderInput}
            onChange={handleReminderInputChange}
            placeholder="Select Reminder Type"
            className="w-[40rem] px-4 mt-5 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <div className="relative w-96">
          {reminderInput && filteredOptions.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-600 divide-y divide-gray-700">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-300 hover:bg-sky-500 hover:text-white focus:bg-sky-500 focus:text-white transition-colors cursor-pointer whitespace-nowrap rounded-lg"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative flex mt-5 items-center justify-between w-[40rem]">
          <input
            type="date"
            value={reminderDate}
            onChange={handleDateChange}
            className="w-[19rem] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <div className="relative w-[19rem]"> {/* Add this wrapper div */}
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Nearby DTO Location"
              onBlur={() => {setTimeout(() => setSuggestions([]), 200)}}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setLocation(suggestion.description);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
          <div className="flex ml-4 space-x-4 mt-5">
              <a
                href={passLink || undefined}
                target={passLink ? "_blank" : undefined}
                rel={passLink ? "noopener noreferrer" : undefined}
                className={`${sharedButtonClasses} ${
                  passLink ? enabledClasses : disabledClasses
                }`}
                onClick={(e) => {
                  if (!passLink) e.preventDefault();
                }}
              >
                <Wallet className="h-5 w-5" />
                <span>View Pass</span>
              </a>

              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:outline-none flex items-center space-x-2"
                onClick={createGooglePass}
              >
                <Save className="h-5 w-5" />
                <span>Save Alert</span>
              </button>
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:outline-none flex items-center space-x-2"
                onClick={sendWhatsAppMsg}
              >
                <Calendar className="h-5 w-5" />
                <span>Send Whatsapp</span>
              </button>
          </div>
      </div>
    </div>
  );
}
