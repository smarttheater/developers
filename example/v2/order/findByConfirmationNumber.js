const authentication = require('../authentication');
const api = require('../api');
const readline = require('readline/promises');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const confirmationNumber = await readInterface.question("Please enter your confirmationNumber >");
    const telephone = await readInterface.question("Please enter your telephone >");

    const { access_token } = await authentication.getAcccesToken('client_credentials');
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
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