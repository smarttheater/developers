const api = require('../../api');
const authentication = require('../../authentication');
const readline = require('readline/promises');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * サンプルコード
 * 予約を使用
 */
async function main() {
    const confirmationNumber = await readInterface.question("Please enter your confirmationNumber >");
    const telephone = await readInterface.question("Please enter your telephone >");

    const { access_token } = await authentication.getAcccesToken('authorization_code');
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
    });
    const orders = await apiRequest.get('order/findByConfirmationNumber', {
        confirmationNumber,
        telephone,
    });
    if (orders.length === 0) {
        throw new Error('orders not found');
    }
    const order = orders[0];
    console.log('order', order);

    const items = await apiRequest.get('order/searchAcceptedOffersByConfirmationNumber', {
        confirmationNumber,
        orderNumber: order.orderNumber
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
            telephone
        },
        expiresInSeconds: date.toISOString(),
    });
    console.log('code', code);

    const reservations = await apiRequest.get('reservation/search', {
        ids: item.itemOffered.id,
    });
    if (reservations.length === 0) {
        throw new Error('reservations not found');
    }
    const reservation = reservations[0];
    console.log('reservation', reservation);

    const { token } = await apiRequest.post('token/getToken', {
        code,
    });

    await apiRequest.post('reservation/useByToken', {
        object: {
            id: item.itemOffered.id
        },
        instrument: {
            token
        }
    });

    const useActions = await apiRequest.get('reservation/searchUseActions', {
        id: item.itemOffered.id
    });
    console.log('useActions', useActions)
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