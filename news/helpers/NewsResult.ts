import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { HttpStatusCode, IHttp, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';

export class NewsResult {
    public title: string;
    public url: string;

    constructor(data?: any) {
        if (data) {
            this.title = data.response.results.webTitle as string;
            this.url = data.response.results.webUrl as string;

        }

    }
}