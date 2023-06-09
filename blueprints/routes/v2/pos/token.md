# Data Structure

# Group トークン

## トークンを取得 [/v2/projects/{id}/token/getToken]

### トークンを取得[POST]

-   Parameters

    -   id: `xxx` (string, required) - プロジェクト id

-   Request (application/json)

    -   Attributes
        -   code: `xxx` (string, required) - 注文コード

-   Response 200 (application/json)
    -   Attributes
            -   token: `xxx` (string, required) - トークン

<!-- include(../../../response/400.md) -->
