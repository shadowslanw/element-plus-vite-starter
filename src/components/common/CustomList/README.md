# 公共组件

## CustomList 自定义列表

### 说明
- 按插槽渲染列表数据
- 空列表时提示信息

### 参数
|参数名|类型|说明|默认值|
|:--|:--|:--|:--|
|dataSource|array|列表数据|[]|
|dataKey|string|v-for循环列表的key，不设置以遍历的index作为key|undefine|
|emptyContent|string|列表为空时的提示文本|'暂无数据'|

### 插槽
|插槽名|说明|传递参数|
|:--|:--|:--|
|default|遍历项数据渲染|{ item: 当前项, index: 当前序号, dataSource: 列表数据 }|
|empty|空文本提示|-|