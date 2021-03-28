# Data Structure

## Transactions.EventReservation
+ qr_str: `TTT281430206052148-0` (string, required) - 予約QR文字列
+ payment_no: `56686` (string, required) - 確認番号
+ performance: `171222001001010915` (string, required) - イベントID

## Transactions.SeatReservationOffer
+ ticket_type: `001` (string, required) - オファーコード
+ watcher_name: `メモメモ` (string, required) - 予約追加テキスト

## Transactions.Customer
+ telephone: `+819012345678` (string, required) - 電話番号(E164フォーマット)


# Group Transactions

## 注文取引開始 [/transactions/placeOrder/start]

### 注文取引開始 [POST]
期限指定で注文取引を開始します。取引の期限が切れると、取引中で作成された仮予約は取り消され、取引を確定することはできなくなります。
アプリケーションの購入フローで十分な期間を想定し、期限をセットしてください。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes
        + expires:  `2017-05-10T07:42:25Z` (string, required) - 取引期限

+ Response 201 (application/json)
    + Attributes
        + id: `1234567890abcdefghijklmn` (string, required) - 取引ID
        + seller: (object, required) - 販売者
        + expires: `2017-05-10T07:42:25Z` (string, required) - 取引期限
        + startDate: `2017-05-10T07:42:25Z` (string, required) - 取引開始日時

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->



## 予約オファー承認 [/transactions/placeOrder/{transactionId}/actions/authorize/seatReservation]

+ Parameters
    + transactionId: `1234567890abcdefghijklmn` (string, required) - 取引ID

### 予約オファー承認 [POST]
イベント指定で座席を仮予約します。複数座席予約の場合は、座席数分のオファーを指定してください。 
本リクエストのレスポンスに含まれるIDは、承認取消の際に必要になります。アプリケーション側で大切に管理してください。
空席がない場合、ステータスコード409を返却します。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes
        + performance_id: `xxxxxxxxxxxx` (string, required) - イベントID
        + offers: (array[Transactions.SeatReservationOffer], fixed-type) - 受け入れるオファーリスト

+ Response 201 (application/json)
    + Attributes
        + id: `1234567890abcdefghijklmn` (string, required) - 承認アクションID

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->
<!-- include(../response/409.md) -->



## 予約オファー承認取消 [/transactions/placeOrder/{transactionId}/actions/authorize/seatReservation/{actionId}]

+ Parameters
    + transactionId: `1234567890abcdefghijklmn` (string, required) - 取引ID
    + actionId: `1234567890abcdefghijklmn` (string, required) - 承認アクションID

### 予約オファー承認取消 [DELETE]
オファー承認を取り消します。仮予約は取り消されます。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

+ Response 204

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->



## 購入者プロフィール設定 [/transactions/placeOrder/{transactionId}/customerContact]

+ Parameters
    + transactionId: `1234567890abcdefghijklmn` (string, required) - 取引ID

### 購入者プロフィール設定 [PUT]
購入者のプロフィールを設定します。

::: note
購入者プロフィールが不要の場合、適宜固定値を渡してください。
:::

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes
        + address: `JP` (string) - 国コード
        + age: `15` (string, required) - 年代
        + email: `hello@example.com` (string, required) - メールアドレス
        + first_name: `めい` (string, required) - 名
        + gender: `1` (string, required) - 性別
        + last_name: `せい` (string, required) - 姓
        + tel: `09012345678` (string, required) - 電話番号

+ Response 201 (application/json)
    + Attributes
        + address: `JP` (string, required) - 住所
        + age: `15` (string, required) - 年代
        + email: `hello@example.com` (string, required) - メールアドレス
        + first_name: `めい` (string, required) - 名
        + gender: `1` (string, required) - 性別
        + last_name: `せい` (string, required) - 姓
        + tel: `+819012345678` (string, required) - 電話番号

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->



## 注文取引確定 [/transactions/placeOrder/{transactionId}/confirm]

+ Parameters
    + transactionId: `1234567890abcdefghijklmn` (string, required) - 取引ID

### 注文取引確定 [POST]
注文取引を確定します。
期限を超過していた場合、ステータスコード404を返却します。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes

+ Response 201 (application/json)
    + Attributes
        + orderNumber: `xxxxxxxx` (string, required) - 注文番号
        + eventReservations (array[Transactions.EventReservation], fixed-type) - 予約リスト

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->



## 注文返品 [/transactions/returnOrder/confirm]

### 注文返品 [POST]
注文番号と購入者情報、あるいは、イベント開催日と確認番号(非推奨)、から注文の返品処理を開始します。
イベント開催日と確認番号の組み合わせは、2021-04-16T15:00:00Zをもって廃止となります。
該当注文がない場合、ステータスコード404を返却します。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes
        + orderNumber: `xxxxxxxx` (string) - 注文番号
        + customer: (Transactions.Customer, fixed-type) - 購入者情報(注文番号指定の場合、必須)
        + performance_day: `20170511` (string) - イベント開催日(非推奨)
        + payment_no: `123456` (string) - 確認番号(イベント開催日指定の場合、必須)(非推奨)

+ Response 201 (application/json)
    + Attributes
        + id: `1234567890abcdefghijklmn` (string, required) - 取引ID

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->
<!-- include(../response/409.md) -->
