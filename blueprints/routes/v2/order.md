# Data Structure

## Types.Order.FindByConfirmationNumber.Customer.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Order.FindByConfirmationNumber.PaymentMethod

-   name: `xxx` (string, required) - 決済方法名称
-   paymentMethodId: `xxx` (string, optional) - 決済id
-   accountId: `xxx` (string, optional) - アカウントid
-   totalPaymentDue (object, optional)
    -   currency: `xxx` (string, optional) - 通貨
    -   value: `1000` (number, optional) - 値
-   paymentMethod (object, optional)
    -   identifier: `xxx` (string, optional) - 決済方法区分コード

## Types.Order.FindByConfirmationNumber

-   orderDate: `xxx` (string, optional) - 注文日時 ISO 8601 date format
-   confirmationNumber: `xxx` (string, required) - 確認番号
-   orderNumber: `xxx` (string, required) - 注文番号
-   price: `1000` (number, required) - 注文金額
-   orderStatus: `OrderDelivered` (enum, optional) - 注文ステータス
    -   `OrderDelivered` (string) - 注文済み
    -   `OrderReturned` (string) - 注文返品済み
-   customer
    -   additionalProperty (array[Types.Order.FindByConfirmationNumber.Customer.PropertyValue], fixed-type, optional) - 追加特性
    -   email: `xxx` (string, optional) - メールアドレス
    -   givenName: `xxx` (string, optional) - 名
    -   familyName: `xxx` (string, optional) - 姓
    -   telephone: `+819012345678` (string, optional) - 電話番号 E.164
-   paymentMethods (array[Types.Order.FindByConfirmationNumber.PaymentMethod], fixed-type, optional) - 決済情報

## Types.Order.SearchAcceptedOffersByConfirmationNumber.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Order.SearchAcceptedOffersByConfirmationNumber.PriceComponent

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
    -   additionalProperty (array[Types.Order.SearchAcceptedOffersByConfirmationNumber.PropertyValue], fixed-type, optional) - 追加特性
    -   reservationFor
        -   id: `xxx` (string, required) - イベントid 
        -   name (object, optional)
            -   ja: `xxx` (string, optional) - イベント名称（日本語）
            -   en: `xxx` (string, optional) - イベント名称（英語）
        -   startDate: `2023-01-01T00:00:00.000Z` (string, required) - 開始日時 ISO 8601 date format
        -   endDate: `2023-01-01T00:00:00.000Z` (string, required) - 終了日時 ISO 8601 date format
        -   doorTime: `2023-01-01T00:00:00.000Z` (string, optional) - 開場日時 ISO 8601 date format
        -   location
            -   name (object, optional)
                -   ja: `xxx` (string, optional) - ルーム名称（日本語）
                -   en: `xxx` (string, optional) - ルーム名称（英語）
                -   branchCode: `xxx` (string, required) - ルームコード
    -   reservedTicket
        -   ticketType
            -   identifier: `xxx` (string, required) - オファーコード
            -   name (object, optional)
                -   ja: `xxx` (string, optional) - オファー名称（日本語）
                -   en: `xxx` (string, optional) - オファー名称（英語）
        -   ticketedSeat (object, optional)
            -   seatNumber: `xxx` (string, required) - 座席コード
            -   seatSection: `xxx` (string, required) - 座席セクション
            -   seatingType (array, optional, fixed-type)
                -   `xxx` (string) - 座席タイプ
    -   priceSpecification
        -   priceComponent (array, required, fixed-type)
            -   (Types.Order.SearchAcceptedOffersByConfirmationNumber.PriceComponent) - 価格要素

# Group 注文

## 確認番号で注文検索 [/order/findByConfirmationNumber{?confirmationNumber,telephone}]

### 確認番号で注文検索[GET]

注文ステータス

| type           | description  |
| :------------- | :----------- |
| OrderDelivered | 注文配送済み |
| OrderReturned  | 注文返品済み |

-   Parameters

    -   confirmationNumber: `xxx` (string, required) - 確認番号
    -   telephone: `+819012345678` (string, required) - 購入者電話番号 E.164
    -   sellerId: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Order.FindByConfirmationNumber) - 注文

<!-- include(../../response/400.md) -->

## 注文アイテム検索 [/order/searchAcceptedOffersByConfirmationNumber{?page,limit,confirmationNumber,orderNumber,sellerId}]

### 注文アイテム検索[GET]

価格要素タイプ

| type                               | description              |
| :--------------------------------- | :----------------------- |
| UnitPriceSpecification             | 単価仕様                 |
| CategoryCodeChargeSpecification    | カテゴリーコード加算仕様 |
| MovieTicketTypeChargeSpecification | ムビチケ加算仕様         |

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   confirmationNumber: `xxx` (string, required) - 確認番号
    -   orderNumber: `xxx` (string, required) - 注文番号
    -   sellerId: `xxx` (string, required) - 販売者 id

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
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format

<!-- include(../../response/400.md) -->

## 属性更新 [/order/updateChangeableAttributes]

### 属性更新[POST]

-   Parameters

-   Request (application/json)

    -   Attributes
        -   orderNumber: `xxx` (string, required) - 注文番号
        -   confirmationNumber: `xxx` (string, required) - 確認番号
        -   seller
            -   id: `xxx` (string, required) - 販売者 id
        -   name: `xxx` (string, optional) - 注文名称

-   Response 200 (application/json)

<!-- include(../../response/400.md) -->