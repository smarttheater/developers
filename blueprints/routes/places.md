# Data Structure

## Places.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Places.PropertyValue
+ name: `xxx` (string, required) - プロパティ名
+ value: `xxx` (string, required) - プロパティ値

## Places.MovieTheater
+ additionalProperty (array[Places.PropertyValue], fixed-type) - 追加特性
+ branchCode: `xxx` (string, required) - コード
+ name: (Places.MultilingualString, optional) - 名称

## Places.ScreeningRoomContainedInPlace
+ branchCode: `xxx` (string, required) - 施設コード

## Places.ScreeningRoom
+ additionalProperty (array[Places.PropertyValue], fixed-type) - 追加特性
+ address: (Places.MultilingualString, optional) - アドレス
+ containedInPlace: (Places.ScreeningRoomContainedInPlace, required) - 施設
+ branchCode: `xxx` (string, required) - コード
+ name: (Places.MultilingualString, optional) - 名称

## Places.SeatContainedInPlaceContainedInPlaceContainedInPlace
+ branchCode: `xxx` (string, required) - 施設コード

## Places.SeatContainedInPlaceContainedInPlace
+ branchCode: `xxx` (string, required) - ルームコード
+ containedInPlace: (Places.SeatContainedInPlaceContainedInPlaceContainedInPlace, required) - 施設

## Places.SeatContainedInPlace
+ branchCode: `xxx` (string, required) - セクションコード
+ containedInPlace: (Places.SeatContainedInPlaceContainedInPlace, required) - ルーム

## Places.Seat
+ additionalProperty (array[Places.PropertyValue], fixed-type) - 追加特性
+ containedInPlace: (Places.SeatContainedInPlace, required) - セクション
+ branchCode: `xxx` (string, required) - コード
+ name: (Places.MultilingualString, optional) - 名称

# Group 施設

## 施設検索 [/places/MovieTheater{?page,limit}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### 施設検索 [GET]
施設を検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Places.MovieTheater) - 施設

<!-- include(../response/400.md) -->

## ルーム検索 [/places/ScreeningRoom{?page,limit}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### ルーム検索 [GET]
ルームを検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Places.ScreeningRoom) - ルーム

<!-- include(../response/400.md) -->

## 座席検索 [/places/Seat{?page,limit,screeningRoomBranchCode,movieTheaterBranchCode}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`
    + screeningRoomBranchCode: `xxx` (string, optional) - ルームコード
    + movieTheaterBranchCode: `xxx` (string, optional) - 施設コード

### 座席検索 [GET]
座席を検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Places.Seat) - 座席

<!-- include(../response/400.md) -->
