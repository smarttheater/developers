// const fetch = require('node-fetch');

class Request {
    acccesToken;
    apiEndpoint;
    projectId;

    setOptions(params) {
        this.acccesToken = params.acccesToken;
        this.apiEndpoint = params.apiEndpoint;
        this.projectId = params.projectId;
    }

    async get(url, params) {
        console.log('Request get', url, params);
        const query = new URLSearchParams(params);
        try {
            const response = await fetch(`${this.apiEndpoint}/v2/projects/${this.projectId}/${url}?${query}`,
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
        console.log('Request post', url, body);
        try {
            const response = await fetch(`${this.apiEndpoint}/v2/projects/${this.projectId}/${url}`,
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
        console.log('Request put', url, body);
        try {
            const response = await fetch(`${this.apiEndpoint}/v2/projects/${this.projectId}/${url}`,
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