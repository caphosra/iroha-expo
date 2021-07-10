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
export class MenuDatabase {
    readonly DATABASE_URL = "http://10.0.2.2:2021";

    menu: IMenuItemInfo[] = [];

    async init() {
        const response = await fetch(`${this.DATABASE_URL}/menu`, {
            method: "GET"
        });

        this.menu = await response.json() as IMenuItemInfo[];
    }

    get_by_id(menu_id: number): IMenuItemInfo {
        const menu_item = this.menu.find((item) => {
            return item.menu_id == menu_id;
        });

        if (menu_item) {
            return menu_item;
        }
        else {
            throw "Cannot find an item from the menu.";
        }
    }
}

/**
 * A database which is an instance of `MenuDatabase`.
 * You can change it when you want to use others.
 */
export let menuDatabase = new MenuDatabase();
