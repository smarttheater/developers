# Group OAuth2

## トークンエンドポイント [/oauth2/token]

### トークンエンドポイント [POST]
[OAuth2](https://tools.ietf.org/html/rfc6749) に準拠したトークンエンドポイントです。
トークンエンドポイントは、ユーザーのトークンを取得します。

::: note
エンドポイントは、

`https://auth.example.com/oauth2/token`

となります。

開発前に、運営側よりエンドポイント、認証情報を取得してください。
:::

**利用可能な認可タイプ**

+ `authorization_code`

::: note
アプリケーション側でアクセストークンの有効期間を管理し、適宜再取得してください。
:::


+ Request 認可コード (application/x-www-form-urlencoded)
    +  Headers
        Authorization: Basic ABC123
    + Attributes
        + `grant_type`: `authorization_code` (string, required) - 認証タイプ
        + `redirect_uri`: `xxx` (string, required) - /oauth2/authorize で authorization_code を取得するために使用されたものと同じ redirect_uri である必要があります。
        + `code`: `xxx` (string, required) - grant_typeがauthorization_codeの場合は必須です。

+ Response 200 (application/json)
    + Attributes
        + access_token: `JWT` (string, required) - アクセストークン
        + token_type: `Bearer` (string, required) - 発行されたトークンタイプ
        + expires_in: 1800 (number, required) - アクセストークンの有効期間
        + refresh_token: `xxx` (string, optional) - grant_typeがauthorization_codeの場合にのみrefresh_tokeを返します。

