# SQLのテーブルの構造

PostgreSQLを使うことを前提としたテーブルの説明です.

もし, 他のプラットフォームを使いたい場合は, 適当なinterfaceを継承してclassを作って既存のものを置き換えれば動作するので適当にどうぞ.

 ## Menu table

```sql
CREATE TABLE menu(
    menu_id int,
    menu_name text,
    price int
);
```

|要素|型|内容|
|:---|:---|:---|
|menu_id|`int`|メニューのID. 当然かぶりは許されません.|
|menu_name|`text`|メニュー名.|
|price|`int`|メニューの価格.|

 ## Orders table

```sql
CREATE TABLE orders(
    order_id int,
    table_id int,
    posted timestamp,
    ready timestamp,
    served timestamp,
    paid timestamp,
    orders int[]
);
```

|要素|型|内容|
|:---|:---|:---|
|order_id|`int`|注文のID. 当然かぶりは許されません.|
|table_id|`int`|テーブルのID. 性質上, かぶりは許されます.|
|posted|`timestamp`|注文を受注した時刻.|
|ready|`timestamp`|料理が提供可能になった時刻.|
|served|`timestamp`|料理を届けた時刻.|
|paid|`timestamp`|会計を済ませた時刻.|
|orders|`int[]`|注文された料理のIDのリスト. Menuテーブルと併せて使うこと.|

**但し, 使っていない時間のパラメータはinfinityで埋めること.**
