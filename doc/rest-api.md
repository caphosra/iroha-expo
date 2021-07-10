# REST API 仕様書

Irohaは、以下のAPIを全て実装さえしていれば、どんなサーバー環境でもデータベースとして利用することができます。

サーバーのシステム移行をする際にはこのAPIをもう一度確認することを推奨します。

## サーバーの階層一覧

|相対パス|情報|GET|POST|PUT|DELETE|
|:---|:---|:---:|:---:|:---:|:---:|
|/|サーバーの情報|:heavy_check_mark:||||
|/orders|全ての注文|[:heavy_check_mark:]|:heavy_check_mark:|||
|/orders/:id|特定の注文|:heavy_check_mark:||:heavy_check_mark:|:heavy_check_mark:|
|/orders/posted|投稿された注文|:heavy_check_mark:||||
|/orders/ready|調理済の注文|:heavy_check_mark:||||
|/orders/served|提供済の注文|:heavy_check_mark:||||
|/orders/paid|支払い済の注文|:heavy_check_mark:||||
|/menu|全てのメニュー|:heavy_check_mark:|[:heavy_check_mark:]||[:heavy_check_mark:]|

- :heavy_check_mark: アプリで使用するためのMethod
- [:heavy_check_mark:] サーバー管理のためのMethod (**考えなしに使用しないこと**)

但し、`/orders/:id`は`:id`の部分を注文のIDで置き換えて使用してください。

## 各APIの仕様

## /

### GET

サーバーの説明を返します。

あくまでもサーバーに直接アクセスしようとした人がいた際の保険であるので、**実装しなくても動きます。**

```json5
//
// Parameters
//

//
// Returns
//
"string" // サーバーの説明
```

## /orders

### GET

サーバーにある全ての注文を返します。

#### :warning: 注意 :warning:

> 注文がどの状況にあるか把握している場合は、`/orders`より下の階層のAPIを呼んだ方が効率的です。少なくとも、Irohaのクライアント側で全ての注文を必要とする場面はないので、**アプリ内で使用することは推奨しません。**

```json5
//
// Parameters
//

//
// Returns
//
[
    {
        "order_id": "number", // 注文のID
        "table_id": "number", // 注文を入れたテーブル番号
        "posted": "number", // 注文された時刻
        "ready": "number", // 調理が完了した時刻
        "served": "number", // 料理が届けられた時刻
        "paid": "number", // 支払いが完了した時刻
        "orders": "number"[] // 注文内容
    }
]
```

### POST

サーバーに注文を送信します。

#### Parameters

```json5
//
// Parameters
//
{
    "order_id": "number", // 注文のID
    "table_id": "number", // 注文を入れたテーブル番号
    "posted": "number", // 注文された時刻
    "ready": "number", // 調理が完了した時刻
    "served": "number", // 料理が届けられた時刻
    "paid": "number", // 支払いが完了した時刻
    "orders": "number"[] // 注文内容
}

//
// Returns
//
```

## /orders/:id

### GET

指定されたIDの注文を返します。

```json5
//
// Parameters
//

//
// Returns
//
{
    "order_id": "number", // 注文のID
    "table_id": "number", // 注文を入れたテーブル番号
    "posted": "number", // 注文された時刻
    "ready": "number", // 調理が完了した時刻
    "served": "number", // 料理が届けられた時刻
    "paid": "number", // 支払いが完了した時刻
    "orders": "number"[] // 注文内容
}
```

### PUT

指定されたIDの注文を更新します。

それぞれの時刻を変更する操作は省略可能です。

```json5
//
// Parameters
//
{
    "ready": "number", // 調理が完了した時刻 (省略可能)
    "served": "number", // 料理が届けられた時刻 (省略可能)
    "paid": "number", // 支払いが完了した時刻 (省略可能)
}

//
// Returns
//
```

### DELETE

指定されたIDの注文を削除します。

```json5
//
// Parameters
//

//
// Returns
//
```

## /orders/posted

### GET

サーバーにある全ての投稿された注文で、かつ調理済みでない注文を返します。

```json5
//
// Parameters
//

//
// Returns
//
[
    {
        "order_id": "number", // 注文のID
        "table_id": "number", // 注文を入れたテーブル番号
        "posted": "number", // 注文された時刻
        "ready": "number", // 調理が完了した時刻
        "served": "number", // 料理が届けられた時刻
        "paid": "number", // 支払いが完了した時刻
        "orders": "number"[] // 注文内容
    }
]
```

## /orders/ready

### GET

サーバーにある全ての調理済みの注文で、かつ提供済みでない注文を返します。

```json5
//
// Parameters
//

//
// Returns
//
[
    {
        "order_id": "number", // 注文のID
        "table_id": "number", // 注文を入れたテーブル番号
        "posted": "number", // 注文された時刻
        "ready": "number", // 調理が完了した時刻
        "served": "number", // 料理が届けられた時刻
        "paid": "number", // 支払いが完了した時刻
        "orders": "number"[] // 注文内容
    }
]
```

## /orders/served

### GET

サーバーにある全ての提供済みの注文で、かつ支払済みでない注文を返します。

```json5
//
// Parameters
//

//
// Returns
//
[
    {
        "order_id": "number", // 注文のID
        "table_id": "number", // 注文を入れたテーブル番号
        "posted": "number", // 注文された時刻
        "ready": "number", // 調理が完了した時刻
        "served": "number", // 料理が届けられた時刻
        "paid": "number", // 支払いが完了した時刻
        "orders": "number"[] // 注文内容
    }
]
```

## /orders/paid

### GET

サーバーにある支払済みの注文を返します。

```json5
//
// Parameters
//

//
// Returns
//
[
    {
        "order_id": "number", // 注文のID
        "table_id": "number", // 注文を入れたテーブル番号
        "posted": "number", // 注文された時刻
        "ready": "number", // 調理が完了した時刻
        "served": "number", // 料理が届けられた時刻
        "paid": "number", // 支払いが完了した時刻
        "orders": "number"[] // 注文内容
    }
]
```

## /menu

### GET

サーバーにある全ての料理を返します。

```json5
//
// Parameters
//

//
// Returns
//
[
    {
        "menu_id": "number", // 料理のID
        "menu_name": "string", // 料理の名前
        "price": "number" // 料理の価格
    }
]
```

### POST

サーバーに料理を送信します。

#### :warning: 注意 :warning:

料理を変更することになるので、使用は初期設定時を除いて推奨されません。

```json5
//
// Parameters
//
{
    "menu_id": "number", // 料理のID
    "menu_name": "string", // 料理の名前
    "price": "number" // 料理の価格
}

//
// Returns
//
```

### DELETE

サーバーにある料理を削除します。

#### :warning: 注意 :warning:

料理を変更することになるので、使用は初期設定時を除いて推奨されません。

```json5
//
// Parameters
//
{
    "menu_id": "number" // 料理のID
}

//
// Returns
//
```
