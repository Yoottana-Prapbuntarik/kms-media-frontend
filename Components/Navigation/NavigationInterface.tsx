export interface NavigationItems {
    readonly keyTitle: string;
    readonly routePath: any;
}

export interface NavigationPresenter {
    readonly navigationItems: NavigationItems[];
    readonly social:  NavigationItems[];
    isToggleNav: Boolean
}