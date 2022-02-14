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

## Me.CreditCard
+ cardSeq: `xxx` (string, required) - カード登録連番
+ cardName: `xxx` (string, required) - カード会社略称
+ cardNo: `xxx` (string, required) - カード番号
+ expire: `xxx` (string, required) - 有効期限
+ holderName: `xxx` (string, required) - 名義人

# Group 会員My所有権

## My予約 [/peole/me/ownershipInfos/EventService{?page,limit}]

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

## Myメンバーシップ [/peole/me/ownershipInfos/MembershipService{?page,limit}]

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

## Myペイメントカード [/peole/me/ownershipInfos/PaymentCard{?page,limit}]

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

# Group 会員Myクレジットカード

## Myクレジットカード [/peole/me/ownershipInfos/creditCards]

+ Parameters

### Myクレジットカード追加 [POST]
自分の所有するクレジットカードを追加します。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes
        + token:  `xxx` (string, required) - カードトークン

+ Response 201 (application/json)
    + Attributes (Me.CreditCard)

<!-- include(../response/400.md) -->

### Myクレジットカード検索 [GET]
自分の所有するクレジットカードを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.CreditCard) - クレジットカード

<!-- include(../response/400.md) -->

## Myクレジットカード削除 [/peole/me/ownershipInfos/creditCards/{cardSeq}]

+ Parameters
    + cardSeq: `xxx` (string, required) - カード登録連番

### Myクレジットカード削除 [DELETE]
自分の所有するクレジットカードを削除します。

+ Response 204

<!-- include(../response/400.md) -->

# Group 会員

## 会員削除 [/peole/me]

+ Parameters

### 会員削除 [DELETE]
会員(自分)を削除します。

+ Response 204

<!-- include(../response/400.md) -->
