const {
    CLIENT_ID,
    FAMILY_NAME,
    GIVEN_NAME,
    EMAIL,
    TELEPHONE,
    MOVIE_TICKET_IDENTIFIER,
    MOVIE_TICKET_ACCESS_CODE,
    MOVIE_TICKET_SERVICE_TYPE,
    MOVIE_TICKET_SERVICE_OUTPUT_TYPE_OF,
    MOVIE_TICKET_SUPER_EVENT_ID,
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
 * 注文取引ムビチケ決済
 */
async function main() {
    let screeningEventIndex = await readInterface.question(
        'Please enter your screeningEvent index >'
    );
    let identifier = await readInterface.question(
        'Please enter your identifier >'
    );
    let accessCode = await readInterface.question(
        'Please enter your accessCode >'
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
    identifier = identifier === '' ? MOVIE_TICKET_IDENTIFIER : identifier;
    accessCode = accessCode === '' ? MOVIE_TICKET_ACCESS_CODE : accessCode;
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
                date.setDate(date.getDate() + 2)
            ).toISOString(),
            superEventLocationBranchCodes: movieTheater.branchCode,
            clientId: CLIENT_ID,
            sellerId: seller.id,
        }
    );
    if (screeningEvents.length === 0) {
        throw new Error('screeningEvents not found');
    }
    const screeningEvent = screeningEvents.find(
        (s) => s.superEvent.id === MOVIE_TICKET_SUPER_EVENT_ID
    );
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
        const unitPriceSpecification = priceComponent.find(
            (p) => p.typeOf === 'UnitPriceSpecification'
        );
        const movieTicketTypeChargeSpecifications = priceComponent.filter(
            (p) => p.typeOf === 'MovieTicketTypeChargeSpecification'
        );

        const movieTicketTypeChargeSpecification = priceComponent.find((p) => {
            return (
                p.typeOf === 'MovieTicketTypeChargeSpecification' &&
                p.appliesToMovieTicket.serviceType ===
                    MOVIE_TICKET_SERVICE_TYPE &&
                p.appliesToMovieTicket.serviceOutput.typeOf ===
                    MOVIE_TICKET_SERVICE_OUTPUT_TYPE_OF
            );
        });
        return (
            unitPriceSpecification?.referenceQuantity?.value === 1 &&
            movieTicketTypeChargeSpecifications.length === 1 &&
            movieTicketTypeChargeSpecification !== undefined
        );
    });
    console.log('ticketOffer', ticketOffer);
    const findPriceComponent =
        ticketOffer.priceSpecification.priceComponent.find(
            (p) => p.typeOf === 'MovieTicketTypeChargeSpecification'
        );
    if (findPriceComponent === undefined) {
        throw new Error('findPriceComponent not found');
    }

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
                        priceSpecification: {
                            appliesToMovieTicket: [
                                {
                                    identifier,
                                    serviceOutput: {
                                        typeOf: findPriceComponent
                                            .appliesToMovieTicket.serviceOutput
                                            .typeOf,
                                    },
                                },
                            ],
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

    const movieTicketTypeChargeSpecification = priceComponent.find(
        (p) => p.typeOf === 'MovieTicketTypeChargeSpecification'
    );
    movieTicketTypeChargeSpecification.appliesToMovieTicket.serviceType;
    if (movieTicketTypeChargeSpecification !== undefined) {
        const { appliesToMovieTicket } = movieTicketTypeChargeSpecification;
        const paymentServices = await apiRequest.get(
            'seller/searchPaymentServices',
            {
                id: seller.id,
            }
        );
        if (paymentServices.length === 0) {
            throw new Error('paymentServices not found');
        }
        const paymentService = paymentServices.find(
            (p) =>
                p.serviceType.codeValue ===
                appliesToMovieTicket.serviceOutput.typeOf
        );
        console.log('paymentService', paymentService);
        const movieTickets = [
            {
                typeOf: appliesToMovieTicket.serviceOutput.typeOf,
                category: {
                    codeValue: '',
                },
                identifier,
                accessCode,
                serviceType: appliesToMovieTicket.serviceType,
                serviceOutput: {
                    reservationFor: {
                        id: screeningEvent.id,
                    },
                    reservedTicket: {
                        ticketedSeat: {
                            seatingType: seat.seatingType,
                            seatNumber: seat.branchCode,
                            seatSection: seat.containedInPlace.branchCode,
                        },
                    },
                },
            },
        ];
        console.log('movieTickets', movieTickets);
        const authorizeMovieTicket = await apiRequest.post(
            'payment/authorizeMovieTicket',
            {
                purpose: {
                    id: transaction.id,
                },
                object: {
                    amount: 0,
                    paymentMethod: appliesToMovieTicket.serviceOutput.typeOf,
                    issuedThrough: { id: paymentService.id },
                    movieTickets,
                },
                seller: {
                    id: seller.id,
                },
            }
        );
        console.log('authorizeMovieTicket', authorizeMovieTicket);
    }
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
