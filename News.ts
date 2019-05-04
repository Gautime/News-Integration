import {
    IConfigurationExtend,
    IAppAccessors,
    IEnvironmentRead,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { NewsCommand } from './commands/NewsCommand';
import { NewsGetter } from './helpers/NewsGetter';


export class NewsApp extends App {
    private newsGetter: NewsGetter;


    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
        this.newsGetter = new NewsGetter();

    }
    public getNewsGetter(): NewsGetter {
        return this.newsGetter;
    }

    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.settings.provideSetting({
            id: 'news_apikey',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Customize_NEWS_APIKey',
            i18nDescription: 'Customize_NEWS_APIKey_Description',
        });
        await configuration.slashCommands.provideSlashCommand(new NewsCommand(this));

    }
}
