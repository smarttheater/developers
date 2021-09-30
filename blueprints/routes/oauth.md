# Group OAuth

## アクセストークン [/oauth2/token]

### アクセストークン発行 [POST]
[OAuth2](https://tools.ietf.org/html/rfc6749) に準拠したトークンエンドポイントです。

::: note
エンドポイントは、

`https://auth.example.com/oauth2/token`

となります。

開発前に、運営側よりエンドポイント、認証情報を取得してください。
:::

**利用可能な認可タイプ**

+ `client_credentials`

::: note
返却値には、`access_token`と`expires_in`が含まれます。

アプリケーション側でアクセストークンの有効期間を管理し、適宜再取得してください。
:::

+ Request クライアント認証 (application/x-www-form-urlencoded)
    +  Headers
        Authorization: Basic ABC123
    + Attributes
        + `grant_type`: `client_credencials` (string, required) - 認証タイプ(固定値)
        + `state`: `state123456789` (string, required)
            クライアント状態(クライアント側で現在のユーザー状態を表す文字列を送信してください。例えばセッションIDなどです)

+ Response 200 (application/json)
    + Attributes
        + access_token: `JWT` (string, required) - アクセストークン
        + token_type: `Bearer` (string, required) - 発行されたトークンタイプ
        + expires_in: 1800 (number, required) - アクセストークンの有効期間

<!-- include(../response/400.md) -->
