/**
 * A class that holds information about a menu item.
 */
 export interface IMenuItemInfo {
    menu_id: number;
    menu_name: string;
    price: number;
}

/**
 * Represents a database which stores a menu.
 */
export interface IMenuItemDatabase {
    init(): Promise<void>;
    get(menu_id: number): Promise<IMenuItemInfo>;
    size(): Promise<number>;
}
