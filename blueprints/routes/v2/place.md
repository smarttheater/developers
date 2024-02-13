# Data Structure

## Types.Place.SearchMovieTheaters.HasEntranceGate

-   name (object, optional)
    -   ja: `xxx` (string, optional) - 名称（日本語）
    -   en: `xxx` (string, optional) - 名称（英語）
-   identifier: `xxx` (string, required) - コード

## Types.Place.SearchMovieTheaters

-   id: `xxx` (string, required) - 施設 id
-   name
    -   ja: `xxx` (string, required) - 施設名称（日本語）
    -   en: `xxx` (string, required) - 施設名称（英語）
-   branchCode: `xxx` (string, required) - 施設コード
-   parentOrganization
    -   id: `xxx` (string, required) - 親組織 id
-   hasEntranceGate (array[Types.Place.SearchMovieTheaters.HasEntranceGate], fixed-type) - 入場ゲート

## Types.Place.SearchScreeningRooms

-   name
    -   ja: `xxx` (string, required) - ルーム名称（日本語）
    -   en: `xxx` (string, required) - ルーム名称（英語）
-   branchCode: `xxx` (string, required) - ルームコード
-   openSeatingAllowed: true (boolean , optional) - 自由席フラグ

## Types.Place.HasPOS

-   branchCode: `xxx` (string, required) - POSコード
-   name: `xxx` (string, required) - POS名称

# Group 施設

## 施設検索 [/place/searchMovieTheaters{?page,limit,sellerId}]

### 施設検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Place.SearchMovieTheaters) - 施設

<!-- include(../../response/400.md) -->

## ルーム検索 [/place/searchScreeningRooms{?page,limit,sellerId}]

### ルーム検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Place.SearchScreeningRooms) - ルーム

<!-- include(../../response/400.md) -->
