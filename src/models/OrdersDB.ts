import * as Test from "./tests/OrdersDB";

/**
 * A status of the order.
 */
export enum OrderStatus {
    POSTED,
    READY,
    SERVED,
    PAID
}

/**
 * A class that holds information about the single order.
 */
export interface IOrderInfo {
    order_id: number;
    table_id: number;
    posted: Date;
    ready: Date;
    served: Date;
    paid: Date;
    orders: number[];
}

/**
 * Represents a database which stores a lot of information about orders.
 */
export interface IOrdersDatabase {
    get(status: OrderStatus): Promise<IOrderInfo[]>;
    post(order: IOrderInfo): Promise<void>;
    mark_as(order_id: number, status: OrderStatus): Promise<void>;
}

/**
 * Get a maximum value of Date. Can be used for initializing parameters.
 */
export function get_infinity_date() {
    return new Date(8640000000000000);
}

/**
 * A database which inherits `IOrdersDatabase`.
 * You can change it when you want to use others.
 */
export let ordersDatabase: IOrdersDatabase = new Test.OrdersDatabase();
