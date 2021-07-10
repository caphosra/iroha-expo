import express from "express";

export interface IOrderInfo {
    order_id: number;
    table_id: number;
    posted: number;
    ready: number;
    served: number;
    paid: number;
    orders: number[];
}

const app = express();
let order_lists: IOrderInfo[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
    res.redirect("https://github.com/capra314cabra/iroha");
});

app.post("/orders", async (req, res) => {
    let body = req.body;

    console.log(`Received ${JSON.stringify(body)}`);

    const order_info = body as IOrderInfo;
    order_lists.push(order_info);

    res.status(201).send("The record was created correctly.");
});

app.get("/orders/posted", (_, res) => {
    const posted_lists = order_lists.filter((order) => {
        return order.ready > Date.now();
    });

    console.log("Got");

    res.status(200).send(posted_lists);
});

app.get("/orders/ready", (_, res) => {
    const ready_lists = order_lists.filter((order) => {
        return order.ready < Date.now() && order.served > Date.now();
    });

    console.log("Got");

    res.status(200).send(ready_lists);
});

app.get("/orders/served", (_, res) => {
    const served_lists = order_lists.filter((order) => {
        return order.served < Date.now() && order.paid > Date.now();
    });

    console.log("Got");

    res.status(200).send(served_lists);
});

app.get("/orders/paid", (_, res) => {
    const paid_lists = order_lists.filter((order) => {
        return order.paid < Date.now();
    });

    console.log("Got");

    res.status(200).send(paid_lists);
});

app.get("/orders/:id", (req, res) => {
    const request_id = Number(req.params.id);

    if (request_id) {
        const info = order_lists.filter((order) => {
            return order.order_id == request_id;
        })[0];

        res.status(200).send(info);
    }
    else {
        res.status(404).send("Not found the record you chose.");
    }
});

app.put("/orders/:id", (req, res) => {
    const request_id = Number(req.params.id);

    if (request_id) {
        const info_index = order_lists
            .map((order, index) => {
                return { order, index };
            })
            .find(({ order, index }) => {
                return order.order_id == request_id;
            })
            ?.index;

        if (info_index) {
            const ready = Number(req.body.ready);
            if (ready) {
                order_lists[info_index].ready = ready;

                console.log("The parameter named \"ready\" was updated.");
            }

            const served = Number(req.body.served);
            if (served) {
                order_lists[info_index].served = served;

                console.log("The parameter named \"served\" was updated.");
            }

            const paid = Number(req.body.paid);
            if (paid) {
                order_lists[info_index].paid = paid;

                console.log("The parameter named \"paid\" was updated.");
            }

            res.status(200).send("Successfully updated.");
        }
        else {
            res.status(404).send("Not found the record you chose.");
        }
    }
    else {
        res.status(404).send("Not found the record you chose.");
    }
});

app.delete("/orders/:id", (req, res) => {
    const request_id = Number(req.params.id);

    if (request_id) {
        const new_order_lists = order_lists.filter((order) => {
            return order.order_id != request_id;
        });

        order_lists = new_order_lists;

        res.status(200).send("Successfully deleted.");
    }
    else {
        res.status(404).send("Not found the record you chose.");
    }
});

app.get("/menu", (req, res) => {
    res.status(200).send([
        {
            menu_id: 0,
            menu_name: "ミネストローネ",
            price: 300
        },
        {
            menu_id: 1,
            menu_name: "クロックムッシュ",
            price: 300
        },
        {
            menu_id: 2,
            menu_name: "ブラウニー",
            price: 300
        },
        {
            menu_id: 3,
            menu_name: "スコーン",
            price: 300
        },
        {
            menu_id: 4,
            menu_name: "タルト",
            price: 300
        }
    ]);
});

app.listen(2021);

console.log("Server started.")
