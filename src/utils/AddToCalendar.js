import { google } from 'googleapis';

export default class AddToCalendar {
    constructor(accessToken, refreshToken, clientId, clientSecret){
        this.oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
        this.oAuth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        })
    }

    async addEvent(eventData) {
        const dateTime = new Date(eventData.startDate);
        const startDate = dateTime.toISOString();

        const eDate = new Date(eventData.startDate);
        eDate.setHours(eDate.getHours() + 2)

        const endDate = eDate.toISOString();

        const calendar = google.calendar({version: 'v3', auth: this.oAuth2Client});
        const event = {
            summary: eventData.summary,
            location: eventData.location,
            description: `Reminder from Relyx: ${eventData.summary} for vehicle number ${eventData.vehicle}.`,
            start:{
                'dateTime': startDate,
                'timeZone' : 'Asia/Kolkata',
            },
            'end': {
                'dateTime': endDate,
                'timeZone' : 'Asia/Kolkata',
            },
            'attendees': eventData.userEmail,
            'reminders': {
                'useDefault': false,
                'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 30},
                ],
            },
        }
        try {
            const response = await calendar.events.insert({
                calendarId: 'primary',
                resource: event,
            })
            return response.data 
        } catch (error) {
            throw error
        }
        
    }
}