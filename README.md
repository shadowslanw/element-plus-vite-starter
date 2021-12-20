# 后台模板

## 注意事项
- 2021/12/20 jest, babel-jest, ts-jest, @types/jest 使用版本27.0.0, @vue/vue3-jest 使用版本27.0.0-alpha.4仍然未解决以下问题
  ```
  [vue-jest] Error: Vue template compilation failed
  ```  
  该问题由vue-jest编译```<template lang="pug">```块时，由于语法中使用了诸如```template(#default)```或者```template(v-slot:default)```，导致不能正确编译。__项目中约定以padding参数名作为插槽空参数的占位符__,临时解决方案：
  ```ts
  template(#default="padding") // template(#default)
  template(v-slot:default="padding") // template(v-slot:default)
  ```  
  
  > [see this issue](https://github.com/quasarframework/quasar-testing/issues/87)