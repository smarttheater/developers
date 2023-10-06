# Data Structure

## Types.CreativeWork.SearchMovies

-   id: `xxx` (string, optional) - コンテンツid
-   identifier: `xxx` (string, optional) - コンテンツコード
-   name
    -   ja: `xxx` (string, required) - コンテンツ名称（日本語）
    -   en: `xxx` (string, required) - コンテンツ名称（英語）
-   contentRating: `xxx` (string, required) - レイティング区分コード
-   datePublished: `xxx` (string, required) - 公開日 ISO 8601 date format
-   duration: `xxx` (string, required) - 上映時間 ISO 8601 date format
-   thumbnailUrl: `xxx` (string, required) - サムネイルURL


# Group コンテンツ

## コンテンツ検索 [/seller/searchMovies{?page,limit,identifiers}]

### コンテンツ検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   identifiers: `xxx,xxx` (string, optional) - コンテンツコード 10件まで

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.CreativeWork.SearchMovies) - コンテンツ

<!-- include(../../response/400.md) -->
