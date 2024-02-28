# Data Structure

# Group 予約


## コードによる予約照会 [/reservation/findByCode]

### コードによる予約照会[POST]

予約ステータス

| type           | description  |
| :------------- | :----------- |
| ReservationConfirmed | 予約確認済み |
| ReservationCancelled  | 予約キャンセル済み |

-   Parameters

-   Request (application/json)

    -   Attributes
        -   object (required)
            -   id: `xxx` (string, required) - 予約id
        -   instrument (required)
            -   code: `xxx` (string, required) - 注文コード
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 予約id
        -   reservationStatus: `ReservationConfirmed` (string, required) - 予約ステータス
        -   reservedTicket (required)
            -   ticketType (required)
                -   identifier: `xxx` (string, required) - オファーコード
                -   name (object, optional)
                    -   ja: `xxx` (string, optional) - オファー名称（日本語）

<!-- include(../../response/400.md) -->