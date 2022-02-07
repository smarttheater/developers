# Data Structure

## Transactions.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Transactions.TicketType
+ charge: 1800 (number, required) - 価格
+ name: (Transactions.MultilingualString, required) - オファー名称
+ id: `001` (string, required) - オファーコード
+ available_num: 1 (number, required) - 在庫数

## Transactions.Performance
+ id: `xxxxxxxxxxxx` (string, required) - イベントID
+ attributes (object)
    + day: `20171025` (string, required) - 開催日(YYYYMMDD)
    + open_time: `1210` (string, required) - 開場時刻(hhmm)
    + start_time: `1210` (string, required) - 開場時刻(hhmm)
    + end_time: `1230` (string, required) - 開演時刻(hhmm)
    + seat_status: `35` (string, required) - 残席数
    + tour_number: `213` (string, required) - ツアーナンバー
    + wheelchair_available: 1 (number, required) - 車椅子残数
    + ticket_types (array[Transactions.TicketType], fixed-type) - オファーリスト(イベントID指定での検索時のみ)
    + online_sales_status: `Normal` (string, required) - 販売ステータス

## Transactions.EventReservation
+ qr_str: `TTT281430206052148-0` (string, required) - 予約QR文字列
+ payment_no: `56686` (string, required) - 確認番号
+ performance: `171222001001010915` (string, required) - イベントID

## Transactions.SeatReservationOffer
+ ticket_type: `001` (string, required) - オファーコード
+ watcher_name: `メモメモ` (string, required) - 予約追加テキスト

## Transactions.Customer
+ telephone: `+819012345678` (string, required) - 電話番号(E164フォーマット)


# Group 取引 - LegacyPOS専用

## イベント検索 w/ 車椅子 [/performances{?page,limit,day,performanceId}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + day: `20110101` (string, optional) - 開催日
    + performanceId: `xxxxxxxxxxxx` (string, optional) - イベントID

### イベント検索 w/ 車椅子 [GET]
イベントを検索します。
検索結果のうち、オファーリスト(ticket_types)については、イベントID指定での検索時のみ含まれます。

example:
```no-highlight
/performances?day=20110101&limit=5
```

+ Response 200 (application/json)
    + Attributes
        + data: (array[Transactions.Performance], fixed-type) - イベントリスト

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
        + result: (object, optional)
            + order: (object, optional)
                + price: 1800 (number, required) - 注文金額

+ Response 201 (application/json)
    + Attributes
        + orderNumber: `xxxxxxxx` (string, required) - 注文番号
        + eventReservations (array[Transactions.EventReservation], fixed-type) - 予約リスト

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->



## 注文返品 [/transactions/returnOrder/confirm]

### 注文返品 [POST]
注文番号と購入者情報から注文の返品処理を開始します。
該当注文がない場合、ステータスコード404を返却します。

+ Request (application/json)
    + Headers
        Authentication: Bearer JWT

    + Attributes
        + orderNumber: `xxxxxxxx` (string, required) - 注文番号
        + customer: (Transactions.Customer, fixed-type) - 購入者情報(注文番号指定の場合、必須)

+ Response 201 (application/json)
    + Attributes
        + id: `1234567890abcdefghijklmn` (string, required) - 取引ID

<!-- include(../response/400.md) -->
<!-- include(../response/404.md) -->
<!-- include(../response/409.md) -->
