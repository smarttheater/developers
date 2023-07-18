# Data Structure

## Types.Product.SearchOffers.PriceComponent

-   name (object, optional)
    -   ja: `xxx` (string, optional) - 価格要素名称（日本語）
    -   en: `xxx` (string, optional) - 価格要素名称（英語）
-   price: `1000` (number, required) - 価格要素価格
-   typeOf: `UnitPriceSpecification` (enum, required) - 価格要素タイプ CategoryCodeChargeSpecification (カテゴリーコード加算仕様) or MovieTicketTypeChargeSpecification (ムビチケ加算仕様) or UnitPriceSpecification (単価仕様)
    -   `UnitPriceSpecification` (string) - 単価仕様
    -   `CategoryCodeChargeSpecification` (string) - カテゴリーコード加算仕様
    -   `MovieTicketTypeChargeSpecification` (string) - ムビチケ加算仕様
-   referenceQuantity (object, optional)
    -   value: `1` (number, optional) - 価格要素基準数量
-   appliesToMovieTicket (object, optional)
    -   serviceType: `1` (number, required) - 決済カード区分コード
    -   serviceOutput
        -   serviceType: `1` (number, required) - 決済方法区分コード

## Types.Product.SearchOffers

-   id: `xxx` (string, required) - オファー id
-   name
    -   ja: `xxx` (string, optional) - オファー名称（日本語）
    -   en: `xxx` (string, optional) - オファー名称（英語）
-   description
    -   ja: `xxx` (string, optional) - オファー説明（日本語）
    -   en: `xxx` (string, optional) - オファー説明（英語）
-   priceSpecification
    -   priceComponent (array, required, fixed-type)
        -   (Types.Product.SearchOffers.PriceComponent) - 価格要素

# Group プロダクト

## オファー検索 [/product/searchOffers{?page,limit,itemOfferedId,sellerId}]

### オファー検索[GET]

価格要素タイプ

| type                               | description              |
| :--------------------------------- | :----------------------- |
| UnitPriceSpecification             | 単価仕様                 |
| CategoryCodeChargeSpecification    | カテゴリーコード加算仕様 |
| MovieTicketTypeChargeSpecification | ムビチケ加算仕様         |

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   itemOfferedId: `xxx` (string, optional) - アイテムId
    -   sellerId: `xxx` (string, optional) - 販売者Id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Product.SearchOffers) - オファー

<!-- include(../../response/400.md) -->
