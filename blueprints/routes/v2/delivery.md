# Data Structure

# Group 配送

## 同期的に注文配送 [/deliver/sendOrder]

### 同期的に注文配送[POST]

作成された注文データに対して、同期的に注文を配送します(所有権が作成されます) すでに配送済の場合、何もしません。

-   Parameters

-   Request (application/json)

    -   Attributes
        -   object
            -   orderNumber: `xxx` (string, required) - 注文番号
            -   confirmationNumber: `xxx` (string, required) - 確認番号
        -   seller
            -   id: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

<!-- include(../../response/400.md) -->