import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class ContentModel extends ContentItem {
    public title!: Elements.TextElement;
    public url!: Elements.TextElement;
    public cover_image: Elements.AssetsElement;
    public cover_image_url: Elements.TextElement;
    public date!: Elements.DateTimeElement;
    public teaser!: Elements.RichTextElement;
    public content_type!: Elements.TaxonomyElement;
    public content_tags!: Elements.TaxonomyElement;
    public content: Elements.RichTextElement;
}