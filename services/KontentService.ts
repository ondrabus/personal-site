import { DeliveryClient, IContentItem, IDeliveryClient, ITaxonomyGroup } from '@kentico/kontent-delivery'
  
class KontentService {
  private static _instance: KontentService
  private client: DeliveryClient

  public get deliveryClient(): IDeliveryClient {
    return this.client;
  }

  public static Instance(usePreviewMode = false){
    if(!this._instance) {
      this._instance = new KontentService(usePreviewMode);
    }
    return this._instance;
  }

  protected constructor(usePreviewMode: boolean) {
    this.client = new DeliveryClient({
      defaultQueryConfig: {
        usePreviewMode,
      },
      projectId: process.env.KONTENT_PROJECT_ID ?? '',
      previewApiKey: process.env.KONTENT_PREVIEW_KEY ?? '',
    });
  }

  async getItem<T extends IContentItem>(codename: string, depth?: number): Promise<T> {
    const response = await this.client.item<T>(codename).depthParameter(depth ?? 0).toPromise();
    return response.data.item;
  }

  async getItems<T extends IContentItem>(type: string): Promise<T[]> {
    const response = await this.client.items<T>().type(type).toPromise();
    return response.data.items;
  }

  async getTaxonomyItems(codename: string): Promise<ITaxonomyGroup> {
    const response = await this.client.taxonomy(codename).toPromise();
    return response.data.taxonomy;
  }
}

export default KontentService;