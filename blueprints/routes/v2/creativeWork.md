# Data Structure

## Types.CreativeWork.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.CreativeWork.SearchMovies

-   id: `xxx` (string, optional) - コンテンツid
-   identifier: `xxx` (string, optional) - コンテンツコード
-   name
    -   ja: `xxx` (string, required) - コンテンツ名称（日本語）
    -   en: `xxx` (string, required) - コンテンツ名称（英語）
-   contentRating: `xxx` (string, required) - レイティング区分コード
-   datePublished: `xxx` (string, required) - 公開日 ISO 8601 date format
-   duration: `PT15M` (string, required) - 上映時間 (https://en.wikipedia.org/wiki/ISO_8601#Durations)
-   thumbnailUrl: `xxx` (string, required) - サムネイルURL
-   additionalProperty (array[Types.CreativeWork.PropertyValue], optional, fixed-type) - 追加特性


# Group コンテンツ

## コンテンツ検索 [/creativeWork/searchMovies{?page,limit,identifiers,sellerId}]

### コンテンツ検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   identifiers: `xxx,xxx` (string, optional) - コンテンツコード 10件まで
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.CreativeWork.SearchMovies) - コンテンツ

<!-- include(../../response/400.md) -->
