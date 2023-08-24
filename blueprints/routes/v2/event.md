# Data Structure

## Types.Event.PropertyValue

-   name: `xxx` (string, required) - プロパティ名
-   value: `xxx` (string, required) - プロパティ値

## Types.Event.ScreeningEvent.Search

-   id: `xxx` (string, required) - イベント id
-   name
    -   ja: `xxx` (string, optional) - イベント名称（日本語）
    -   en: `xxx` (string, optional) - イベント名称（英語）
-   startDate: `2023-01-01T00:00:00.000Z` (string, required) - 開始日時 ISO 8601 date format
-   endDate: `2023-01-01T00:00:00.000Z` (string, required) - 終了日時 ISO 8601 date format
-   doorTime: `2023-01-01T00:00:00.000Z` (string, optional) - 開場日時 ISO 8601 date format
-   maximumAttendeeCapacity: `10` (number, optional) - 最大収容人数
-   remainingAttendeeCapacity: `10` (number, optional) - 残り収容人数
-   offers (object, optional) - 販売表示情報
    -   validFrom: `2023-01-01T00:00:00.000Z` (string, optional) - 販売開始日時 ISO 8601 date format
    -   validThrough: `2023-01-01T00:00:00.000Z` (string, optional) - 販売終了日時 ISO 8601 date format
    -   availabilityStarts: `2023-01-01T00:00:00.000Z` (string, optional) - 表示開始日時 ISO 8601 date format
    -   availabilityEnds: `2023-01-01T00:00:00.000Z` (string, optional) - 表示終了日時 ISO 8601 date format
    -   itemOffered
        -   id: `xxx` (string, optional) - 興行Id
-   location
    -   name
        -   ja: `xxx` (string, optional) - ルーム名称（日本語）
        -   en: `xxx` (string, optional) - ルーム名称（英語）
    -   branchCode: `xxx` (string, required) - ルームコード
-   superEvent
    -   id: `xxx` (string, required) - 施設コンテンツ id
    -   name
        -   ja: `xxx` (string, optional) - 施設コンテンツ名称（日本語）
        -   en: `xxx` (string, optional) - 施設コンテンツ名称（英語）
    -   headline
        -   ja: `xxx` (string, optional) - 施設コンテンツサブタイトル（日本語）
        -   en: `xxx` (string, optional) - 施設コンテンツサブタイトル（英語）
    -   description
        -   ja: `xxx` (string, optional) - 施設コンテンツ補足説明（日本語）
        -   en: `xxx` (string, optional) - 施設コンテンツ補足説明（英語）
    -   location
        -   name
            -   ja: `xxx` (string, optional) - 施設名称（日本語）
            -   en: `xxx` (string, optional) - 施設名称（英語）
        -   branchCode: `xxx` (string, required) - 施設コード
    -   workPerformed
        -   id: `xxx` (string, required) - コンテンツ id
        -   identifier: `xxx` (string, required) - コンテンツコード
-   additionalProperty (array[Types.Event.PropertyValue], fixed-type) - 追加特性

## Types.Event.ScreeningEvent.SearchTicketOffers.AddOn

-   itemOffered
    -   id: `xxx` (string, optional) - アドオンオファー id

## Types.Event.ScreeningEvent.SearchTicketOffers.PriceComponent

-   name (object, optional)
    -   ja: `xxx` (string, optional) - 価格要素名称（日本語）
    -   en: `xxx` (string, optional) - 価格要素名称（英語）
-   price: `1000` (number, required) - 価格要素価格
-   typeOf: `UnitPriceSpecification` (enum, required) - 価格要素タイプ CategoryCodeChargeSpecification (カテゴリーコード加算仕様) or MovieTicketTypeChargeSpecification (ムビチケ加算仕様) or UnitPriceSpecification (単価仕様)
    -   `UnitPriceSpecification` (string) - 単価仕様
    -   `CategoryCodeChargeSpecification` (string) - カテゴリーコード加算仕様
    -   `MovieTicketTypeChargeSpecification` (string) - ムビチケ加算仕様
-   referenceQuantity (object, optional)
    -   value: `1` (number, optional) - 価格要素基準数量
-   appliesToMovieTicket (object, optional)
    -   serviceType: `xxx` (string, required) - 決済カード区分コード
    -   serviceOutput
        -   serviceType: `xxx` (string, required) - 決済方法区分コード

## Types.Event.ScreeningEvent.SearchTicketOffers.EligibleSeatingType

