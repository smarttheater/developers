const api = require('../../api');

/**
 * サンプルコード
 * 注文検索
 */
async function main() {
    const { access_token } = await authentication.getAcccesToken('authorization_code');
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
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