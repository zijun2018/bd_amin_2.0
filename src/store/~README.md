# store目录

*vuex全局数据目录*

+ modules : 模块目录
  + login : 登录模块的全局状态
+ actions.js : 根级别的异步方法actions
+ getters.js : 根级别的过滤计算getters
+ mutations.js : 根级别的同步state状态方法mutations
+ mutations-types.js : 常量替代mutation事件类型
+ state.js : 根级别的vuex状态
+ store.js : state/mutations/actions vuex入口文件


> 注意：同一个文件下集合state、mutations、actions等，考虑到Eslint的报错，需要把state放置到最后！！

> modules中如果模块的复杂度比较多，建议将state、mutations、actions以文件形式分开，如果复杂度比较简单，那么可以用一个文件形式集合书写


