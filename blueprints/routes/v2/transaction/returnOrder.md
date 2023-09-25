# Data Structure

## Types.Transaction.ReturnOrder.Start.Object.Order

-   orderNumber: `xxx` (string, required) - 注文番号
-   confirmationNumber: `xxx` (string, required) - 確認番号

## Types.Transaction.ReturnOrder.Confirm.SendEmailMessage

-   object
    -   about: `返品完了のお知らせ` (string, required) - 件名
    -   template: `| 返品完了しました。\n| 確認番号: #{order.confirmationNumber}\n| 注文番号: #{order.orderNumber}` (string, required) - 本文テンプレート
            

# Group 返品取引

## 取引開始 [/transaction/returnOrder/start]

### 取引開始[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format
        -   object
           -   order (array, fixed-type)
                -   (Types.Transaction.ReturnOrder.Start.Object.Order) - 注文
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format

<!-- include(../../../response/400.md) -->

## 取引確定 [/transaction/returnOrder/confirm]

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
        -   potentialActions (optional)
            -   returnOrder (optional)
                -   potentialActions (optional)
                    -   sendEmailMessage (array, fixed-type)
                        -   (Types.Transaction.ReturnOrder.Confirm.SendEmailMessage) - メール設定
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->

