import { DeliveryClient, IContentItem, IDeliveryClient, ITaxonomyGroup } from '@kentico/kontent-delivery'
  
class KontentService {
  private static _instance: KontentService
  private static _previewInstance: KontentService
  private client: DeliveryClient

  public get deliveryClient(): IDeliveryClient {
    return this.client;
  }

  public static Instance(usePreviewMode = false){
    if (usePreviewMode){
      if (!this._previewInstance){
        this._previewInstance = new KontentService(true)
      }
      return this._previewInstance
    } else {
      if(!this._instance) {
        this._instance = new KontentService(false);
      }
      return this._instance;
    }
  }

  protected constructor(usePreviewMode: boolean) {
    this.client = new DeliveryClient({
      defaultQueryConfig: {
        usePreviewMode,
      },
      globalHeaders: () => usePreviewMode ? [
        {
          header: 'X-KC-Wait-For-Loading-New-Content',
          value: 'true'
        }
      ] : [],
      projectId: process.env.KONTENT_PROJECT_ID ?? '',
      previewApiKey: process.env.KONTENT_PREVIEW_KEY ?? '',
    })
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