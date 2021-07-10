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
    posted: number;
    ready: number;
    served: number;
    paid: number;
    orders: number[];
}

/**
 * Represents a database which stores a lot of information about orders.
 */
export class OrdersDatabase {
    readonly DATABASE_URL = "http://10.0.2.2:2021";
    readonly INFINITE_TIME = 8640000000000000;

    private async get_request<T>(url: string): Promise<T> {
        const result = await fetch(url, { method: "GET" });

        const infos = await result.json() as T;
        return infos;
    }

    async get(status: OrderStatus): Promise<IOrderInfo[]> {
        switch (status) {
            case OrderStatus.POSTED:
                {
                    return await this.get_request(`${this.DATABASE_URL}/orders/posted`);
                }
            case OrderStatus.READY:
                {
                    return await this.get_request(`${this.DATABASE_URL}/orders/ready`);
                }
            case OrderStatus.SERVED:
                {
                    return await this.get_request(`${this.DATABASE_URL}/orders/served`);
                }

            case OrderStatus.PAID:
                {
                    return await this.get_request(`${this.DATABASE_URL}/orders/paid`);
                }
        }
    }

    async post(order_id: number, table_id: number, orders: number[]): Promise<void> {
        await fetch(`${this.DATABASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order_id: order_id,
                table_id: table_id,
                posted: Date.now(),
                ready: this.INFINITE_TIME,
                served: this.INFINITE_TIME,
                paid: this.INFINITE_TIME,
                orders: orders
            })
        });
    }

    async delete(order_id: number): Promise<void> {
        await fetch(`${this.DATABASE_URL}/orders/${order_id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    }

    async mark_as(order_id: number, status: OrderStatus): Promise<void> {
        switch (status) {
            case OrderStatus.POSTED:
                {
                    throw "Cannot mark the order as POSTED.";
                }
            case OrderStatus.READY:
                {
                    await fetch(`${this.DATABASE_URL}/orders/${order_id}`, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ready: Date.now()
                        })
                    });
                    return;
                }
            case OrderStatus.SERVED:
                {
                    await fetch(`${this.DATABASE_URL}/orders/${order_id}`, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            served: Date.now()
                        })
                    });
                    return;
                }
            case OrderStatus.PAID:
                {
                    await fetch(`${this.DATABASE_URL}/orders/${order_id}`, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            paid: Date.now()
                        })
                    });
                    return;
                }
        }
    }
}

/**
 * A database which is an instance of `OrdersDatabase`.
 * You can change it when you want to use others.
 */
export let ordersDatabase = new OrdersDatabase();
