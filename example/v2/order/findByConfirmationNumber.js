const authentication = require('../authentication');
const api = require('../api');
const readline = require('readline/promises');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const confirmationNumber = await readInterface.question("input confirmationNumber >");
    const telephone = await readInterface.question("input telephone >");

    const { access_token } = await authentication.getAcccesToken();
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
        apiEndpoint: process.env.API_ENDPOINT,
        projectId: process.env.PROJECT_ID
    });
    const orders = await apiRequest.get('order/findByConfirmationNumber', {
        confirmationNumber,
        telephone
    });
    console.log('orders', orders);

    const items = await apiRequest.get('order/searchAcceptedOffersByConfirmationNumber', {
        confirmationNumber,
        orderNumber: orders[0].orderNumber
    });
    console.log('items', items);
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