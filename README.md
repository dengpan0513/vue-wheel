# vue-wheel
 
## 介绍
这是一个使用 Vue 开发的 UI 组件库
## 开始使用
1. CSS 样式添加
  ```
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *::before {
    box-sizing: border-box;
  }
  *::after {
    box-sizing: border-box;
  }
  :root {
    font-size: 14px;
    color: #333;
    --button-height: 32px;
    --button-border-radius: 4px;
    --button-border-color: #d9d9d9;
    --button-bgc: #fff;
    --button-hover-focus: #40a9ff;
    --button-active: #096dd9;
    --button-primary: #1890ff;
    --button-danger: #ff4d4f;
    --button-danger-hover-focus: #ff7875; 
    --button-danger-active: #d9363e;
    --button-round: 32px;
    --button-circle: 50%;
    --button-disabled-color: rgba(0, 0, 0, .25);
    --button-disabled-border-color: #d9d9d9;
    --button-disabled-bgc: #f5f5f5;
  }
  ```
2. 安装 dp-vue-wheel
  ```
  npm install dp-vue-wheel -S
  ```
3. 引入 dp-vue-wheel
  ```
  import { WButton } from 'dp-vue-wheel'

  export default {
    components: { WButton }
  }
  ```  

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码