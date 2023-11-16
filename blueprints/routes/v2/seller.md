# Data Structure

## Types.Seller.Search

-   id: `xxx` (string, optional) - 販売者 id
-   name
    -   ja: `xxx` (string, required) - 販売者名称（日本語）
    -   en: `xxx` (string, required) - 販売者名称（英語）
-   branchCode: `xxx` (string, required) - 販売者コード

## Types.Seller.SearchPaymentAccepted

-   name
    -   ja: `xxx` (string, required) - 名称（日本語）
    -   en: `xxx` (string, required) - 名称（英語）
-   codeValue: `xxx` (string, required) - 区分コード

## Types.Seller.SearchPaymentServices

-   name
    -   ja: `xxx` (string, required) - 名称（日本語）
    -   en: `xxx` (string, required) - 名称（英語）
-   id: `xxx` (string, optional) - 決済サービスid
-   serviceType
    -   codeValue: `xxx` (string, required) - 区分コード

# Group 販売者

## 販売者検索 [/seller/search{?page,limit}]

### 販売者検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Seller.Search) - 販売者

<!-- include(../../response/400.md) -->

## 対応決済方法区分検索 [/seller/searchPaymentAccepted{?page,limit,id}]

### 対応決済方法区分検索[GET]

-   Parameters

    -   id: `xxx` (string, required) - 販売者id
    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Seller.SearchPaymentAccepted) - 対応決済方法区分

<!-- include(../../response/400.md) -->

## 提供決済サービス検索 [/seller/searchPaymentServices{?page,limit,id}]

### 提供決済サービス検索[GET]

-   Parameters

    -   id: `xxx` (string, required) - 販売者id
    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Seller.SearchPaymentServices) - 提供決済サービス

<!-- include(../../response/400.md) -->
