# Data Structure

## Types.Order.FindByConfirmationNumber

-   orderDate: `xxx` (string, optional) - 注文日時 ISO 8601 date format
-   confirmationNumber: `xxx` (string, required) - 確認番号
-   orderNumber: `xxx` (string, required) - 注文番号
-   price: `1000` (number, required) - 注文金額
-   orderStatus: `OrderDelivered` (enum, optional) - 注文ステータス OrderDelivered(注文済み) or OrderReturned(注文返品済み)
    -   `OrderDelivered` (string) - 注文済み
    -   `OrderReturned` (string) - 注文返品済み

## Types.Order.SearchAcceptedOffersByConfirmationNumber.priceComponent

-   name (object, optional)
    -   ja: `xxx` (string, optional) - 価格要素名称（日本語）
    -   en: `xxx` (string, optional) - 価格要素名称（英語）
-   price: `1000` (number, required) - 価格要素価格
-   typeOf: `UnitPriceSpecification` (enum, required) - 価格要素タイプ CategoryCodeChargeSpecification (カテゴリーコード加算仕様) or MovieTicketTypeChargeSpecification (ムビチケ加算仕様) or UnitPriceSpecification (単価仕様)
    -   `UnitPriceSpecification` (string) - 単価仕様
    -   `CategoryCodeChargeSpecification` (string) - カテゴリーコード加算仕様
    -   `MovieTicketTypeChargeSpecification` (string) - ムビチケ加算仕様
-   referenceQuantity

    -   value: `1` (number, optional) - 価格要素基準数量

## Types.Order.SearchAcceptedOffersByConfirmationNumber

-   itemOffered (object, optional)
    -   id: `xxx` (number, required) - 予約 id
    -   reservationNumber: `xxx` (number, required) - 予約番号
    -   reservedTicket
        -   ticketType
            -   identifier: `xxx` (string, required) - オファーコード
            -   name (object, optional)
                -   ja: `xxx` (string, optional) - オファー名称（日本語）
                -   en: `xxx` (string, optional) - オファー名称（英語）
        -   ticketedSeat (object, optional)
            -   seatNumber: `xxx` (string, required) - 座席コード
            <!-- -   seatRow: `xxx` (string, required) - 座席行` -->
            -   seatSection: `xxx` (string, required) - 座席セクション
    -   priceSpecification
        -   priceComponent (array, required, fixed-type)
            -   (Types.Order.SearchAcceptedOffersByConfirmationNumber.priceComponent) - 価格要素

# Group 注文
        

## 確認番号で注文検索 [/order/findByConfirmationNumber{?confirmationNumber,telephone}]

### 確認番号で注文検索[GET]

価格要素タイプ

| type                               | description              |
| :--------------------------------- | :----------------------- |
| UnitPriceSpecification             | 単価仕様                 |
| CategoryCodeChargeSpecification    | カテゴリーコード加算仕様 |
| MovieTicketTypeChargeSpecification | ムビチケ加算仕様         |

-   Parameters

    -   confirmationNumber: `xxx` (string, required) - 確認番号
    -   telephone: `+819012345678` (string, required) - 購入者電話番号 E.164

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Order.FindByConfirmationNumber) - 注文

<!-- include(../../response/400.md) -->

## 注文アイテム検索 [/order/searchAcceptedOffersByConfirmationNumber{?page,limit,confirmationNumber,orderNumber}]

### 注文アイテム検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   confirmationNumber: `xxx` (string, required) - 確認番号
    -   orderNumber: `xxx` (string, required) - 注文番号

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Order.SearchAcceptedOffersByConfirmationNumber) - 注文アイテム

<!-- include(../../response/400.md) -->

## 注文コード発行 [/order/authorize]

### 注文コード発行[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   orderNumber: `xxx` (string, required) - 注文番号
        -   expiresInSeconds: `2023-01-01T00:00:00.000Z` (string, required) - コード期限 ISO 8601 date format
        -   customer
            -   telephone: `+819012345678` (string, optional) - 購入者電話番号 E.164

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format

<!-- include(../../response/400.md) -->
