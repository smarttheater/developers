# Data Structure

## Types.Transaction.ReturnOrder.Start.Object.Order

-   orderNumber: `xxx` (string, required) - 注文番号
-   confirmationNumber: `xxx` (string, required) - 確認番号
            

# Group 返品取引

## 取引開始 [/v2/projects/{id}/transaction/returnOrder/start]

### 取引開始[POST]

-   Parameters

    -   id: `xxx` (string, required) - プロジェクト id

-   Request (application/json)

    -   Attributes
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format
        -   object
           -   order (array, fixed-type)
                -   (Types.Transaction.ReturnOrder.Start.Object.Order) - 注文

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id
        -   expires: `2023-01-01T00:00:00.000Z` (string, required) - 取引期限 ISO 8601 date format

<!-- include(../../../response/400.md) -->

## 取引確定 [/v2/projects/{id}/transaction/returnOrder/confirm]

### 取引確定[POST]

-   Parameters

    -   id: `xxx` (string, required) - プロジェクト id

-   Request (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 取引 id

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->

