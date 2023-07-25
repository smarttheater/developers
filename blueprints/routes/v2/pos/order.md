# Data Structure

## Types.Order.Search

-   orderDate: `xxx` (string, optional) - 注文日時 ISO 8601 date format
-   confirmationNumber: `xxx` (string, required) - 確認番号
-   orderNumber: `xxx` (string, required) - 注文番号
-   price: `1000` (number, required) - 注文金額
-   orderStatus: `OrderDelivered` (enum, optional) - 注文ステータス
    -   `OrderDelivered` (string) - 注文済み
    -   `OrderReturned` (string) - 注文返品済み
-   sellerId: `xxx` (string, required) - 販売者id

# Group 注文

## 注文検索 [/order/search{?page,limit,orderDateLte,orderDateGte,sellerId}]

### 注文検索[GET]

注文ステータス

| type           | description  |
| :------------- | :----------- |
| OrderDelivered | 注文配送済み |
| OrderReturned  | 注文返品済み |

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   orderDateGte: `2023-01-01T00:00:00.000Z` (string, optional) - 注文日時範囲(から)ISO 8601 date format
    -   orderDateLte: `2023-01-01T00:00:00.000Z` (string, optional) - 注文日時範囲(まで)ISO 8601 date format
    -   orderNumbers: `xxx,xxx` (string, optional) - 注文番号 10件まで

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Order.Search) - 注文`

<!-- include(../../../response/400.md) -->
