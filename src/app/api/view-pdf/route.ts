import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return new Response('Missing URL parameter', { status: 400 });
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return new Response(`Failed to fetch PDF: ${response.statusText}`, { status: response.status });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline',
            },
        });
    } catch (error) {
        console.error('Error proxying PDF:', error);
        return new Response('Error loading PDF', { status: 500 });
    }
}
