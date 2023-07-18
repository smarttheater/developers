const { CLIENT_ID, FAMILY_NAME, GIVEN_NAME, EMAIL, TELEPHONE } = require('../setting');
const authentication = require('../authentication');
const api = require('../api');

/**
 * サンプルコード
 * 施設検索
 */
async function main() {
    const { access_token } = await authentication.getAcccesToken('client_credentials');
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
    });
    const movieTheaters =
        await apiRequest.get('place/searchMovieTheaters');
    console.log('movieTheaters', movieTheaters);
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