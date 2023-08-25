const { CLIENT_ID } = require('../setting');
const authentication = require('../authentication');
const api = require('../api');

/**
 * サンプルコード
 * 販売者検索
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
    console.log('sellers', sellers);
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