const api = require('../../api');
const authentication = require('../../authentication');
const readline = require('readline/promises');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * サンプルコード
 * 予約を使用
 */
async function main() {
    const orderNumber = await readInterface.question(
        'Please enter your orderNumber >'
    );
    
    const { access_token } = await authentication.getAcccesToken(
        'authorization_code'
    );
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
    const movieTheaters = await apiRequest.get('place/searchMovieTheaters', {
        sellerId: seller.id,
    });
    if (movieTheaters.length === 0) {
        throw new Error('movieTheaters not found');
    }
    const movieTheater = movieTheaters[0];
    console.log('movieTheater', movieTheater);
    const orders = await apiRequest.get('order/search', {
        orderNumbers: [orderNumber],
        sellerId: seller.id,
    });
    if (orders.length === 0) {
        throw new Error('orders not found');
    }
    const order = orders[0];
    console.log('order', order);

    const items = await apiRequest.get(
        'order/searchAcceptedOffersByConfirmationNumber',
        {
            confirmationNumber: order.confirmationNumber,
            orderNumber,
            sellerId: seller.id,
        }
    );
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
            telephone: order.customer.telephone,
        },
        expiresInSeconds: date.toISOString(),
        seller: {
            id: seller.id,
        },
    });
    console.log('code', code);

    const reservations = await apiRequest.get('reservation/search', {
        ids: item.itemOffered.id,
        sellerId: seller.id,
    });
    if (reservations.length === 0) {
        throw new Error('reservations not found');
    }
    const reservation = reservations[0];
    console.log('reservation', reservation);

    const { token } = await apiRequest.post('token/getToken', {
        code,
        seller: {
            id: seller.id,
        },
    });

    await apiRequest.post('reservation/useByToken', {
        object: {
            id: item.itemOffered.id,
        },
        instrument: {
            token,
        },
        location: {
            identifier: movieTheater.hasEntranceGate[0].identifier
        },
        seller: {
            id: seller.id,
        },
    });

    const useActions = await apiRequest.get('reservation/searchUseActions', {
        id: item.itemOffered.id,
        sellerId: seller.id,
    });
    console.log('useActions', useActions);
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
