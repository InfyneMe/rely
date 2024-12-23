import EventTicket from '../../../utils/GoogleWallet';

export async function POST(request) {
    try {
        if(request.length == 0) return{ status: 400, body: {error: 'Request body is required'}};
        const passDate = request.body;
        const eventTicket = new EventTicket();
        const cretePass = await eventTicket.createClass(passDate);
        return new Response(JSON.stringify({ cretePass }), { status: 200 , headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return {
            status: 500,
            body: {
                error: error.message
            }
        }
        
    }
}