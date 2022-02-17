# Data Structure

## Me.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Me.ReservationForLocation
+ branchCode: `xxx` (string, required) - コード
+ name: (Me.MultilingualString, optional) - 名称

## Me.MovieTheater
+ branchCode: `xxx` (string, required) - コード
+ name: (Me.MultilingualString, optional) - 名称

## Me.WorkPerformed
+ identifier: `xxx` (string, required) - コード
+ name: (string, required) - 名称

## Me.ReservationForSuperEvent
+ kanaName: `xxx` (string, optional) - カナ名称
+ name: (Me.MultilingualString, required) - 名称
+ location: (Me.MovieTheater, required) - 施設
+ workPerformed: (Me.WorkPerformed, required) - コンテンツ

## Me.ReservationFor
+ id: `xxx` (string, required) - ID
+ startDate: `2021-04-01T00:00:00Z` (string) - 開始日時
+ endDate: `2021-04-01T00:00:00Z` (string) - 終了日時
+ name: (Me.MultilingualString, optional) - 名称
+ location: (Me.ReservationForLocation, optional) - ルーム
+ superEvent: (Me.ReservationForSuperEvent, optional) - 施設コンテンツ

## Me.Offer
+ identifier: `xxx` (string, required) - コード
+ name: (Me.MultilingualString, optional) - 名称

## Me.COATicketInfo
+ salePrice: 10 (number, required) - 金額
+ spseatKbn: `xxx` (string, required) - 特別席区分
+ spseatAdd2: 10 (number, required) - 特別席加算額２
+ ticketName: `xxx` (string, required) - チケット名

## Me.TicketedSeat
+ seatNumber: `xxx` (string, required) - 座席コード
+ seatSection: `xxx` (string, required) - セクションコード

## Me.ReservedTicket
+ ticketedSeat: (Me.TicketedSeat, optional) - 座席(座席指定の場合のみ)
+ ticketType: (Me.Offer, required) - オファー
+ ticketToken: `xxx` (string, optional) - チケットトークン
+ coaTicketInfo: (Me.COATicketInfo, optional) - COAチケット情報

## Me.Reservation
+ id: `xxx` (string, required) - ID
+ reservationNumber: `xxx` (string, required) - 予約番号
+ bookingTime: `2021-04-01T00:00:00Z` (string) - 予約日時
+ reservationFor: (Me.ReservationFor, required) - 予約イベント
+ reservedTicket: (Me.ReservedTicket, required) - 予約チケット

## Me.Membership
+ identifier: `xxx` (string, required) - メンバーシップコード

## Me.PaymentAccount
+ balance: 10 (number, required) - 残高

## Me.PaymentCard
+ identifier: `xxx` (string, required) - ペイメントカードコード
+ paymentAccount: (Me.PaymentAccount, required) - 口座

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

## Me.MonetaryAmount
+ currency: `xxx` (string, required) - 通貨
+ value: 10 (number, required) - 金額値

## Me.MoneyTransferActionPurpose
+ typeOf: `xxx` (string, required) - 取引タイプ

## Me.MoneyTransferAction
+ amount: (Me.MonetaryAmount, required) - 金額
+ description: `xxx` (string, optional) - 説明
+ purpose: (Me.MoneyTransferActionPurpose, required) - 取引
+ startDate: `2021-04-01T00:00:00Z` (string, required) - 取引開始日時

## Me.CreditCard
+ cardSeq: `xxx` (string, required) - カード登録連番
+ cardName: `xxx` (string, required) - カード会社略称
+ cardNo: `xxx` (string, required) - カード番号
+ expire: `xxx` (string, required) - 有効期限
+ holderName: `xxx` (string, required) - 名義人

# Group 会員所有権

## 予約 [/people/me/ownershipInfos/EventService{?page,limit,ownedFrom,ownedThrough}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + ownedFrom: `2021-04-01T00:00:00Z` (string, optional) - 所有期間(から)
    + ownedThrough: `2021-04-01T00:00:00Z` (string, optional) - 所有期間(まで)

### 予約検索 [GET]
自分の所有する予約を検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.OwnershipInfoOfReservation) - 所有権

<!-- include(../response/400.md) -->

## メンバーシップ [/people/me/ownershipInfos/MembershipService{?page,limit,ownedFrom,ownedThrough}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + ownedFrom: `2021-04-01T00:00:00Z` (string, optional) - 所有期間(から)
    + ownedThrough: `2021-04-01T00:00:00Z` (string, optional) - 所有期間(まで)

### メンバーシップ検索 [GET]
自分の所有するメンバーシップを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.OwnershipInfoOfMembership) - 所有権

<!-- include(../response/400.md) -->

## ペイメントカード [/people/me/ownershipInfos/PaymentCard{?page,limit,ownedFrom,ownedThrough}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + ownedFrom: `2021-04-01T00:00:00Z` (string, optional) - 所有期間(から)
    + ownedThrough: `2021-04-01T00:00:00Z` (string, optional) - 所有期間(まで)

### ペイメントカード検索 [GET]
自分の所有するペイメントカードを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.OwnershipInfoOfPaymentCard) - 所有権

<!-- include(../response/400.md) -->

## ペイメントカード入出金 [/people/me/ownershipInfos/PaymentCard/{ownershipInfoId}/actions/moneyTransfer{?page,limit}]

+ Parameters
    + ownershipInfoId: `xxxx` (string, required) - 所有権ID
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### ペイメントカード入出金検索 [GET]
自分の所有するペイメントカードの入出金履歴を検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.MoneyTransferAction) - 入出金

<!-- include(../response/400.md) -->

## 所有権削除 [/people/me/ownershipInfos/{ownershipInfoId}]

+ Parameters
    + ownershipInfoId: `xxxx` (string, required) - 所有権ID

### 所有権削除 [DELETE]
所有権を削除します。

+ Response 204

<!-- include(../response/400.md) -->

# Group 会員クレジットカード

## クレジットカード [/people/me/ownershipInfos/creditCards]

+ Parameters

### クレジットカード追加 [POST]
自分の所有するクレジットカードを追加します。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes
        + token:  `xxx` (string, required) - カードトークン

+ Response 201 (application/json)
    + Attributes (Me.CreditCard)

<!-- include(../response/400.md) -->

### クレジットカード検索 [GET]
自分の所有するクレジットカードを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Me.CreditCard) - クレジットカード

<!-- include(../response/400.md) -->

## クレジットカード削除 [/people/me/ownershipInfos/creditCards/{cardSeq}]

+ Parameters
    + cardSeq: `xxx` (string, required) - カード登録連番

### クレジットカード削除 [DELETE]
自分の所有するクレジットカードを削除します。

+ Response 204

<!-- include(../response/400.md) -->

# Group 会員

## 会員削除 [/people/me]

+ Parameters

### 会員削除 [DELETE]
会員(自分)を削除します。

+ Response 204

<!-- include(../response/400.md) -->
