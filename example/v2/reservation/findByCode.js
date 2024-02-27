const api = require('../api');
const authentication = require('../authentication');
const readline = require('readline/promises');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * サンプルコード
 * コードによる予約照会
 */
async function main() {
    const confirmationNumber = await readInterface.question("Please enter your confirmationNumber >");
    const telephone = await readInterface.question("Please enter your telephone >");

    const { access_token } = await authentication.getAcccesToken('client_credentials');
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
    });
    const sellers = await apiRequest.get('seller/search');
    if (sellers.length === 0) {
        throw new Error('seller not found');
    }
    const seller = sellers[0];
    console.log('seller', seller);
    const orders = await apiRequest.get('order/findByConfirmationNumber', {
        confirmationNumber,
        telephone,
        sellerId: seller.id
    });
    if (orders.length === 0) {
        throw new Error('orders not found');
    }
    const order = orders[0];
    console.log('order', order);

    const items = await apiRequest.get('order/searchAcceptedOffersByConfirmationNumber', {
        confirmationNumber,
        orderNumber: order.orderNumber,
        sellerId: seller.id
    });
    if (items.length === 0) {
        throw new Error('items not found');
    }
    const item = items[0];
    console.log('item', item);

    const date = new Date();
    date.setDate(date.getMinutes() + 10);
    const { code } = await apiRequest.post('order/authorize', {
        orderNumber: order.orderNumber,
        customer: {
            telephone,
        },
        expiresInSeconds: date.toISOString(),
        seller: {
            id: seller.id,
        },
    });
    console.log('code', code);
    item.itemOffered.id

    const reservation = await apiRequest.post('reservation/findByCode', {
        object: {
            id: item.itemOffered.id,
        },
        instrument: {
            code,
        },
        seller: {
            id: seller.id,
        },
    });
    console.log('reservation', JSON.stringify(reservation));
}

main()
    .then(() => {
        console.log('done');
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        process.exit();
    });
