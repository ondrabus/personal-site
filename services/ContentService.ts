import { ContentModel } from '../models/content';
import { PageModel } from '../models/page';

import BaseKontentItemService from './BaseKontentItemService';

class ContentService extends BaseKontentItemService {
  constructor(usePreviewMode: boolean) {
    super(usePreviewMode);
  }

  async getContent(url: string) {
    const items = await this.client.getItems<ContentModel>('content');
    return items.find((item) => item.url.value === url);
  }

  async getPage(codename: string){
    const item = await this.client.getItem<PageModel>(codename);
    return item;
  }

  async getAllContent() {
    const items = await this.client.getItems<ContentModel>('content');
    return items;
  }

  async getContentTypes() {
    const types = await this.client.getTaxonomyItems('content_type')
    return types;
  }
  async getContentTags() {
    const tags = await this.client.getTaxonomyItems('content_tags');
    return tags;
  }
}

export default ContentService;