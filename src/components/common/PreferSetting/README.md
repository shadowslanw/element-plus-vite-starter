# 公共组件

## PreferSetting 偏好设置

### 说明
设置项目的总体布局，从store中读写数据，store.PreferSetting缓存于localStorage
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|direction|布局,Framework.direction|'HAM', 'AHM'|'HAM'|
|fixed|固定框架|boolean|true|
|breakcrumb|面包屑导航|boolean|true|
|tabs|多标签，开启后路由keepalive|boolean|true|