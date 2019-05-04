import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, ISlashCommandPreview, ISlashCommandPreviewItem, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { NewsApp } from '../News';
import { NewsResult } from '../helpers/NewsResult';
import { NewsGetter } from '../helpers/NewsGetter';
import { formatWithOptions } from 'util';


export class NewsCommand implements ISlashCommand {
  public command = 'news';
  public i18nParamsExample = 'news_search_term';
  public i18nDescription = 'news_description';
  public providesPreview = false;

  constructor(private readonly app: NewsApp) { }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {

    const parame = context.getArguments().join(' ');

    if (!parame) {
      throw new Error('Method not implemented.');
    }

    const mg = modify.getCreator().startMessage().setSender(context.getSender()).setRoom(context.getRoom());
    try {
      const term = context.getArguments().join(' ').trim();

      const wik = await this.app.getNewsGetter().getOne(this.app.getLogger(), http, term, read);


      
      mg.addAttachment({
        title: {
            value: ( wik.title.trim()),
        },
        imageUrl: wik.url,
        
    });


      await modify.getCreator().finish(mg);
    } catch (e) {
      this.app.getLogger().error('Failed getting text', e);
      mg.setText('An error occurred when trying to send text :');

      modify.getNotifier().notifyUser(context.getSender(), mg.getMessage());
    }
  }

}


