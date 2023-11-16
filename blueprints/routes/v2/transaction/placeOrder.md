# Data Structure

## Types.Transaction.PlaceOrder.Start.Agent.Identifier

-   name: `xxx` (string, required) - プロパティ名 (最小長 8)
-   value: `xxx` (string, required) - プロパティ値

## Types.Transaction.PlaceOrder.SetProfile.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.AddOn

-   id: `xxx` (string, required) - アドオンオファー id
-   priceSpecification
    -   referenceQuantity
        -   value: `1` (number, required) - 数量指定

## Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.AppliesToMovieTicket

-   identifier: `xxx` (string, required) - 適用決済カード識別子
-   serviceOutput (required)
    -   typeOf: `xxx` (string, required) - 決済方法区分

## Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.ItemOffered.ServiceOutput.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer

-   id: `xxx` (string, required) - チケットオファー id
-   itemOffered
    -   serviceOutput
        -   reservedTicket
            -   ticketedSeat
                -   seatNumber: `xxx` (string, required) - 座席コード
                -   seatSection: `xxx` (string, required) - セクションコード
                -   seatingType (array, optional, fixed-type)
                    -   `xxx` (string) - 座席タイプ
        -   additionalProperty (array[Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.ItemOffered.ServiceOutput.PropertyValue], fixed-type, optional) - 追加特性
-   addOn (array, optional, fixed-type)
    -   (Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.AddOn) - アドオンオファー
-   priceSpecification (optional)
    -   appliesToMovieTicket (array, optional, fixed-type)
        -   (Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer.AppliesToMovieTicket) - ムビチケオファー

# Group 取引

## 取引開始 [/transaction/placeOrder/start]

### 取引開始[POST]

購入者情報予約語

| type                | description                |
| :------------------ | :------------------------- |
| userAgent           | ユーザーエージェント       |
| application:version | アプリケーションバージョン |
| application:posId   | POS コード                 |
| application:posName | POS 名称                   |

-   Parameters

-   Request (application/json)

    -   Attributes
        -   seller
            -   id: `xxx` (string, required) - 販売者 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format
        -   object
            -   passport
                -   token: `xxx` (string, optional) - パスポート token
        -   seller
            -   id: `xxx` (string, required) - 販売者 id
        -   agent
            -   identifier (array[Types.Transaction.PlaceOrder.Start.Agent.Identifier], fixed-type) - 購入者情報

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format

<!-- include(../../../response/400.md) -->

## 取引確定 [/transaction/placeOrder/confirm]

### 取引確定[PUT]

メール本文をカスタマイズしたい場合、PUG テンプレートを指定

参考 -> https://pugjs.org/api/getting-started.html

挿入変数として下記を使用できます。

| variable                 | description |
| :----------------------- | :---------- |
| order.confirmationNumber | 確認番号    |
| order.orderNumber        | 注文番号    |

-   Parameters

-   Request (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   sendEmailMessage: true (boolean, required) - 注文配送メール送信フラグ
        -   email: (optional)
            -   about: `予約完了のお知らせ` (string, required) - 件名
            -   template: `| ご購入ありがとうございます。\n| 確認番号: #{order.confirmationNumber}\n| 注文番号: #{order.orderNumber}` (string, required) - 本文テンプレート
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

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
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200

## イベントオファー承認 [/transaction/placeOrder/authorizeSeatReservation]

### イベントオファー承認[POST]

-   Parameters

-   Request (application/json)

    -   Attributes
        -   object (required)
            -   reservationFor (required)
                -   id: `xxx` (string, required) - イベント id
            -   acceptedOffer (array, required, fixed-type)
                -   (Types.Transaction.PlaceOrder.AuthorizeSeatReservation.AcceptedOffer) - チケットオファー
        -   purpose (required)
            -   id: `xxx` (string, required) - 取引 id
        -   seller (required)
            -   id: `xxx` (string, required) - 販売者 id

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
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

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
            -   additionalProperty (array[Types.Transaction.PlaceOrder.SetProfile.PropertyValue], fixed-type) - 追加特性
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200

<!-- include(../../../response/400.md) -->
