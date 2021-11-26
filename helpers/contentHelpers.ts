import { Content } from '../models/content';
import { IContentViewModel } from '../viewModels/contentViewModel';

export function transformContent (content: Content[]):IContentViewModel[] {
    return content.map((c) => ({
        id: c.system.id,
        title: c.elements.title.value,
        imageUrl: c.elements.cover_image_url?.value ?? c.elements.cover_image?.value[0].url ?? '',
        date: c.elements.date?.value ? new Date(c.elements.date.value).toISOString().split('T')[0] : '',
        url: c.elements.url.value,
        isExternal: c.elements.url.value.startsWith("https"),
        teaser: c.elements.teaser.value,
        tags: c.elements.content_tags.value.map(ct => ({
            codename: ct.codename,
            text: ct.name
        })),
        type: ({
            codename: c.elements.content_type.value[0].codename,
            text: c.elements.content_type.value[0].name
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
    { tag: "gridsome", color: "green" },
    { tag: "git", color: "orange" },
    { tag: "graph_ql", color: "purple" },
    { tag: "angular", color: "red" }
];

export function getTagColor(tag: string):string {
    return tagColors.find(t => t.tag === tag)?.color ?? "grey";
}