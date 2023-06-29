const api = require('../../api');
const authentication = require('../../authentication');

/**
 * サンプルコード
 * 予約検索
 */
async function main() {
    const { access_token } = await authentication.getAcccesToken('authorization_code');
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
    });
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const reservations = await apiRequest.get('reservation/search', {
        bookingFrom: date.toISOString(),
        bookingThrough: new Date().toISOString(),
    });
    console.log('reservations', reservations);
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