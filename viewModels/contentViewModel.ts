import { ITaxonomyItemViewModel } from "./taxonomyItemViewModel";

export interface IContentViewModel {
    title: string,
    imageUrl: string,
    date: string,
    url: string,
    isExternal: boolean,
    teaser: string,
    tags: ITaxonomyItemViewModel[],
    type: ITaxonomyItemViewModel
}