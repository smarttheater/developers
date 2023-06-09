# Data Structure

# Group 予約

## 予約に入場記録を追加 [/v2/projects/{id}/reservation/useByToken]

### 予約に入場記録を追加[POST]

-   Parameters

    -   id: `xxx` (string, required) - プロジェクト id

-   Request (application/json)

    -   Attributes
        -   object
            -   id: `xxx` (string, required) - 予約 id
        -   instrument
            -   token: `xxx` (string, required) - トークン

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->

## 予約に対する入場アクションを検索 [/v2/projects/{id}/reservation/searchUseActions{?reservationId}]

### 予約に対する入場アクションを検索[GET]

-   Parameters

    -   id: `xxx` (string, required) - プロジェクト id
    -   reservationId: `xxx` (string, required) - 予約 id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   id: `xxx` (string, required) - アクション id

<!-- include(../../../response/400.md) -->
