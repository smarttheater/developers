# Data Structure

## Performances.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Performances.TicketType
+ charge: 1800 (number, required) - 価格
+ name: (Performances.MultilingualString, required) - オファー名称
+ id: `001` (string, required) - オファーコード
+ available_num: 1 (number, required) - 在庫数

## Performances.Language
+ name: `Japanese` (string, optional) - 名称

## Performances.PropertyValue
+ name: `xxx` (string, required) - プロパティ名
+ value: `xxx` (string, required) - プロパティ値

## Performances.Performance
+ id: `xxxxxxxxxxxx` (string, required) - イベントID
+ attributes (object)
    + day: `20171025` (string, required) - 開催日(YYYYMMDD)
    + open_time: `1210` (string, required) - 開場時刻(hhmm)
    + start_time: `1210` (string, required) - 開場時刻(hhmm)
    + end_time: `1230` (string, required) - 開演時刻(hhmm)
    + seat_status: `35` (string, required) - 残席数
    + tour_number: `213` (string, required) - ツアーナンバー
    + wheelchair_available: 1 (number, required) - 車椅子残数
    + ticket_types (array[Performances.TicketType], fixed-type) - オファーリスト(イベントID指定での検索時のみ)
    + online_sales_status: `Normal` (string, required) - 販売ステータス

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
+ maximumAttendeeCapacity: 1 (number) - 最大収容席数
+ offers (object)
    + validFrom: `2021-04-01T00:00:00Z` (string) - 販売開始日時
    + validThrough: `2021-04-01T00:00:00Z` (string) - 販売終了日時
+ startDate: `2021-04-01T00:00:00Z` (string) - 開始日時
+ superEvent (object)
    + description: (Performances.MultilingualString, optional) - 補足説明
    + dubLanguage: (Performances.Language, optional) - 吹替言語
    + subtitleLanguage: (Performances.Language, optional) - 字幕言語
+ remainingAttendeeCapacity: 1 (number) - 残席数
+ workPerformed (object)
    + headline: `xxx` (string) - サブタイトル
    + contentRating: `G` (string) - レイティング
    + duration: `PT15M` (string) - 上映時間

# Group イベント

## イベント検索 w/ 車椅子 [/performances{?page,limit,day,performanceId}]

+ Parameters
    + page: `2` (number, optional) - ページ
      + Default: `1`
    + limit: `25` (number, optional) - 最大取得件数
      + Default: `100`
    + day: `20110101` (string, optional) - 開催日
    + performanceId: `xxxxxxxxxxxx` (string, optional) - イベントID

### イベント検索 w/ 車椅子 [GET]
イベントを検索します。
検索結果のうち、オファーリスト(ticket_types)については、イベントID指定での検索時のみ含まれます。

example:
```no-highlight
/performances?day=20110101&limit=5
```

+ Response 200 (application/json)
    + Attributes
        + data: (array[Performances.Performance], fixed-type) - イベントリスト

## 汎用イベント検索 [/events{?page,limit}]

+ Parameters
    + page: `2` (number, optional) - ページ
      + Default: `1`
    + limit: `25` (number, optional) - 最大取得件数
      + Default: `100`

### 汎用イベント検索 [GET]
イベントを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Performances.Event) - イベント

<!-- include(../response/400.md) -->
