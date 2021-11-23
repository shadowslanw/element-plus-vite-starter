# Layouts 布局
## Framework 框架容器  
### 说明  
Framework组件采用grid布局，将页面分为2*2区域。

### 参数  

|参数名|类型|默认值|说明|
|:--|:--|:--|:--|
|direction|string|'AHM'|页面布局类型。可选值：'AHM', 'HAM', 'HM'；<br/>A-Aside, H-Header, M-Main|
|fixed|boolean|false|固定aside和header区域，只有main区域滚动|
|aside-width|string\|number|'200px'|aside宽度|
|header-height|string\|number|'60px'|header高度|
|breakpoint|number\|false|false|响应式断点，false-不开启响应，数值-窗口宽度小于等于值时触发响应，单位px|

#### direction
- AHM
  <div style="display: grid; grid-template-columns: 100px auto; grid-template-rows: 40px auto; width: 600px; height: 300px; grid-template-areas: 'a h' 'a m';">
    <div style="grid-area: a; line-height: 300px; text-align: center; background: #333; color: #eee;">Aside</div>
    <div style="grid-area: h; line-height: 40px; text-align: center; background: #f5f5f5; color: #333;">Header</div>
    <div style="grid-area: m; line-height: 260px; text-align: center; background: #eee; color: #333;">Main</div>
  </div>
  <br />  
- HAM
  <div style="display: grid; grid-template-columns: 100px auto; grid-template-rows: 40px auto; width: 600px; height: 300px; grid-template-areas: 'h h' 'a m';">
    <div style="grid-area: a; line-height: 260px; text-align: center; background: #333; color: #eee;">Aside</div>
    <div style="grid-area: h; line-height: 40px; text-align: center; background: #f5f5f5; color: #333;">Header</div>
    <div style="grid-area: m; line-height: 260px; text-align: center; background: #eee; color: #333;">Main</div>
  </div>
  <br />  
- HM
  <div style="display: grid; grid-template-columns: 100px auto; grid-template-rows: 40px auto; width: 600px; height: 300px; grid-template-areas: 'h h' 'm m';">
    <div style="grid-area: h; line-height: 40px; text-align: center; background: #f5f5f5; color: #333;">Header</div>
    <div style="grid-area: m; line-height: 260px; text-align: center; background: #eee; color: #333;">Main</div>
  </div>
  <br />  

### 事件  
|事件名|说明|参数|
|:--|:--|:--|
|breakpoint|触发断点|-|

### 插槽
|插槽名|说明|参数|
|:--|:--|:--|
|aside|自定义默认内容|-|
|header|自定义默认内容|-|
|main|自定义默认内容|-|