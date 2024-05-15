# Data Structure

## Types.Reservation.UseAction

-   startDate: `2023-06-01T00:00:00.000Z` (string, required) - 予約使用日時 ISO 8601 date format
-   location (optional) - 場所
    -  identifier: `xxx` (string, optional) - コード

## Types.Reservation.Search.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Reservation.Search.PriceComponent

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

## Types.Reservation.Search

-   id: `xxx` (string, optional) - 予約 id
-   bookingTime: `xxx` (string, optional) - 予約日時 ISO 8601 date format
-   checkedIn: true (boolean, optional) - 注文コード発行フラグ
-   attended: true (boolean, optional) - 予約使用フラグ
-   additionalProperty (array[Types.Reservation.Search.PropertyValue], fixed-type, optional) - 追加特性
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
-   price
    -   priceComponent (array, required, fixed-type)
        -   (Types.Reservation.Search.PriceComponent) - 価格要素

# Group 予約

## 予約を使用する [/reservation/useByToken]

### 予約を使用する[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   object (required)
            -   id: `xxx` (string, required) - 予約 id
        -   instrument (required)
            -   token: `xxx` (string, required) - トークン
        -   location (optional) - 場所
            -   identifier: `xxx` (string, optional) - コード
        -   seller (required)
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->

## 予約に対するアクションを検索 [/reservation/searchUseActions{?id,sellerId}]

### 予約に対するアクションを検索[GET]

-   Parameters

    -   id: `xxx` (string, required) - 予約 id
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Reservation.UseAction) - 予約アクション`

<!-- include(../../../response/400.md) -->

## 予約検索 [/reservation/search{?page,limit,bookingFrom,bookingThrough,ids,reservationForIds,sellerId}]

### 予約検索[GET]

予約ステータス

| type           | description  |
| :------------- | :----------- |
| ReservationCancelled | 予約済み |
| ReservationCancelled  | 予約キャンセル済み |

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1`
    -   limit: `10` (number, optional) - 最大取得件数 20件まで
        -   Default: `20`
    -   bookingFrom: `2023-06-01T00:00:00.000Z` (string, optional) - 予約日時範囲(から) ISO 8601 date format
    -   bookingThrough: `2023-06-01T00:00:00.000Z` (string, optional) - 予約日時範囲(まで) ISO 8601 date format
    -   ids: `xxx,xxx` (string, optional) - 予約id 10件まで
    -   reservationForIds: `xxx,xxx` (string, optional) - イベントid 10件まで
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Reservation.Search) - 予約`
        
<!-- include(../../../response/400.md) -->

## 予約キャンセル [/reservation/cancel]

### 予約キャンセル[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   agent
            -   name: `xxx` (string, required) - 取消人名称
        -   object
            -   id: `xxx` (string, required) - 予約id
        -   seller
            -   id: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->
