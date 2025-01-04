import React from 'react'
import VehicleReminderForm from '../../components/ui/VehicleReminderForm'

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <VehicleReminderForm apiKey={process.env.GOOGLE_PLACE_API_KEY}/>
    </div>
  )
}
