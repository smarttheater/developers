# Data Structure

# Group 予約

## 予約を使用する [/reservation/useByToken]

### 予約を使用する[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   object
            -   id: `xxx` (string, required) - 予約 id
        -   instrument
            -   token: `xxx` (string, required) - トークン

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->

## 予約に対するアクションを検索 [/reservation/searchUseActions{?id}]

### 予約に対するアクションを検索[GET]

-   Parameters

    -   id: `xxx` (string, required) - 予約 id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   startDate: `2023-06-01T00:00:00.000Z` (string, required) - 予約使用日時 ISO 8601 date format

<!-- include(../../../response/400.md) -->
