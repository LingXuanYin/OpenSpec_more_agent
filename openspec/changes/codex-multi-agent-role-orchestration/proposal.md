## Why

OpenSpec 已支持角色化编排协议，但对 Codex 原生多-agent 模式的映射仍偏通用，缺少“可直接分派到子 agent”的结构化约束。我们需要在不牺牲跨工具一致性的前提下，补齐 Codex 多-agent 运行时的角色装配、边界控制和主 agent 编排语义。

## What Changes

- 为 Codex 多-agent 场景新增专门的角色编排能力：将 `product`、`architecture`、`worker`、`algorithm` 显式映射到可分派的子 agent 角色。
- 强化“主 agent 统一编排”语义：主 agent 负责排序、并行策略、临时角色分配与冲突仲裁，禁止写死执行顺序。
- 增加可执行的角色声明格式与结果汇总格式，确保子 agent 产出可追踪、可归属、可合并。
- 保持对非多-agent运行时的兼容：在无子 agent 能力时，以等价的单 agent 分角色段落回退。
- 更新 `init` / `update` 生成与刷新路径，确保 Codex prompts 与 managed skills 始终包含上述协议。

## Capabilities

### New Capabilities
- `codex-multi-agent-role-orchestration`: 定义 Codex 原生多-agent 下的角色映射、主 agent 编排权、边界约束、冲突仲裁与回退行为。

### Modified Capabilities
- `docs-agent-instructions`: 将 Codex 多-agent 角色装配、职责声明和汇总格式加入 OpenSpec 托管指令说明。
- `cli-init`: 确保初始化生成的 Codex prompts/skills 默认包含多-agent角色编排协议。
- `cli-update`: 确保刷新现有托管内容时同步注入最新 Codex 多-agent 协议，并保持 marker 外用户内容不变。

## Impact

- 代码影响：模板源（skills/commands）、指令生成链路、Codex 相关 prompt 输出。
- 测试影响：模板生成测试、`init/update` 回归测试、Codex 适配断言。
- 文档影响：OPSX 工作流文档与角色编排章节需补充 Codex 多-agent 运行说明。
- 用户影响：复杂任务下的多-agent协作一致性更高；前置编排信息会更结构化但可读性提升。
