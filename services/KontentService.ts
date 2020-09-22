import {
    DeliveryClient,
    TypeResolver,
    ContentItem,
    TaxonomyGroup,
  } from '@kentico/kontent-delivery';
  
  import { ContentModel } from '../models/content';
  import { PageModel } from '../models/page';
  import { BlockWithImageModel } from '../models/block_with_image';
  
  class KontentService {
    private client: DeliveryClient;
  
    constructor(usePreviewMode: boolean) {
      this.client = new DeliveryClient({
        globalQueryConfig: {
          usePreviewMode,
          useSecuredMode: false
        },
        projectId: process.env.KC_PROJECT_ID ?? '',
        previewApiKey: process.env.KC_PREVIEW_KEY ?? '',
        typeResolvers: [
          new TypeResolver('content', () => new ContentModel()),
          new TypeResolver('page', () => new PageModel()),
          new TypeResolver('block_with_image', () => new BlockWithImageModel())
        ],
        linkedItemResolver: {
          linkedItemWrapperTag: 'div'
        }
      });
    }
  
    async getItem<T extends ContentItem>(codename: string, depth?: number): Promise<T> {
      const response = await this.client.item<T>(codename).depthParameter(depth ?? 0).toPromise();
      return response.item;
    }
  
    async getItems<T extends ContentItem>(type: string): Promise<T[]> {
      const response = await this.client.items<T>().type(type).toPromise();
      return response.items;
    }

    async getTaxonomyItems(codename: string): Promise<TaxonomyGroup> {
      const response = await this.client.taxonomy(codename).toPromise();
      return response.taxonomy;
    }
  }
  
  export default KontentService;