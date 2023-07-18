# Data Structure

## Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.AddOn

-   id: `xxx` (string, required) - アドオンオファー id

## Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer

-   id: `xxx` (string, required) - チケットオファー id
-   itemOffered
    -   serviceOutput
        -   reservedTicket
            -   seatNumber: `xxx` (string, required) - 座席コード
            -   seatSection: `xxx` (string, required) - セクションコード
-   addOn (array, optional, fixed-type)
    -   (Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.AddOn) - アドオンオファー

# Group 取引

## 取引開始 [/transaction/placeOrder/start]

### 取引開始[POST]

-   Parameters

-   Request (application/json)

    -   Attributes
        -   seller
            -   id: `xxx` (string, required) - 販売者 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format
        -   object
            -   passport
                -   token: `xxx` (string, optional) - パスポート token

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format

<!-- include(../../../response/400.md) -->

## 取引確定 [/transaction/placeOrder/confirm]

### 取引確定[PUT]

<!-- メールテンプレート変数

| variable                 | description |
| :----------------------- | :---------- |
| order.confirmationNumber | 確認番号    |
| order.orderNumber        | 注文番号    | -->

-   Parameters

-   Request (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id

-   Response 200 (application/json)

    -   Attributes
        -   confirmationNumber: `xxx` (string, required) - 確認番号
        -   orderNumber: `xxx` (string, required) - 注文番号

<!-- include(../../../response/400.md) -->

## 取引中止 [/transaction/placeOrder/cancel]

### 取引中止[PUT]

-   Parameters

-   Request (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id

-   Response 200

## イベントオファー承認 [/transaction/placeOrder/authorizeSeatReservation]

### イベントオファー承認[POST]

-   Parameters

-   Request (application/json)

    -   Attributes
        -   object
            -   reservationFor
                -   id: `xxx` (string, required) - イベント id
            -   acceptedOffer (array, fixed-type)
                -   (Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer) - チケットオファー
        -   purpose
            -   id: `xxx` (string, required) - 取引 id

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - アクション id

<!-- include(../../../response/400.md) -->

## イベントオファー承認取り消し [/transaction/placeOrder/voidSeatReservation]

### イベントオファー承認取り消し[PUT]

-   Parameters

-   Request (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - アクション id
        -   purpose
            -   id: `xxx` (string, required) - 取引 id

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->

## 取引人プロフィール設定 [/transaction/placeOrder/setProfile]

### 取引人プロフィール設定[PUT]

-   Parameters

-   Request (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   agent
            -   familyName: `xxx` (string, required) - 姓
            -   givenName: `xxx` (string, required) - 名
            -   email: `xxx@xxx.com` (string, required) - メールアドレス
            -   telephone: `+819012345678` (string, required) - 電話番号 E.164

-   Response 200

<!-- include(../../../response/400.md) -->
