const api = require('../../api');

async function main() {
    const access_token = process.env.ACCESS_TOKEN;
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
        apiEndpoint: process.env.API_ENDPOINT,
        projectId: process.env.PROJECT_ID
    });
    const date = new Date();
    date.setDate(date.getDate() - 10);
    const orders = await apiRequest.get('order/search', {
        orderDateGte: date.toISOString(),
        orderDateLte: new Date().toISOString(),
    });
    console.log('orders', orders);
}

main()
    .then(() => {
        console.log('done');
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(()=> {
        process.exit();
    });