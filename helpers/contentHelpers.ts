import { ContentModel } from '../models/content';
import { IContentViewModel } from '../viewModels/contentViewModel';

export function transformContent (content: ContentModel[]):IContentViewModel[] {
    return content.map((c) => ({
        title: c.title.value,
        imageUrl: c.cover_image_url?.value ?? c.cover_image?.value[0].url ?? '',
        date: c.date?.value?.toISOString().split('T')[0] ?? '',
        url: c.url.value,
        isExternal: c.url.value.startsWith("https"),
        teaser: c.teaser.value,
        tags: c.content_tags.value.map(ct => ({
            codename: ct.codename,
            text: ct.name
        })),
        type: ({
            codename: c.content_type.value[0].codename,
            text: c.content_type.value[0].name
        })
    }));
}

const tagColors = [
    { tag: "video", color: "red" },
    { tag: "article", color: "purple" },
    { tag: "live_stream", color: "yellow" },
    
    { tag: "jamstack", color: "green" },
    { tag: "_net", color: "green" },
    { tag: "gatsby", color: "purple" },
    { tag: "kentico", color: "orange" },
    { tag: "sourcebit", color: "blue" },
    { tag: "headless_cms", color: "orange" },
    { tag: "contentful", color: "red" },
    { tag: "kentico_kontent", color: "orange" },
    { tag: "html", color: "blue" },
    { tag: "flexbox", color: "blue" },
    { tag: "grid", color: "blue" },
    { tag: "javascript", color: "red" },
    { tag: "unit_test", color: "red" },
    { tag: "free", color: "green" },
    { tag: "gridsome", color: "green" }
];

export function getTagColor(tag: string):string {
    return tagColors.find(t => t.tag === tag)?.color ?? "grey";
}