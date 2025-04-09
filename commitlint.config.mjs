export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', // 新功能
      'fix', // 修复 bug
      'docs', // 文档更新
      'style', // 代码格式调整
      'refactor', // 重构
      'perf', // 性能优化
      'test', // 测试相关
      'build', // 构建过程或工具变动
      'ci', // CI 配置更新
      'chore', // 杂项
      'revert', // 回滚
    ]],
  },
}
