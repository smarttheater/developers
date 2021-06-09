# Data Structure

## Places.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Places.PropertyValue
+ name: `xxx` (string, required) - プロパティ名
+ value: `xxx` (string, required) - プロパティ値

## Places.MovieTheater
+ additionalProperty (array[Performances.PropertyValue], fixed-type) - 追加特性
+ branchCode: `xxx` (string, required) - コード
+ name: (Places.MultilingualString, optional) - 名称

# Group 施設

## 施設検索 [/places/MovieTheater{?page,limit}]

+ Parameters
    + page: `2` (number, optional) - ページ
      + Default: `1`
    + limit: `25` (number, optional) - 最大取得件数
      + Default: `100`

### 施設検索 [GET]
施設を検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Places.MovieTheater) - コンテンツ

<!-- include(../response/400.md) -->