-   codeValue: `xxx` (string, required) - 座席タイプ

## Types.Event.ScreeningEvent.SearchTicketOffers

-   id: `xxx` (string, optional) - オファーid
-   identifier: `xxx` (string, required) - オファーコード
-   name
    -   ja: `xxx` (string, optional) - オファー名称（日本語）
    -   en: `xxx` (string, optional) - オファー名称（英語）
-   description
    -   ja: `xxx` (string, optional) - オファー説明（日本語）
    -   en: `xxx` (string, optional) - オファー説明（英語）
-   sortIndex: `1` (string, optional) - オファー並び順
-   priceSpecification
    -   priceComponent (array, required, fixed-type)
        -   (Types.Event.ScreeningEvent.SearchTicketOffers.PriceComponent) - 価格要素
-   eligibleSeatingType  (array, optional, fixed-type)
    -   (Types.Event.ScreeningEvent.SearchTicketOffers.EligibleSeatingType) - 有効な座席タイプ
-   addOn (array, optional, fixed-type)
    -   (Types.Event.ScreeningEvent.SearchTicketOffers.AddOn) - アドオン情報

## Types.Event.ScreeningEvent.SearchSeats.Offers

-   `xxx` (enum, optional) - 商品在庫状況 InStock(在庫あり) or OutOfStock(在庫なし)
    -   `InStock` (string) - 在庫あり
    -   `OutOfStock` (string) - 在庫なし

## Types.Event.ScreeningEvent.SearchSeats

-   name
    -   ja: `xxx` (string, optional) - 座席名称（日本語）
    -   en: `xxx` (string, optional) - 座席名称（英語）
-   branchCode: `xxx` (string, optional) - 座席コード
-   containedInPlace
    -   name
        -   ja: `xxx` (string, optional) - セクション名称（日本語）
        -   en: `xxx` (string, optional) - セクション名称（英語）
    -   branchCode: `xxx` (string, optional) - セクションコード
-   seatingType (array, optional, fixed-type)
    -   `xxx` (string) - 座席タイプ
-   offers (array, optional, fixed-type)
    -   (Types.Event.ScreeningEvent.SearchSeats.Offers) - 在庫ステータス

# Group イベント

## イベント検索 [/event/screeningEvent/search{?page,limit,startFrom,startThrough,superEventLocationBranchCodes,clientId}]

### イベント検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   startFrom: `2023-01-01T00:00:00.000Z` (string, optional) - 開始日時範囲(から) ISO 8601 date format
    -   startThrough: `2023-01-01T00:00:00.000Z` (string, optional) - 開始日時範囲(まで) ISO 8601 date format
    -   superEventLocationBranchCodes: `xxx` (string, optional) - 施設コード
    -   clientId: `xxx` (string, optional) - 取得したい販売表示情報のクライアント id
    -   ids: `xxx,xxx` (string, optional) - イベントid 10件まで
    -   sellerId: `xxx` (string, required) - 販売者id
    

-   Response 200 (application/json)
    -   Attributes (array, fixed-type)
        -   (Types.Event.ScreeningEvent.Search) - イベント

<!-- include(../../response/400.md) -->

## イベントオファー検索 [/event/screeningEvent/searchTicketOffers{?page,limit,eventId}]

### イベントオファー検索[GET]

価格要素タイプ

| type                               | description              |
| :--------------------------------- | :----------------------- |
| UnitPriceSpecification             | 単価仕様                 |
| CategoryCodeChargeSpecification    | カテゴリーコード加算仕様 |
| MovieTicketTypeChargeSpecification | ムビチケ加算仕様         |

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   eventId: `xxx` (string, required) - イベント id
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)
    -   Attributes (array, fixed-type)
        -   (Types.Event.ScreeningEvent.SearchTicketOffers) - イベントオファー

<!-- include(../../response/400.md) -->

## 座席ステータス検索 [/event/screeningEvent/searchSeats{?page,limit,eventId}]

### 座席ステータス検索[GET]

-   Parameters

    -   page: `1` (number, optional) - ページ
        -   Default: `1
    -   limit: `10` (number, optional) - 最大取得件数
        -   Default: `100
    -   eventId: `xxx` (string, required) - イベント id
    -   sellerId: `xxx` (string, required) - 販売者id

-   Response 200 (application/json)
    -   Attributes (array, fixed-type)
        -   (Types.Event.ScreeningEvent.SearchSeats) - 座席ステータス

<!-- include(../../response/400.md) -->
