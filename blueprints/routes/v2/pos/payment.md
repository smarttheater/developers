# Group 決済

## 対面決済承認 [/payment/authorizeAnyPayment]

### 対面決済承認[POST]

-   Parameters


-   Request (application/json)

    -   Attributes
        -   purpose
            -   id: `xxx` (string, required) - 取引 id
        -   object
            -   amount: `1000` (number, required) - 決済金額
            -   paymentMethod: `xxx` (string, required) - 決済方法区分コード
            -   issuedThrough
                -   id: `xxx` (string, required) - 決済サービス id
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

    -   Attributes
        -   id: `xxx` (string, required) - 決済承認 id

<!-- include(../../../response/400.md) -->

## 決済承認取り消し [/payment/voidTransaction]

### 決済承認取り消し[POST]

決済承認タイプ

| type        | description      |
| :---------- | :--------------- |
| CreditCard  | クレジットカード |
| MovieTicket | ムビチケ         |
| FaceToFace  | 対面決済         |

-   Parameters


-   Request (application/json)

    -   Attributes
        -   purpose
            -   id: `xxx` (string, required) - 取引 id
        -   id: `xxx` (string, required) - 決済承認 id
        -   object
            -   typeOf: (enum, required) - 決済承認タイプ
                -   `CreditCard` (string) - クレジットカード
                -   `MovieTicket` (string) - ムビチケ
                -   `FaceToFace` (string) - 対面決済
        -   seller
            -   id: `xxx` (string, required) - 販売者 id

-   Response 200 (application/json)

<!-- include(../../../response/400.md) -->
