/**
 * A status of the order.
 */
export enum OrderStatus {
    POSTED,
    COOKING,
    READY,
    SERVED,
    PAID
}

/**
 * A class that holds information about the single order.
 */
export interface IOrderInfo {
    id: number;
    tableID: number;
    date: Date;
    orders: number[];
    status: number;
}

/**
 * Represents a database which stores a lot of information about orders.
 */
export interface IOrderDatabase {
    init(): void;
    get_by_id(id: number): IOrderInfo;
    get_by_table_id(id: number): IOrderInfo[];
    get_by_status(status: OrderStatus): IOrderInfo[];
}
