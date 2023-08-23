# Data Structure

# Group トークン

## トークンを取得 [/token/getToken]

### トークンを取得[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   code: `xxx` (string, required) - 注文コード
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)
    -   Attributes
        -   token: `xxx` (string, required) - トークン

<!-- include(../../../response/400.md) -->
