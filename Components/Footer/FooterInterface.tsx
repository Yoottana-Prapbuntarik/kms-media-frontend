
export interface SocialContact{
    socialImages: string;
    routePath: string;
}

export interface FooterPresenter {
    readonly socialContact: SocialContact[] 
}