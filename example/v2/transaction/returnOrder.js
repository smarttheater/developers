const authentication = require('../authentication');
const api = require('../api');
const readline = require('readline/promises');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const orderNumber = await readInterface.question("Please enter your orderNumber >");
    const confirmationNumber = await readInterface.question("Please enter your confirmationNumber >");

    const { access_token } = await authentication.getAcccesToken();
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
        apiEndpoint: process.env.API_ENDPOINT,
        projectId: process.env.PROJECT_ID
    });
    let date = new Date();
    const transaction = await apiRequest.post('transaction/returnOrder/start', {
        expires: new Date(date.setDate(date.getMinutes() + 10)).toISOString(),
        object: {
            order: [{
                orderNumber,
                confirmationNumber,
            }]
        }
    });
    console.log('transaction', transaction);
    await apiRequest.post('transaction/returnOrder/confirm', {
        id: transaction.id
    });
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