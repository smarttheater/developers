const { CLIENT_ID, CLIENT_SECRET, AUTHORIZATION_SERVER_DOMAIN, ACCESS_TOKEN } = require('./setting');

async function getAcccesToken(grantType) {
    if (grantType === 'client_credentials') {
        try {
            const secret = Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET, 'utf8')
                .toString('base64');;
            const response = await fetch(`https://${AUTHORIZATION_SERVER_DOMAIN}/oauth2/token`,
                {
                    credentials: 'include',
                    body: `grant_type=client_credentials&client_id=${CLIENT_ID}`,
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

    if (grantType === 'authorization_code') {
        return {
            access_token: ACCESS_TOKEN
        };
    }

    throw new Error('Invalid grantType');

}

exports.getAcccesToken = getAcccesToken;