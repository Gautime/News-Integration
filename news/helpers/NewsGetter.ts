import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { NewsResult } from '../helpers/NewsResult';


export class NewsGetter {
    private readonly url = 'https://content.guardianapis.com/search?';
    private readonly defaultKey = 'da284288-9b7f-4abc-853d-dea33e0eec2d';
    


    public async getOne(logger: ILogger, http: IHttp, phrase: any, read: IRead): Promise<NewsResult> {

        let search = phrase.trim();
        if (!search) {
            search = 'random';
        }
        const key = await read.getEnvironmentReader().getSettings().getValueById('news_apikey') || this.defaultKey;

        const response = await http.get(`${this.url}q=${search}&format=json&api-key=${key}`);
        try {
            if (response.statusCode !== HttpStatusCode.OK || !response.data) {
                logger.debug('Did not get a valid response', response);
                throw new Error('Unable to retrieve the text.');
            } else if (typeof response.data.extract !== 'object') {
                logger.debug('The response data is not an Object:', response.data);
                throw new Error('Data is in a format we don\'t understand.');
            }
            return new NewsResult(response.data);

        } catch (e) {
            return new NewsResult(response.data);
        }
        //console.log('The returned data:', response.data.query);
    }
}


