# Data Structure

## Movies.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Movies.PropertyValue
+ name: `xxx` (string, required) - プロパティ名
+ value: `xxx` (string, required) - プロパティ値

## Movies.Movie
+ additionalProperty (array[Movies.PropertyValue], fixed-type) - 追加特性
+ contentRating: `G` (string, optional) - レイティング
+ datePublished: `2020-01-01T00:00:00Z` (string, optional) - 公開日
+ headline: `xxx` (string, optional) - サブタイトル
+ identifier: `xxx` (string, required) - コード
+ name: (Movies.MultilingualString, optional) - 名称
+ thumbnailUrl: `xxx` (string, optional) - サムネイルURL

# Group コンテンツ

## コンテンツ検索 [/creativeWorks/movie{?page,limit,datePublishedFrom,datePublishedThrough,offersAvailableFrom}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + datePublishedFrom: `2021-04-01T00:00:00Z` (string, optional) - 公開日時範囲(から)
    + datePublishedThrough: `2021-04-01T00:00:00Z` (string, optional) - 公開日時範囲(まで)
    + offersAvailableFrom: `2021-04-01T00:00:00Z` (string, optional) - 興行終了日時範囲(から)

### コンテンツ検索 [GET]
コンテンツを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Movies.Movie) - コンテンツ

<!-- include(../response/400.md) -->
