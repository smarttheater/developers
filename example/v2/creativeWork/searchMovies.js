const { CLIENT_ID, FAMILY_NAME, GIVEN_NAME, EMAIL, TELEPHONE } = require('../setting');
const authentication = require('../authentication');
const api = require('../api');

/**
 * サンプルコード
 * コンテンツ検索
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
    const movies =
        await apiRequest.get('creativeWork/searchMovies', { sellerId: seller.id });
    console.log('movies', movies);
    if (movies.length > 0) {
        console.log('movie', JSON.stringify(movies[0]));
    }
    
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