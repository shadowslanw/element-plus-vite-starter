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