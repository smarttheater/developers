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
                throw new Error(
                    JSON.stringify({
                        status: response.status,
                        statusText: response.statusText,
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
            console.error(error);
            throw error;
        }
    }

    async post(url, body) {
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
                throw new Error(
                    JSON.stringify({
                        status: response.status,
                        statusText: response.statusText,
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
            console.error(error);
            throw error;
        }
    }

    async put(url, body) {
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
                throw new Error(
                    JSON.stringify({
                        status: response.status,
                        statusText: response.statusText,
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
            console.error(error);
            throw error;
        }
    }
}

exports.Request = Request;