const authentication = require('../../authentication');
const { CLIENT_ID } = require('../../setting');
const api = require('../../api');

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
    const movieTheaters =
        await apiRequest.get('place/searchMovieTheaters', { sellerId: seller.id });
    if (movieTheaters.length === 0) {
        throw new Error('movieTheaters not found');
    }
    const movieTheater = movieTheaters.find(m => seller.id === m.parentOrganization.id);
    console.log('movieTheater', movieTheater);
    
    let date = new Date();
    const screeningEvents = await apiRequest.get('event/screeningEvent/search', {
        startFrom: new Date().toISOString(),
        startThrough: new Date(date.setDate(date.getDate() + 1)).toISOString(),
        superEventLocationBranchCodes: movieTheater.branchCode,
        clientId: CLIENT_ID,
        // ids: 'bllk5dh1q',
        sellerId: seller.id,
    });
    if (screeningEvents.length === 0) {
        throw new Error('screeningEvents not found');
    }
    console.log('screeningEvents', screeningEvents);
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