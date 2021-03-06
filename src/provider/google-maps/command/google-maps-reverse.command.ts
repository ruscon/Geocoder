import type { AxiosInstance } from 'axios';
import { ReverseCommand } from '../../../command';
import type { ReverseQuery } from '../../../model';
import type { GoogleMapsReverseQueryInterface } from '../interface';
import { GoogleMapsLocationCommandMixin } from './mixin';

/**
 * TODO implement result_type and location_type
 * @link {https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding}
 */
export class GoogleMapsReverseCommand extends GoogleMapsLocationCommandMixin(ReverseCommand)<GoogleMapsReverseQueryInterface> {
    constructor(httpClient: AxiosInstance, private readonly apiKey: string) {
        // @ts-ignore
        super(httpClient, apiKey);
    }

    static getUrl(): string {
        return 'https://maps.googleapis.com/maps/api/geocode/json';
    }

    protected async buildQuery(query: ReverseQuery): Promise<GoogleMapsReverseQueryInterface> {
        const providerQuery: GoogleMapsReverseQueryInterface = {
            key: this.apiKey,
            latlng: `${query.lat},${query.lon}`,
            limit: query.limit,
            language: query.language,
            sensor: false,
        };

        if (query.countryCode) {
            providerQuery.region = `.${query.countryCode.toLowerCase()}`;
        }

        return providerQuery;
    }
}
