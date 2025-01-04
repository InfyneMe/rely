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
    async createClass(vehicleNumber, selectedOption, reminderDate, user) {
        try {
            const issuerID = "3388000000022802937";
            const classSuffix = uuidv4(); // Ensure uuidv4 is imported or available
    
            const newClass = {
                id: `${issuerID}.${classSuffix}`,
                issuerName: 'Relyx',
                reviewStatus: 'UNDER_REVIEW',
                eventName: {
                    defaultValue: {
                        language: 'en-US',
                        value: selectedOption,
                    }
                }
            };
    
            const newObject = {
                id: `${issuerID}.${classSuffix}`,
                classId: `${issuerID}.${classSuffix}`,
                state: 'ACTIVE',
                ticketHolderName: user.name,
                ticketNumber: '2344323',
                location: {
                    latitude: 37.7749,  // Example: Latitude of San Francisco
                    longitude: -122.4194, // Example: Longitude of San Francisco
                    name: 'Event Location Name',
                    address: '123 Main Street, San Francisco, CA',
                },
                dateAndTime: {
                    startDate: '2025-01-15T10:00:00Z', // ISO 8601 format for start date and time
                    endDate: '2025-01-15T12:00:00Z', // ISO 8601 format for end date and time
                    timezone: 'America/Los_Angeles', // Timezone information
                },
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