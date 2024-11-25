// app/api/telegram/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    return `BR-${year}${month}${day}-${random}`;
}

export async function POST(request) {
    const env = 'DEV';
    const TOKEN = process.env['TOKEN_BEREG_' + `${env}`];
    const CHATID = process.env['CHATID_BEREG_' + `${env}`];

    // Установка CORS заголовков
    const headersList = headers();
    const origin = headersList.get('origin') || '*';

    // Получаем данные из запроса
    const body = await request.json();

    if (body.name && body.phone) {
        const orderNumber = generateOrderNumber();

        let txt = '';

        txt += `<b>Номер заказа: </b> <u>${orderNumber}</u>\n`;
        txt += `<b>Фамилия Имя: </b> <u>${body.name}</u>\n`;
        txt += `<b>Телефон: </b> <u>${body.phone}</u>\n`;

        if(body.size) {
            txt += `<b>Размер: </b> <u>${body.size}</u>\n`;
        }


        try {
            const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHATID}&text=${encodeURIComponent(txt)}&parse_mode=HTML`;

            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Telegram API error: ${response.status} ${response.statusText}`);
                return NextResponse.json(
                    { message: 'Oh, snap...something went wrong.' },
                    {
                        status: 500,
                        headers: {
                            'Access-Control-Allow-Origin': origin,
                            'Access-Control-Allow-Methods': 'POST',
                            'Access-Control-Allow-Headers': 'Content-Type',
                        }
                    }
                );
            }

            const data = await response.json();

            return NextResponse.json(
                { success: data.ok, orderNumber: orderNumber },
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': origin,
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    }
                }
            );

        } catch (error) {
            console.error('Telegram API error:', error);
            return NextResponse.json(
                { success: false, message: 'Oh, snap...something went wrong.' },
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': origin,
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    }
                }
            );
        }
    } else {
        return NextResponse.json(
            { success: false, message: 'ERROR!' },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': origin,
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            }
        );
    }
}

// Обработка OPTIONS запросов для CORS
export async function OPTIONS(request) {
    const headersList = headers();
    const origin = headersList.get('origin') || '*';

    return NextResponse.json(
        {},
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        }
    );
}
