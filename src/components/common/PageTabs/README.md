# 公共组件

## PageTabs 多标签页面

### 说明
- 该组件是对于```ElTabs```的再封装。  
- 数据源从```/store/modules/PageTabs```中读取。  
- 通过```PreferSetting.tabs```开启
- 关闭标签页的顺序规则：1）非当前页直接关闭；2）后一页>前一页。