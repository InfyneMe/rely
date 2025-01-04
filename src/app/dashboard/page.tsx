import React from 'react'
import VehicleReminderForm from '../../components/ui/VehicleReminderForm'

export default function page() {
  return (
    <div className="">
      <VehicleReminderForm apiKey={process.env.GOOGLE_PLACE_API_KEY}/>
    </div>
  )
}
