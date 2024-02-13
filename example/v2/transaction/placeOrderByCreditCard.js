const {
    CLIENT_ID,
    FAMILY_NAME,
    GIVEN_NAME,
    EMAIL,
    TELEPHONE,
} = require('../setting');
const authentication = require('../authentication');
const api = require('../api');
const readline = require('readline/promises');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * サンプルコード
 * 注文取引クレジットカード決済
 */
async function main() {
    let screeningEventIndex = await readInterface.question(
        'Please enter your screeningEvent index >'
    );
    let familyName = await readInterface.question(
        'Please enter your familyName >'
    );
    let givenName = await readInterface.question(
        'Please enter your givenName >'
    );
    let email = await readInterface.question('Please enter your email >');
    let telephone = await readInterface.question(
        'Please enter your telephone >'
    );
    screeningEventIndex =
        screeningEventIndex === '' ? 0 : Number(screeningEventIndex);
    familyName = familyName === '' ? FAMILY_NAME : familyName;
    givenName = givenName === '' ? GIVEN_NAME : givenName;
    email = email === '' ? EMAIL : email;
    telephone = telephone === '' ? TELEPHONE : telephone;

    const { access_token } = await authentication.getAcccesToken(
        'client_credentials'
    );
    const apiRequest = new api.Request();
    apiRequest.setOptions({
        acccesToken: access_token,
    });
    let date = new Date();
    const sellers = await apiRequest.get('seller/search');
    if (sellers.length === 0) {
        throw new Error('seller not found');
    }
    const seller = sellers[0];
    console.log('seller', seller);
    const movieTheaters = await apiRequest.get('place/searchMovieTheaters', {
        sellerId: seller.id,
    });
    if (movieTheaters.length === 0) {
        throw new Error('movieTheaters not found');
    }
    const movieTheater = movieTheaters[0];
    console.log('movieTheater', movieTheater);
    date = new Date();
    const screeningEvents = await apiRequest.get(
        'event/screeningEvent/search',
        {
            startFrom: new Date().toISOString(),
            startThrough: new Date(
                date.setDate(date.getDate() + 1)
            ).toISOString(),
            superEventLocationBranchCodes: movieTheater.branchCode,
            clientId: CLIENT_ID,
            sellerId: seller.id,
        }
    );
    if (screeningEvents.length === 0) {
        throw new Error('screeningEvents not found');
    }
    const screeningEvent = screeningEvents[screeningEventIndex];
    console.log('screeningEvent', screeningEvent);

    const ticketOffers = await apiRequest.get(
        'event/screeningEvent/searchTicketOffers',
        {
            eventId: screeningEvent.id,
            sellerId: seller.id,
        }
    );
    if (ticketOffers.length === 0) {
        throw new Error('ticketOffers not found');
    }
    const ticketOffer = ticketOffers.find((t) => {
        const priceComponent = t.priceSpecification.priceComponent;
        let price = 0;
        priceComponent?.forEach((p) => (price += p.price));
        const UnitPriceSpecification = priceComponent.find(
            (p) => p.typeOf === 'UnitPriceSpecification'
        );
        return (
            price !== 0 &&
            UnitPriceSpecification?.referenceQuantity?.value === 1 &&
            priceComponent.length === 1
        );
    });
    console.log('ticketOffer', ticketOffer);

    const seats = await apiRequest.get('event/screeningEvent/searchSeats', {
        eventId: screeningEvent.id,
        sellerId: seller.id,
    });
    if (seats.length === 0) {
        throw new Error('seats not found');
    }
    const seat = seats.find((s) => s.offers[0] === 'InStock');
    console.log('seat', seat);

    const passports = await apiRequest.post('passports', {
        scope: `Transaction:PlaceOrder:${seller.id}`,
    });
    console.log('passports', passports);
    date = new Date();
    const transaction = await apiRequest.post('transaction/placeOrder/start', {
        seller: {
            id: seller.id,
        },
        expires: new Date(date.setDate(date.getMinutes() + 10)).toISOString(),
        object: {
            passport: {
                token: passports.token,
            },
        },
    });
    console.log('transaction', transaction);
    const authorizeSeatReservation = await apiRequest.post(
        'transaction/placeOrder/authorizeSeatReservation',
        {
            object: {
                reservationFor: {
                    id: screeningEvent.id,
                },
                acceptedOffer: [
                    {
                        id: ticketOffer.id,
                        itemOffered: {
                            serviceOutput: {
                                reservedTicket: {
                                    ticketedSeat: {
                                        seatNumber: seat.branchCode,
                                        seatSection:
                                            seat.containedInPlace.branchCode,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            purpose: {
                id: transaction.id,
            },
            seller: {
                id: seller.id,
            },
        }
    );
    console.log('authorizeSeatReservation', authorizeSeatReservation);
    await apiRequest.put('transaction/placeOrder/setProfile', {
        id: transaction.id,
        agent: {
            familyName,
            givenName,
            email,
            telephone,
        },
        seller: {
            id: seller.id,
        },
    });
    const priceComponent = ticketOffer.priceSpecification.priceComponent;
    let amount = 0;
    priceComponent?.forEach((p) => (amount += p.price));
    if (amount > 0) {
        const acccesToken = (
            await authentication.getAcccesToken('client_credentials')
        ).access_token;
        await readInterface.question(
            'Please press the key after executing creditCard payment approval >'
        );
        // ブラウザからSmart Theater Payを実行してください
        // Smart Theater Payでクレジットカード決済承認を実行
        // post: https://xxx/payment/creditcard
        // body: {
        //     "accessToken": acccesToken,
        //     "amount": amount,
        //     "projectId": "xxx",
        //     "redirectUrl": "https://xxx",
        //     "sellerId": seller.id,
        //     "transactionId": transaction.id
        // }
    }
    // 各決済承認実行後に次を実行してください
    const result = await apiRequest.put('transaction/placeOrder/confirm', {
        id: transaction.id,
        sendEmailMessage: false,
        seller: {
            id: seller.id,
        },
    });
    console.log('result', result);
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
