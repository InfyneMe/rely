import { google } from 'googleapis';
import {v4 as uuidv4} from 'uuid';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export default class EventTicket {
    constructor(){
        this.keyFilePath = process.env.SERVICE_ACCOUNT_KEY;
        if(!this.keyFilePath){
            throw new Error('SERVICE_ACCOUNT_KEY is required');
        }
        const rawKeyDate = fs.readFileSync(path.resolve(this.keyFilePath), 'utf-8');
        this.credentials = JSON.parse(rawKeyDate);
    }
    auth(){
        const auth = new google.auth.GoogleAuth({
            keyFile: this.keyFilePath,
            scopes: ['https://www.googleapis.com/auth/wallet_object.issuer']
        });
        this.client = google.walletobjects({version: 'v1', auth});
    }
    async createClass(vehicleNumber, reminderType, reminderDateTime, location, user) {
        try {
            const issuerID = "3388000000022802937";
            const classSuffix = uuidv4(); // Ensure uuidv4 is imported or available
            
            const dateTime = new Date(reminderDateTime);
            dateTime.setHours(dateTime.getHours() + 2);
            const startDate = dateTime.toISOString();

            const endDate = new Date(dateTime);
            endDate.setHours(endDate.getHours() + 2);
            const endDateString = endDate.toISOString();

            const newClass = {
                id: `${issuerID}.${classSuffix}`,
                issuerName: 'Relyx',
                reviewStatus: 'UNDER_REVIEW',
                eventName: {
                    defaultValue: {
                        language: 'en-US',
                        value: reminderType,
                    }
                }
            };
    
            const newObject = {
                id: `${issuerID}.${classSuffix}`,
                classId: `${issuerID}.${classSuffix}`,
                state: 'ACTIVE',
                ticketHolderName: user.name,
                ticketNumber: '2344323',
                eventLocation: {
                    venueName: location.name,  // Check that location.name exists
                },
                startDateTime: {
                    dateTime: startDate, // Ensure startDate is a valid ISO string
                    timeZone: "Asia/Kolkata" // Correct timezone format (Asia/Kolkata instead of Assia/Kolkata)
                },
                endDateTime: {
                    dateTime: endDateString, // Ensure endDateString is a valid ISO string
                    timeZone: "America/New_York" // Correct timezone
                },
                location: {
                    latitude: location.lat,  // Check latitude
                    longitude: location.lng // Check longitude
                }
            };
            
            
    
            const claims = {
                iss: this.credentials.client_email,
                aud: 'google',
                origins: ['www.example.com'], // Update to your domain
                typ: 'savetowallet',
                payload: {
                    eventTicketClasses: [newClass],
                    eventTicketObjects: [newObject],
                },
            };
    
            const token = jwt.sign(claims, this.credentials.private_key, { algorithm: 'RS256' });
            return `https://pay.google.com/gp/v/save/${token}`;
        } catch (error) {
            console.error(error);
        }
    }
    
}