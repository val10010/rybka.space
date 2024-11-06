// app/api/telegram/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request) {
    const env = 'DEV';
    const TOKEN = process.env['TOKEN_BEREG_' + `${env}`];
    const CHATID = process.env['CHATID_BEREG_' + `${env}`];

    // Установка CORS заголовков
    const headersList = headers();
    const origin = headersList.get('origin') || '*';

    // Получаем данные из запроса
    const body = await request.json();

    if (body.name && body.phone && body.formName) {
        let txt = '';

        txt += `<b>Название формы: </b> <u>${body.formName}</u>\n`;

        if (body.price) {
            txt += `<b>Цена услги:</b> <u>${body.price}</u>\n`;
        }

        txt += `<b>Фамилия Имя: </b> <u>${body.name}</u>\n`;
        txt += `<b>Телефон или никнейм месенджера: </b> <u>${body.phone}</u>\n`;

        console.log(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHATID}&text=${encodeURIComponent(txt)}&parse_mode=HTML`, 123123123)
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
                { success: data.ok },
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
    } else {
        return NextResponse.json(
            { message: 'ERROR!' },
            {
                status: 400,
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
