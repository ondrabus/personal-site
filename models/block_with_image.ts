import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class BlockWithImageModel extends ContentItem {
    public title!: Elements.TextElement;
    public content!: Elements.RichTextElement;
    public image?: Elements.AssetsElement;

    constructor(){
        super({
            richTextResolver: (block) => {
                return `<section itemScope itemType="http://schema.org/Blog" class="content alternating">
                    <div class="img">
                        <img src="${block.image.value[0].url}" alt="${block.title.value}" />
                    </div>
                    <div class="text">
                        <h2>${block.title.value}</h2>
                        ${block.content.value}
                    </div>
                </section>`;
            }
        })
    }
}