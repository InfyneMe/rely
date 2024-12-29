import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://lqw6nj.api.infobip.com/whatsapp/1/message/template';
  const headers = {
    Authorization: 'App b72bad9fc2cd9b5d55292efcb032cf93-a30bbe47-6089-414c-aaef-6d27ee797d19',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const body = JSON.stringify({
    messages: [
      {
        from: '916003580036',
        to: '447860099299',
        messageId: '0ca6ae5d-096a-49af-8954-6bb3dff5a',
        content: {
          templateName: 'test_whatsapp_template_en',
          templateData: {
            body: {
              placeholders: ['This is test msg'],
            },
          },
          language: 'en',
        },
      },
    ],
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error sending WhatsApp template:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
