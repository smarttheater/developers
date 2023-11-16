const api = require('../../api');
const authentication = require('../../authentication');

/**
 * サンプルコード
 * 注文検索
 */
async function main() {
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
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const orders = await apiRequest.get('order/search', {
        orderDateGte: date.toISOString(),
        orderDateLte: new Date().toISOString(),
        sellerId: seller.id,
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
    .finally(() => {
        process.exit();
    });
