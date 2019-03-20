import Axios, { AxiosInstance } from 'axios';
import { Geocoder } from '../../../src/geocoder';
import { GeocodeQueryInterface, ReverseQueryInterface, SuggestQueryInterface } from '../../../src/interface';
import { AccuracyEnum } from '../../../src/model';
import { ArcgisProvider, StatefulChainProvider } from '../../../src/provider';
import { geocodeQueryFixture, reverseQueryFixture, suggestQueryFixture } from '../../fixture/model/query.fixture';

describe('StatefulChainProvider (integration)', () => {
    let client: AxiosInstance;
    let geocoder: Geocoder;
    let geocodeQuery: GeocodeQueryInterface;
    let reverseQuery: ReverseQueryInterface;
    let suggestQuery: SuggestQueryInterface;

    beforeEach(() => {
        geocodeQuery = { ...geocodeQueryFixture };
        reverseQuery = { ...reverseQueryFixture };
        suggestQuery = { ...suggestQueryFixture };

        client = Axios.create();

        const provider: StatefulChainProvider = new StatefulChainProvider([new ArcgisProvider(client)]);

        geocoder = new Geocoder(provider);
    });

    describe('#geocode', () => {
        it('should return response', async () => {
            return geocoder
                .geocode(geocodeQuery)
                .should.eventually.be.an('array')
                .with.length(1);
        });

        it('should return empty array', async () => {
            return geocoder
                .geocode({
                    address: '123123123',
                    exactMatch: true,
                })
                .should.eventually.be.an('array')
                .with.length(0);
        });
    });

    describe('#reverse', () => {
        it('should return expected response', async () => {
            return geocoder
                .reverse(reverseQuery)
                .should.eventually.be.an('array')
                .with.length(1);
        });

        it('should return empty array', async () => {
            return geocoder
                .reverse({
                    accuracy: AccuracyEnum.HOUSE_NUMBER,
                    lat: 0,
                    lon: 0,
                })
                .should.eventually.be.an('array')
                .with.length(0);
        });
    });

    describe('#suggest', () => {
        it('should return expected response', async () => {
            return geocoder
                .suggest(suggestQuery)
                .should.eventually.be.an('array')
                .with.length(3);
        });

        it('should return empty array', async () => {
            return geocoder
                .suggest({
                    address: '123123123',
                })
                .should.eventually.be.an('array')
                .with.length(0);
        });
    });
});