import * as Test from "./tests/MenuDB";

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
export interface IMenuDatabase {
    get(menu_id: number): Promise<IMenuItemInfo>;
    size(): Promise<number>;
}

/**
 * A database which inherits `IMenuDatabase`.
 * You can change it when you want to use others.
 */
export let menuDatabase: IMenuDatabase = new Test.MenuDatabase();
