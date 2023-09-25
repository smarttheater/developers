const { API_ENDPOINT } = require('./setting');

class Request {
    acccesToken;

    setOptions(params) {
        this.acccesToken = params.acccesToken;
    }

    async get(url, params) {
        console.log('Request get', `${API_ENDPOINT}/${url}`, params);
        const query = new URLSearchParams(params);
        try {
            const response = await fetch(`${API_ENDPOINT}/${url}?${query}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.acccesToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                let body;
                try {
                    body = await response.json();
                } catch (error) {
                    console.log(error);
                }
                throw new Error(
                    JSON.stringify({
                        status: response.status,
                        statusText: response.statusText,
                        body
                    })
                );
            }
            try {
                const result = await response.json();
                return result;
            } catch (error) {
                return;
            }
        } catch (error) {
            throw error;
        }
    }

    async post(url, body) {
        console.log('Request post', `${API_ENDPOINT}/${url}`, body);
        try {
            const response = await fetch(`${API_ENDPOINT}/${url}`,
                {
                    body: JSON.stringify(body),
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${this.acccesToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                let body;
                try {
                    body = await response.json();
                } catch (error) {
                    console.log(error);
                }
                throw new Error(
                    JSON.stringify({
                        status: response.status,
                        statusText: response.statusText,
                        body
                    })
                );
            }
            try {
                const result = await response.json();
                return result;
            } catch (error) {
                return;
            }
        } catch (error) {
            throw error;
        }
    }

    async put(url, body) {
        console.log('Request put', `${API_ENDPOINT}/${url}`, body);
        try {
            const response = await fetch(`${API_ENDPOINT}/${url}`,
                {
                    body: JSON.stringify(body),
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${this.acccesToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                let body;
                try {
                    body = await response.json();
                } catch (error) {
                    console.log(error);
                }
                throw new Error(
                    JSON.stringify({
                        status: response.status,
                        statusText: response.statusText,
                        body,
                    })
                );
            }
            try {
                const result = await response.json();
                return result;
            } catch (error) {
                return;
            }
        } catch (error) {
            throw error;
        }
    }
}

exports.Request = Request;