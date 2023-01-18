# Data Structure

## Performances.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Performances.Language
+ name: `Japanese` (string, optional) - 名称

## Performances.PropertyValue
+ name: `xxx` (string, required) - プロパティ名
+ value: `xxx` (string, required) - プロパティ値

## Performances.Event
+ additionalProperty (array[Performances.PropertyValue], fixed-type) - 追加特性
+ doorTime: `2021-04-01T00:00:00Z` (string) - 開場日時
+ endDate: `2021-04-01T00:00:00Z` (string) - 終了日時
+ eventStatus: `xxx` (string) - イベントステータス
+ id: `xxxxxxxxxxxx` (string, required) - イベントID
+ location (object)
    + address: (Performances.MultilingualString, optional) - アドレス
    + branchCode: `xxx` (string) - ルームコード
    + name: (Performances.MultilingualString, optional) - 名称
+ maximumAttendeeCapacity: 1 (number, optional) - 最大収容席数
+ name: (Performances.MultilingualString, optional) - 名称
+ offers (object)
    + availabilityStarts: `2021-04-01T00:00:00Z` (string, optional) - 公開開始日時(非会員オンライン取引)
    + validFrom: `2021-04-01T00:00:00Z` (string, optional) - 販売開始日時(非会員オンライン取引)
    + validThrough: `2021-04-01T00:00:00Z` (string, optional) - 販売終了日時(非会員オンライン取引)
    + availabilityStartsToMembers: `2021-04-01T00:00:00Z` (string, optional) - 公開開始日時(会員オンライン取引)
    + validFromForMembers: `2021-04-01T00:00:00Z` (string, optional) - 販売開始日時(会員オンライン取引)
    + validThroughForMembers: `2021-04-01T00:00:00Z` (string, optional) - 販売終了日時(会員オンライン取引)
+ startDate: `2021-04-01T00:00:00Z` (string) - 開始日時
+ superEvent (object)
    + id: `xxxxxxxxxxxx` (string, required) - 施設コンテンツID
    + description: (Performances.MultilingualString, optional) - 補足説明
    + dubLanguage: (Performances.Language, optional) - 吹替言語
    + subtitleLanguage: (Performances.Language, optional) - 字幕言語
+ remainingAttendeeCapacity: 1 (number, optional) - 残席数
+ workPerformed (object)
    + identifier: `xxx` (string, required) - コンテンツコード
    + contentRating: `G` (string, optional) - レイティング
    + duration: `PT15M` (string, optional) - 上映時間

## Performances.ScreeningEventSeries
+ additionalProperty (array[Performances.PropertyValue], fixed-type) - 追加特性
+ id: `xxxxxxxxxxxx` (string, required) - 施設コンテンツID
+ name: (Performances.MultilingualString, optional) - 名称
+ endDate: `2021-04-01T00:00:00Z` (string, optional) - 終了日時
+ startDate: `2021-04-01T00:00:00Z` (string, optional) - 開始日時
+ videoFormat (array, fixed-type) - 上映方式
    + `2D` (string)

## Performances.SeatOffer
+ availability: `InStock` (string, required) - 利用可能性(値については利用可能性タイプを参照)

## Performances.Seat
+ branchCode: `xxx` (string, required) - 座席コード
+ containedInPlace (object)
    + branchCode: `xxx` (string, required) - セクションコード
+ offers (array[Performances.SeatOffer], fixed-type) - オファー

# Group イベント

## 施設コンテンツ検索 [/events/ScreeningEventSeries{?page,limit,locationBranchCode,workPerformedIdentifier,startFrom,startThrough,endFrom,endThrough}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + locationBranchCode: `xxx` (string, optional) - 施設コード
    + workPerformedIdentifier: `xxx` (string, optional) - コンテンツコード
    + startFrom: `2021-04-01T00:00:00Z` (string, optional) - 開始日時範囲(から)
    + startThrough: `2021-04-01T00:00:00Z` (string, optional) - 開始日時範囲(まで)
    + endFrom: `2021-04-01T00:00:00Z` (string, optional) - 終了日時範囲(から)
    + endThrough: `2021-04-01T00:00:00Z` (string, optional) - 終了日時範囲(まで)

### 施設コンテンツ検索 [GET]
イベントを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Performances.ScreeningEventSeries) - 施設コンテンツ

<!-- include(../response/400.md) -->

## イベント検索 [/events/ScreeningEvent{?page,limit,startFrom,startThrough,superEventLocationBranchCode,superEventWorkPerformedIdentifier}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + startFrom: `2021-04-01T00:00:00Z` (string, optional) - 開始日時範囲(から)
    + startThrough: `2021-04-01T00:00:00Z` (string, optional) - 開始日時範囲(まで)
    + superEventLocationBranchCode: `xxx` (string, optional) - 施設コード
    + superEventWorkPerformedIdentifier: `xxx` (string, optional) - コンテンツコード

### イベント検索 [GET]
イベントを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Performances.Event) - イベント

<!-- include(../response/400.md) -->

## イベント座席検索 [/events/ScreeningEvent/{eventId}/seats{?page,limit}]

+ Parameters
    + eventId: `xxxx` (string, required) - イベントID
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### イベント座席検索 [GET]
イベントに対する座席を検索します。

**利用可能性タイプ**

| 値         | 説明     |
| :--------- | :------- |
| InStock    | 在庫あり |
| OutOfStock | 在庫切れ |

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Performances.Seat) - 座席

<!-- include(../response/400.md) -->
