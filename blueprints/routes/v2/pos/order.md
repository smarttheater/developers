# Data Structure

## Types.Order.Search.Customer.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Order.Search.PaymentMethod

-   name: `xxx` (string, required) - 決済方法名称
-   paymentMethodId: `xxx` (string, optional) - 決済id
-   accountId: `xxx` (string, optional) - アカウントid
-   totalPaymentDue (object, optional)
    -   currency: `xxx` (string, optional) - 通貨
    -   value: `1000` (number, optional) - 値
-   paymentMethod (object, optional)
    -   identifier: `xxx` (string, optional) - 決済方法区分コード

## Types.Order.Search

-   orderDate: `xxx` (string, optional) - 注文日時 ISO 8601 date format
-   confirmationNumber: `xxx` (string, required) - 確認番号
-   orderNumber: `xxx` (string, required) - 注文番号
-   price: `1000` (number, required) - 注文金額
-   name: `xxx` (string, required) - 注文名称
-   orderStatus: `OrderDelivered` (enum, optional) - 注文ステータス
    -   `OrderDelivered` (string) - 注文済み
    -   `OrderReturned` (string) - 注文返品済み
-   sellerId: `xxx` (string, required) - 販売者id
-   customer
    -   additionalProperty (array[Types.Order.Search.Customer.PropertyValue], fixed-type, optional) - 追加特性
    -   email: `xxx` (string, optional) - メールアドレス
    -   givenName: `xxx` (string, optional) - 名
    -   familyName: `xxx` (string, optional) - 姓
    -   telephone: `+819012345678` (string, optional) - 電話番号 E.164
-   paymentMethods (array[Types.Order.Search.PaymentMethod], fixed-type, optional) - 決済情報

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
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Order.Search) - 注文`

<!-- include(../../../response/400.md) -->
