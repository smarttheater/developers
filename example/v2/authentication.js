// const fetch = require('node-fetch');

async function getAcccesToken() {
    try {
        const secret = Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET, 'utf8')
            .toString('base64');;
        const response = await fetch(`https://${process.env.AUTHORIZATION_SERVER_DOMAIN}/oauth2/token`,
            {
                credentials: 'include',
                body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}`,
                method: 'POST',
                headers: {
                    Authorization: `Basic ${secret}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.getAcccesToken = getAcccesToken;