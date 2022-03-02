# Data Structure

## Sellers.MultilingualString
+ en: `English` (string, optional) - 英語
+ ja: `日本語` (string, optional) - 日本語

## Sellers.PropertyValue
+ name: `xxx` (string, required) - プロパティ名
+ value: `xxx` (string, required) - プロパティ値

## Sellers.Seller
+ additionalProperty (array[Sellers.PropertyValue], fixed-type) - 追加特性
+ branchCode: `xxx` (string, required) - コード
+ id: `xxx` (string, required) - ID
+ name: (Sellers.MultilingualString, optional) - 名称

# Group 販売者

## 販売者検索 [/sellers{?page,limit}]

+ Parameters
    + page: `1` (number, optional) - ページ
      + Default: `1`
    + limit: `10` (number, optional) - 最大取得件数
      + Default: `100`

### 販売者検索 [GET]
販売者を検索します。

+ Response 200 (application/json)
    + Attributes (array, fixed-type)
        + (Sellers.Seller) - 販売者

<!-- include(../response/400.md) -->
