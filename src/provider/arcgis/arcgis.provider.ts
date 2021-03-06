import type { AxiosInstance } from 'axios';
import { AbstractHttpProvider } from '../../model';
import { ArcgisGeocodeCommand, ArcgisPlaceDetailsCommand, ArcgisReverseCommand, ArcgisSuggestCommand } from './command';

export class ArcgisProvider extends AbstractHttpProvider {
    constructor(httpClient: AxiosInstance, token?: string) {
        super({
            geocode: new ArcgisGeocodeCommand(httpClient, token),
            reverse: new ArcgisReverseCommand(httpClient, token),
            suggest: new ArcgisSuggestCommand(httpClient, token),
            placeDetails: new ArcgisPlaceDetailsCommand(httpClient, token),
        });
    }
}
