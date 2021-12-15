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
|integer|整数|-|-|请输入整数|
|positiveNumber|正数|-|-|请输入正数|
|min|最小值限定|(min)|min: 最小值|不能小于${min}|
|max|最大值限定|(max)|max: 最大值|不能大于${max}|
|maxLength|字数限制|(len)|len: 最大字数|字数限制：${len}|
arrayLength|数组长度限制|(len = 1, message = '至少有一项')|len: 最小数组长度<br>message: 提示信息|${message}|
|phone|11位手机格式|-|-|手机格式不正确|

