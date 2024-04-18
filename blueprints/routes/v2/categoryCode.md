# Data Structure

## Types.CategoryCode.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.CategoryCode.Search

-   codeValue: `xxx` (string, required) - コード
-   name
    -   ja: `xxx` (string, optional) - 名称（日本語）
    -   en: `xxx` (string, optional) - 名称（英語）
-   image: `xxx` (string, optional) - イメージ
-   additionalProperty (array[Types.CategoryCode.PropertyValue], optional, fixed-type) - 追加特性

# Group 区分

## 区分検索 [/categoryCode/search{?page,limit,categorySetIdentifier,sellerId}]

### 区分検索[GET]

区分識別子

| type           | description  |
| :------------- | :----------- |
| ContentRatingType | レイティング区分 |
| SoundFormatType  | 音響方式タイプ |
| VideoFormatType  | 上映方式タイプ |

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   categorySetIdentifier: `ContentRatingType` (string, required) - 区分識別子
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)

    -   Attributes (array, fixed-type)
        -   (Types.CategoryCode.Search) - 区分

<!-- include(../../response/400.md) -->
