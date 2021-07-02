import { OrderStatus, IOrderInfo, IOrdersDatabase, get_infinity_date } from "../OrdersDB";

/**
 * Just a test.
 */
export class OrdersDatabase implements IOrdersDatabase {
    private get_past_date(minutes: number): Date {
        return new Date(Date.now() - minutes * 60 * 1000);
    }

    private order_lists: IOrderInfo[] = [
        {
            order_id: 0,
            table_id: 1,
            posted: this.get_past_date(10),
            ready: get_infinity_date(),
            served: get_infinity_date(),
            paid: get_infinity_date(),
            orders: [0, 1, 0, 0]
        },
        {
            order_id: 1,
            table_id: 1,
            posted: this.get_past_date(5),
            ready: get_infinity_date(),
            served: get_infinity_date(),
            paid: get_infinity_date(),
            orders: [0, 1, 2, 0]
        },
        {
            order_id: 2,
            table_id: 3,
            posted: this.get_past_date(6),
            ready: get_infinity_date(),
            served: get_infinity_date(),
            paid: get_infinity_date(),
            orders: [1, 2, 0, 0]
        }
    ];

    async get(status: OrderStatus): Promise<IOrderInfo[]> {
        switch (status) {
            case OrderStatus.POSTED:
                return this.order_lists
                    .filter((time) => time.ready > new Date());
            case OrderStatus.READY:
                return this.order_lists
                    .filter((time) => time.ready < new Date() && time.served > new Date());
            case OrderStatus.SERVED:
                return this.order_lists
                    .filter((time) => time.served < new Date() && time.paid > new Date());
            case OrderStatus.PAID:
                return this.order_lists
                    .filter((time) => time.paid < new Date());
        }
    }

    async post(order: IOrderInfo): Promise<void> {
        this.order_lists.push(order);
    }

    async mark_as(order_id: number, status: OrderStatus): Promise<void> {
        let specified = this.order_lists.filter((order) => order.order_id == order_id);

        if (specified.length != 1) {
            throw "存在しない注文を操作しようとしています!";
        }

        switch (status) {
            case OrderStatus.POSTED:
                throw "意味不明な操作です."
            case OrderStatus.READY:
                {
                    specified[0].ready = new Date();
                }
                break;
            case OrderStatus.SERVED:
                {
                    specified[0].served = new Date();
                }
                break;
            case OrderStatus.PAID:
                {
                    specified[0].paid = new Date();
                }
                break;
        }
    }
}
