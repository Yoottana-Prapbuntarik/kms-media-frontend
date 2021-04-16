export interface ItemsInCategory {
    categoryType: string;
    title: string;
    detail: string;
    author: string;
    date: string;
}

export interface CategoryComponentPresenter {
    itemsInCategory: ItemsInCategory[]
}

export enum CategoryComponentAction {

}