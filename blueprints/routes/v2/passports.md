# Group パスポート

## パスポート取得 [/v2/projects/{id}/passports]

### パスポート取得[POST]

スコープ

| type                             | description |
| :------------------------------- | :---------- |
| Transaction:PlaceOrder:販売者 id | 取引        |

-   Parameters

    -   id: `xxx` (string, required) - プロジェクト id

-   Request (application/json)

    -   Attributes
        -   scope: `Transaction:PlaceOrder:xxx` (string, required) - スコープ

-   Response 200 (application/json)

    -   Attributes
        -   token: `xxx` (string, required) - パスポートトークン

<!-- include(../../response/400.md) -->
