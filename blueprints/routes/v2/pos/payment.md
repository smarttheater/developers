# Data Structure

## Types.Payment.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Payment.AuthorizeMovieTicket.MovieTicket

-   typeOf: `xxx` (string, required) - 決済方法区分コード
-   category
    -   codeValue: `xxx` (string, required) - カードの種類
-   identifier: `xxx` (string, required) - 識別子
-   accessCode: `xxx` (string, required) - pinコード
-   serviceType: `xxx` (string, required) - 決済カード区分コード
-   serviceOutput
    -   reservationFor
        -   id: `xxx` (string, required) - イベントid
-   reservedTicket
    -   ticketedSeat
        -   seatingType (array, optional, fixed-type)
            -   `xxx` (string) - 座席タイプ
        -   seatNumber: `xxx` (string, required) - 座席コード
        -   seatSection: `xxx` (string, required) - セクションコード

# Group 決済

## 対面決済承認 [/payment/authorizeAnyPayment]

### 対面決済承認[POST]

-   Request (application/json)

    -   Attributes
        -   purpose
            -   id: `xxx` (string, required) - 取引 id
        -   object
            -   amount: `1000` (number, required) - 決済金額
            -   paymentMethod: `xxx` (string, required) - 決済方法区分コード
            -   additionalProperty (array[Types.Payment.PropertyValue], optional, fixed-type) - 追加特性
            -   seller
                -   id: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)
    -   Attributes
        -   id: `xxx` (string, required) - 決済承認id 
        -   typeOf: `xxx` (string, required) - 決済承認タイプ

<!-- include(../../../response/400.md) -->

