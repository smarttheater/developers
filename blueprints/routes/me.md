# Data Structure

## Me.Reservation
+ id: `xxx` (string, required) - ID
+ reservationNumber: `xxx` (string, required) - 予約番号

## Me.Membership
+ identifier: `xxx` (string, required) - メンバーシップコード

## Me.PaymentCard
+ identifier: `xxx` (string, required) - ペイメントカードコード

## Me.OwnershipInfoOfReservation
+ id: `xxx` (string, required) - 所有権ID
+ ownedFrom: `2021-04-01T00:00:00Z` (string) - 所有開始日時
+ ownedThrough: `2021-04-01T00:00:00Z` (string) - 所有終了日時
+ typeOfGood: (Me.Reservation, required) - 所有物

## Me.OwnershipInfoOfMembership
+ id: `xxx` (string, required) - 所有権ID
+ ownedFrom: `2021-04-01T00:00:00Z` (string) - 所有開始日時
+ ownedThrough: `2021-04-01T00:00:00Z` (string) - 所有終了日時
+ typeOfGood: (Me.Membership, required) - 所有物

## Me.OwnershipInfoOfPaymentCard
+ id: `xxx` (string, required) - 所有権ID
+ ownedFrom: `2021-04-01T00:00:00Z` (string) - 所有開始日時
+ ownedThrough: `2021-04-01T00:00:00Z` (string) - 所有終了日時
+ typeOfGood: (Me.PaymentCard, required) - 所有物

# Group 会員My所有権

## My予約検索 [/peole/me/ownershipInfos/EventService{?page,limit}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### My予約検索 [GET]
自分の所有する予約を検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.OwnershipInfoOfReservation) - 所有権

<!-- include(../response/400.md) -->

## Myメンバーシップ検索 [/peole/me/ownershipInfos/MembershipService{?page,limit}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### Myメンバーシップ検索 [GET]
自分の所有するメンバーシップを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.OwnershipInfoOfMembership) - 所有権

<!-- include(../response/400.md) -->

## Myペイメントカード検索 [/peole/me/ownershipInfos/PaymentCard{?page,limit}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### Myペイメントカード検索 [GET]
自分の所有するペイメントカードを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.OwnershipInfoOfPaymentCard) - 所有権

<!-- include(../response/400.md) -->
