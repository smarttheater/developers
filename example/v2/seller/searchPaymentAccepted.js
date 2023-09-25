const { CLIENT_ID } = require('../setting');
const authentication = require('../authentication');
const api = require('../api');

/**
 * サンプルコード
 * 対応決済方法区分検索
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
    const paymentAccepteds = await apiRequest.get('seller/searchPaymentAccepted', {
        id: seller.id
    });
    if (paymentAccepteds.length === 0) {
        throw new Error('paymentAccepteds not found');
    }
    console.log('paymentAccepteds', paymentAccepteds);
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