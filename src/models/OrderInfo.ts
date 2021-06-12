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
export interface IOrderDatabase {
    init(): Promise<void>;
}
