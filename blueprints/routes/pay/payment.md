# Group 決済

## クレジットカード決済承認 [/payment/creditcard]

### クレジットカード決済承認[POST]

指定したリダイレクトURLへ決済承認idを伴ってアプリにリダイレクトします。

```
Location: redirectUrl?id=xxx
```

-   Request (application/x-www-form-urlencoded)

    -   Attributes
        -   accessToken: `xxx` (string, required) - アクセストークン
        -   amount: `1000` (number, required) - 決済金額
        -   projectId: `xxx` (string, required) - プロジェクトid
        -   redirectUrl: `https://xxx` (string, required) - リダイレクトURL
        -   sellerId: `xxx` (string, required) - 販売者id
        -   transactionId: `xxx` (string, required) - 取引id

## ムビチケ決済承認 [/payment/movieticket]

### ムビチケ決済承認[POST]

指定したリダイレクトURLへ決済承認idを伴ってアプリにリダイレクトします。

```
Location: redirectUrl?id=xxx
```

-   Request (application/x-www-form-urlencoded)

    -   Attributes
        -   accessToken: `xxx` (string, required) - アクセストークン
        -   projectId: `xxx` (string, required) - プロジェクトid
        -   redirectUrl: `https://xxx` (string, required) - リダイレクトURL
        -   sellerId: `xxx` (string, required) - 販売者id
        -   transactionId: `xxx` (string, required) - 取引id
        -   eventId: `xxx` (string, required) - イベントid
        -   paymentMethodCode: `xxx` (string, required) - 決済方法区分コード
        -   paymentCardCode: `xxx` (string, required) - 決済カード区分コード
        -   seatNumber: `xxx` (string, required) - 座席コード
        -   seatSection: `xxx` (string, required) - セクションコード
