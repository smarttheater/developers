# Data Structure

## Movies.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Movies.PropertyValue
+ name: `xxx` (string, required) - プロパティ名
+ value: `xxx` (string, required) - プロパティ値

## Movies.Movie
+ additionalProperty (array[Performances.PropertyValue], fixed-type) - 追加特性
+ contentRating: `G` (string) - レイティング
+ datePublished: `2020-01-01T00:00:00Z` (string) - 公開日
+ headline: `xxx` (string) - サブタイトル
+ identifier: `xxx` (string, required) - コード
+ name: (Performances.MultilingualString, optional) - 名称

# Group CreativeWorks

## コンテンツ検索 [/creativeWorks/movie{?page,limit}]

+ Parameters
    + page: `2` (number, optional) - ページ
      + Default: `1`
    + limit: `25` (number, optional) - 最大取得件数
      + Default: `100`

### コンテンツ検索 [GET]
コンテンツを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Movies.Movie) - コンテンツ

<!-- include(../response/400.md) -->
