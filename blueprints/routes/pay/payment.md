# Group 決済

## クレジットカード決済承認 [/payment/creditcard]

### クレジットカード決済承認[POST]

指定したリダイレクトURLへ決済承認idを伴ってアプリにリダイレクトします。

```
Location: redirectUrl?id=xxx
```

※アクセストークンの期限は取引期限より長いものをセットしてください。

-   Request (application/x-www-form-urlencoded)

    -   Attributes
        -   accessToken: `xxx` (string, required) - アクセストークン
        -   amount: `1000` (number, required) - 決済金額
        -   projectId: `xxx` (string, required) - プロジェクトid
        -   redirectUrl: `https://xxx` (string, required) - リダイレクトURL
        -   sellerId: `xxx` (string, required) - 販売者id
        -   transactionId: `xxx` (string, required) - 取引id


