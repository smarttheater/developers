# Data Structure

## Performances.MultilingualString
+ en: `english name` (string, optional) - 英語名称
+ ja: `日本語名称` (string, optional) - 日本語名称

## Performances.TicketType
+ charge: 1800 (number, required) - 価格
+ name: (Performances.MultilingualString, required) - オファー名称(多言語対応)
+ id: `001` (string, required) - オファーコード
+ available_num: 1 (number, required) - 在庫数

## Performances.Performance
+ id: `171222001001012130` (string, required) - イベントID
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

# Group Events

## イベント検索 [/performances{?page,limit,day,performanceId}]

+ Parameters
    + page: `2` (number, optional) - ページ
      + Default: `1`
    + limit: `25` (number, optional) - 最大取得件数
      + Default: `100`
    + day: `20110101` (string, optional) - 開催日
    + performanceId: `171222001001012130` (string, optional) - イベントID

### イベント検索 [GET]
イベントを検索します。
検索結果のうち、オファーリスト(ticket_types)については、イベントID指定での検索時のみ含まれます。

example:
```no-highlight
/performances?day=20110101&limit=5
```

+ Response 200 (application/json)
    + Attributes
        + data: (array[Performances.Performance], fixed-type) - イベントリスト

<!-- include(../response/400.md) -->
