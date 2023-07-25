# Data Structure

## Types.Reservation.UseAction

-   startDate: `2023-06-01T00:00:00.000Z` (string, required) - 予約使用日時 ISO 8601 date format

## Types.Reservation.Search

-   id: `xxx` (string, optional) - 予約 id
-   bookingTime: `xxx` (string, optional) - 予約日時 ISO 8601 date format

# Group 予約

## 予約を使用する [/reservation/useByToken]

### 予約を使用する[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   object
            -   id: `xxx` (string, required) - 予約 id
        -   instrument
            -   token: `xxx` (string, required) - トークン
        -   seller
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

## 予約検索 [/reservation/search{?page,limit,bookingFrom,bookingThrough}]

### 予約検索[GET]

予約ステータス

| type           | description  |
| :------------- | :----------- |
| ReservationCancelled | 予約済み |
| ReservationCancelled  | 予約キャンセル済み |

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   bookingFrom: `2023-06-01T00:00:00.000Z` (string, optional) - 予約日時範囲(から) ISO 8601 date format
    -   bookingThrough: `2023-06-01T00:00:00.000Z` (string, optional) - 予約日時範囲(まで) ISO 8601 date format
    -   ids: `xxx,xxx` (string, optional) - 予約id 10件まで

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Reservation.Search) - 予約`
        

<!-- include(../../../response/400.md) -->
