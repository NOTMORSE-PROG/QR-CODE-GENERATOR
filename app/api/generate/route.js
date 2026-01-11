import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (text.length > 2000) {
      return NextResponse.json(
        { error: 'Text is too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    // Generate QR code as data URL
    const qrCode = await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    });

    return NextResponse.json({ qrCode });
  } catch (error) {
    console.error('QR generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
