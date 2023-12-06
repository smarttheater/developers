# Data Structure

## Types.Place.HasPOS

-   branchCode: `xxx` (string, required) - POSコード
-   name: `xxx` (string, required) - POS名称

# Group 施設

## 施設のPOS検索 [/place/hasPOS/search{?page,limit,sellerId,operaterId}]

### 施設のPOS検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   sellerId: `xxx` (string, required) - 販売者id
    -   operaterId: `xxx` (string, required) - 施設id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.Place.HasPOS) - ルーム

<!-- include(../../../response/400.md) -->
