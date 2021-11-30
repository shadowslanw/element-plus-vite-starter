# 公共组件

## BaseMenu 菜单

### 说明
- 该组件是对于```ElMenu```的再封装。  
- 数据源从```/composition/common/navigation```中读取。  
- 组件中将```ElSubMenu```与```ElMenuItem```整合成了自定义组件```CustomSubMenu```，根据数据源的children字段决定渲染```ElSubMenu```或```ElMenuItem```、递归调用自身。
- 接收```ElMenu```的select事件，参数index作为router.push({ name })的依据。
- 数透ElMenu的其他参数。