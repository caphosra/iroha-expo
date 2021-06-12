import { IMenuDatabase, IMenuItemInfo } from "../MenuDB";

/**
 * Just a test.
 */
export class MenuDatabase implements IMenuDatabase {
    private menu: IMenuItemInfo[] = [
        {
            menu_id: 0,
            menu_name: "ホットケーキ",
            price: 500
        },
        {
            menu_id: 1,
            menu_name: "コーヒー",
            price: 100
        },
        {
            menu_id: 2,
            menu_name: "パフェ",
            price: 700
        },
        {
            menu_id: 3,
            menu_name: "クッキー",
            price: 300
        }
    ];

    async get(menu_id: number): Promise<IMenuItemInfo> {
        return this.menu
            .filter((item) => item.menu_id == menu_id)[0];
    }

    async size(): Promise<number> {
        return this.menu.length;
    }
}
