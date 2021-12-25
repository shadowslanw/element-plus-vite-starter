# Composition

## Common 公共

### navigation 导航

#### 对象说明

##### menuList
展示在侧边栏的菜单内容，面包屑导航也基于此对象计算当前菜单路径。

##### breacrumbs
面包屑导航数据集，由顶级菜单逐级指向当前菜单。
当前菜单匹配```menuList```依据为```Route.name```

##### isBreadcrumbVisible
当前菜单是否在框架布局中展示面包屑导航，决定条件：
- ```PreferSetting.breadcrumbs``` 为 ```true```
- 当前路由，```Route.meta.isBreadcrumbVisible``` 未被显式定义为false

### form 表单

#### 对象说明

##### validators
基于```async-valid```插件封装的常用表单校验配置
|对象名|功能|调用方法|参数说明|提示信息|
|:--|:--|:--|:--|:--|
|required|基础必填项|required(message)|提示信息，默认'必填项未填写'|${message}|
|digital|浮点数|(limit = 2, fixed = false)|limit: 小数位数最大值, <br>fixed: 小数位数固定limit|请输入${limit}位小数|
|integer|整数|(message = '请输入整数')|message: 提示信息|${message}|
|positiveNumber|正数|(message = '请输入正数')|message: 提示信息|${message}|
|min|最小值限定|(min: numbedr, message = '不能小于${value}')|min: 最小值<br>message:提示信息|${message}|
|max|最大值限定|(max: number, message = '不能大于${value}')|max: 最大值<br>message:提示信息|${message}|
|maxLength|长度限制|(len: number, message = '最大长度限制：${value}')|len: 最大长度<br>message:提示信息|${message}|
|mixLength|长度限制|(len = 1, message = '最小长度限制：${value}')|len: 最小长度<br>message: 提示信息|${message}|
|phone|11位手机格式|(message = '手机格式不正确')|message: 提示信息|${message}|

