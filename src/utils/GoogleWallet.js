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
    async createClass() {
        try {
            const issuerID = "3388000000022802937";
            const classSuffix = uuidv4(); // Ensure uuidv4 is imported or available
            const eventName = "Sample Event"; // Define eventName or pass it as an argument
    
            const newClass = {
                id: `${issuerID}.${classSuffix}`,
                issuerName: 'Relyx',
                reviewStatus: 'UNDER_REVIEW',
                eventName: {
                    defaultValue: {
                        language: 'en-US',
                        value: eventName,
                    }
                }
            };
    
            const newObject = {
                id: `${issuerID}.${classSuffix}`,
                classId: `${issuerID}.${classSuffix}`,
                state: 'ACTIVE',
                heroImage: {
                    sourceUri: {
                        uri: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&h=336'
                    },
                    contentDescription: {
                        defaultValue: {
                            language: 'en-US',
                            value: "Created By Relx"
                        },
                    },
                },
                barcode: {
                    type: 'QR_CODE',
                    value: 'QR code'
                },
                ticketHolderName: 'Ticket holder name',
                ticketNumber: '2344323'
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