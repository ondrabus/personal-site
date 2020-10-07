import React, { useState } from 'react';
import { IContentViewModel } from '../viewModels/contentViewModel';
import { getTagColor } from '../helpers/contentHelpers';
import { ITaxonomyItemViewModel } from '../viewModels/taxonomyItemViewModel';
import Link from 'next/link';

interface IBlogPostProps {
    content: IContentViewModel[],
    tags?: ITaxonomyItemViewModel[],
    types?: ITaxonomyItemViewModel[],
    selectedTag?: string,
    selectedType?: string
}
const BlogPosts: React.FC<IBlogPostProps> = ({content, tags, types, selectedTag, selectedType}) => {

    tags = tags ?? [];
    types = types ?? [];
    selectedTag = selectedTag ?? '';
    selectedType = selectedType ?? '';

    let tagSet = new Set();

    if (selectedTag !== '')
    {
        tagSet.add(selectedTag);
    }
    let typeSet = new Set();
    if (selectedType !== '')
    {
        typeSet.add(selectedType);
    }

    const [selectedTags, setSelectedTags] = useState(tagSet);
    const [selectedTypes, setSelectedTypes] = useState(typeSet);

    const tagsList = tags.map(t => (<button
        key={t.codename}
        className={`${selectedTags.has(t.codename) ? `selected ${getTagColor(t.codename)}`  : ''}`}
        data-codename={t.codename}
        onClick={() => setSelectedTags(selectedTags => {
            if (selectedTags.has(t.codename)){
                const result = new Set(selectedTags);
                result.delete(t.codename);
                return result;
            }
            else
            {
                return new Set(selectedTags.add(t.codename));
            }})}>
                {t.text}
    </button>));
    const typesList = types.map(t => (<button
            key={t.codename}
            className={`${selectedTypes.has(t.codename) ? `selected ${getTagColor(t.codename)}`  : ''}`}
            data-codename={t.codename}
            onClick={() => setSelectedTypes(selectedTypes => {
                if (selectedTypes.has(t.codename)){
                    const result = new Set(selectedTypes);
                    result.delete(t.codename);
                    return result;
                }
                else
                {
                    return new Set(selectedTypes.add(t.codename));
                }})}>
                    {t.text}
        </button>));

    // filter content
    let filteredContent = content;
    if (selectedTypes.size > 0)
    {
        filteredContent = filteredContent.filter(c => selectedTypes.has(c.type.codename));
    }
    if (selectedTags.size > 0)
    {
        filteredContent = filteredContent.filter(c => c.tags.some(t => selectedTags.has(t.codename)));
    }

    return (
        <section itemScope itemType="http://schema.org/Blog" className="content blog-posts">
            <h1>Content</h1>

            {typesList.length > 0 && <div className="filter">{typesList}</div>}
            {tagsList.length > 0 && <div className="filter">{tagsList}</div>}

            {filteredContent.length > 0 && <div className="grid">
                {filteredContent.map((article) => (
                    <article className="rows" key={article.url}>
                        <h1><a href={article.url} title={article.title}>{article.title} {article.isExternal && (<i className="fa fa-external-link"></i>)}</a></h1>
                        <div className="cols">
                            <div className={`img ${article.type.codename === "video" || article.type.codename === "live_stream" ? 'video' : ''}`}>
                                <a href={article.url} title={article.title}>
                                    <img src={article.imageUrl} alt={article.title} />
                                </a>
                            </div>
                            <div className="right rows">
                                <div dangerouslySetInnerHTML={{__html: article.teaser}}></div>
                                <div className="cols">
                                    <ul className="tags cols">
                                        {article.tags.map(t => (
                                            <li key={t.codename}>
                                                <Link href="/blog/[[...filter]]" as={`/blog/tag/${t.codename}`}>
                                                    <a title={`All blog posts with ${t.text} tag`} className={getTagColor(t.codename)}>{t.text}</a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="date">{article.date}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>}
            {filteredContent.length == 0 && (<p>I haven't published any {tags.find(t => t.codename == selectedTags.values().next().value)?.text ?? ''} {types.find(t => t.codename == selectedTypes.values().next().value)?.text ?? 'content'} yet. <a href="https://twitter.com/ondrabus" title="Get in touch with me on Twitter">Let me know</a> what are you looking for.</p>)}

        </section>
    )
}

export default BlogPosts