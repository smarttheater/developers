const { CLIENT_ID } = require('../setting');
const authentication = require('../authentication');
const api = require('../api');

/**
 * サンプルコード
 * 提供決済サービス検索
 */
async function main() {
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
    const paymentServices = await apiRequest.get('seller/searchPaymentServices', {
        id: seller.id
    });
    if (paymentServices.length === 0) {
        throw new Error('paymentServices not found');
    }
    console.log('paymentServices', paymentServices);
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
    });;