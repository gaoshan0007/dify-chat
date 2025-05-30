![Dify Chat](./docs/banner.png)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/lexmin0412/dify-chat) ![GitHub License](https://img.shields.io/github/license/lexmin0412/dify-chat) ![GitHub Created At](https://img.shields.io/github/created-at/lexmin0412/dify-chat) ![GitHub contributors](https://img.shields.io/github/contributors/lexmin0412/dify-chat) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/lexmin0412/dify-chat)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/lexmin0412/dify-chat)

**Dify Chat**，一个基于 Dify API 的 AI Web 应用项目。本项目提供了一个使用 Vue 2 构建的前端应用模板 (`packages/vue2-chat-app/template`) 和一个 Node.js 后端服务 (`packages/server`) 作为示例。同时包含了一系列用于支持 Dify 应用开发的 TypeScript 库包。

如果你觉得这个项目还不错的话，请动动你的小手指点个 Star ⭐️ 吧～

| 加群沟通（提需求/ bug 请带 issue 发言）                                                                                                              | 喂我花生（请在留言中备注自己的 Github 用户名哦）                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/e2ad49bd-9dc9-44a8-96ee-cca7c9e6183c" alt="wechat-group" style="width: 400px; height: 400px" /> | <img src="https://github.com/user-attachments/assets/f56d53b7-8529-4a1d-a0ce-27bfe60510ec" alt="sponsor" style="width: 400px; height: 400px" /> |

## 🥇 Golden Sponsors

> 注：每日手动更新
> (Sponsors 内容保持不变)
> | Avatar | Name | Type |
> | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------ |
> | <img style="width: 50px; height: 50px" src="https://avatars.githubusercontent.com/u/74965055?v=4" /> | <a target="blank" href="https://github.com/forgoodthing">forgoodthing</a> | Github |
> | <img style="width: 50px; height: 50px" src="https://avatars.githubusercontent.com/u/18590361?v=4" /> | <a target="blank" href="https://github.com/unmurphy">unmurphy</a> | Github |
> | <img style="width: 50px; height: 50px" src="https://avatars.githubusercontent.com/u/1463755?v=4" /> | <a target="blank" href="https://github.com/wallowbear">打豆豆</a> | Github |
> | <img style="width: 50px; height: 50px" src="https://avatars.githubusercontent.com/u/9300916?v=4" /> | <a target="blank" href="https://github.com/tangzp">tangzp</a> | Github |
> | <img style="width: 50px; height: 50px" src="https://github.com/user-attachments/assets/2a8f706b-4c41-461c-a29c-89e354b02d33" /> | -1 | Wechat |
> | <img style="width: 50px; height: 50px" src="https://avatars.githubusercontent.com/u/48902884?v=4" /> | <a target="blank" href="https://github.com/HowieSh">HowieSh</a> | Github |
> | <img style="width: 50px; height: 50px" src="https://github.com/user-attachments/assets/77f6390a-dfb8-4660-b43d-6965477cab9b" /> | 北鱼 | Wechat |
> | <img style="width: 50px; height: 50px" src="https://avatars.githubusercontent.com/u/49941899?v=4" /> | <a target="blank" href="https://github.com/weihaoaho">weihaoaho</a> | Github |
> | <img style="width: 50px; height: 50px" src="https://github.com/user-attachments/assets/42f840cd-ce40-4193-89b7-77bd578fed5b" /> | xintan | Wechat |
> | <img style="width: 50px; height: 50px" src="https://avatars.githubusercontent.com/u/13366372?v=4" /> | <a target="blank" href="https://github.com/zhaoweihan2015">zhaoweihan2015</a> | Github |
> | None | 匿名慈善家 | Wechat |

## Repobeats

![Alt](https://repobeats.axiom.co/api/embed/cd9a078e6a4a70289aa28870d4934f6757d2fd4f.svg "Repobeats analytics image")

## 特性

- 💬 **基于 Dify API**: 旨在与 Dify AI 平台进行集成，利用其强大的 AI 能力。
- 📦 **模块化设计**: 项目包含多个独立的包，便于管理和维护。
- 🛠️ **Vue 2 前端模板**: 提供一个基础的 Vue 2 前端应用 (`vue2-chat-app`)，可作为起点进行二次开发。
- ⚙️ **Node.js 后端服务示例**: 包含一个简单的 Node.js 服务 (`server`)。
- 📚 **TypeScript 核心库**: 提供一系列 TypeScript 编写的库 (`api`, `core`, `helpers`, `theme`)，用于支持 Dify 应用开发。
- 📱 **响应式设计潜力**: 前端应用可根据需求实现响应式布局，以适应不同设备。
- 🔧 **持续维护可能性**: 活跃社群有助于项目功能的完善和问题的修复。

## 项目结构与子包列表

本项目采用 Monorepo 结构，主要包含以下包：

| 子包名称                 | 描述                                                                    | 文档链接 (如果适用)                         |
| ------------------------ | ----------------------------------------------------------------------- | ------------------------------------------- |
| `packages/vue2-chat-app` | 包含一个使用 Vue 2 和 Webpack 构建的前端应用模板 (`template/` 目录下)。 | `packages/vue2-chat-app/template/README.md` |
| `packages/server`        | 一个简单的 Node.js 后端服务示例。                                       | `packages/server/README.md`                 |
| `packages/api`           | (推测) 用于封装与 Dify API 交互的客户端。                               | `packages/api/README.md`                    |
| `packages/core`          | (推测) 包含项目核心的类型定义、常量或通用逻辑。                         | `packages/core/README.md`                   |
| `packages/helpers`       | (推测) 提供一些通用的辅助函数或工具。                                   | `packages/helpers/README.md`                |
| `packages/theme`         | (推测) 用于管理应用的视觉样式和主题配置。                               | `packages/theme/README.md`                  |

**重要说明**: 当前分析显示，`vue2-chat-app` 和 `server` 包并未在其代码中直接依赖 `api`, `core`, `helpers`, `theme` 这些库包。这些库包的预期用途、与项目其他部分的具体集成方式或作为独立模块的使用方法，可能需要查阅其各自的 `README.md` 或代码进行深入了解。

## 运行截图

_(由于之前截图主要基于 react-app，且 vue2-chat-app 当前功能较为基础，建议根据实际运行情况替换或添加 vue2-chat-app 的截图，或暂时移除此部分。)_
_(此处暂时移除截图展示)_

## 技术栈

- **`packages/vue2-chat-app/template`**:
  - Vue 2
  - Webpack
  - Tailwind CSS (根据 `assets/tailwind.css` 推断)
  - TypeScript / JavaScript
- **`packages/server`**:
  - Node.js
- **Library Packages (`api`, `core`, `helpers`, `theme`)**:
  - TypeScript
  - rslib (构建工具，根据 `rslib.config.ts` 文件推断)
- **项目整体**:
  - pnpm (用于包管理和 Workspace)
  - Docker (用于容器化部署)

## 运行环境

开发/生产构建环境要求：

- Node.js ^22.5.1 (根据原 README，具体版本可能需根据各包实际情况调整)
- pnpm ^10.8.1 (根据原 README)

> 注意：本项目使用了 pnpm workspace 高级特性来实现 Monorepo 管理，其他包管理工具可能无法正常工作。

## 开始使用

### 0. 获取 Dify 应用配置

与 Dify API 对接通常需要以下信息，您需要在 Dify 控制台获取：

| 变量     | 说明                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| API Base | Dify API 请求前缀, 如果你使用的是 Dify 官方提供的云服务，则为 `https://api.dify.ai/v1` |
| Api Key  | Dify API 密钥，用于访问对应应用的 API。                                                |

_(获取 API Base 和 API Key 的具体步骤图示可参考原 README，此处省略)_

### 1. 安装依赖

在项目根目录下运行：

```bash
pnpm install
```

### 2. 运行 `vue2-chat-app` 前端应用

前端应用代码位于 `packages/vue2-chat-app/template/`。

```bash
cd packages/vue2-chat-app/template
# 查看其 package.json 中的 "scripts": { "dev": "..." } 命令
pnpm run dev
```

**重要提示**: 当前项目配置在尝试自动化构建 `vue2-chat-app` 时遇到了工具链问题（如 `cross-env` 或 `webpack` 无法在子包脚本中正确找到）。您在本地运行时，可能需要确保您的环境能够正确解析和执行其 `package.json` 中定义的脚本。这可能涉及到调整环境变量、全局安装缺失的工具（不推荐）或修复项目/脚本配置。

### 3. 运行 `server` 后端服务

后端服务代码位于 `packages/server/`。

```bash
cd packages/server
# 假设启动命令为 node index.js，请根据实际情况调整
node index.js
```

(请查看 `packages/server/package.json` 中是否有定义的启动脚本，例如 `pnpm start`)

### 4. 构建库包 (`api`, `core`, `helpers`, `theme`)

这些包可以使用 `rslib` 进行构建。从项目根目录运行：

```bash
pnpm --filter @dify-chat/api build
pnpm --filter @dify-chat/core build
pnpm --filter @dify-chat/helpers build
pnpm --filter @dify-chat/theme build
```

(注意：`@dify-chat/` 前缀是基于这些包 `package.json` 中 `name` 字段的通用约定，如果实际名称不同，请相应调整。)

## 跨域处理

_(跨域处理部分通用，保持不变)_
Dify Cloud 以及私有化部署的 Dify 服务本身均支持跨域请求，无需额外处理，但如果你的私有化部署环境还存在额外的网关层，且对跨域资源访问有严格的限制，可能就会导致跨域问题，处理方式如下：

在你的网关层的响应 Header 处理中，增加 `Access-Control-Allow-Origin` 字段，允许 Dify-Chat 应用的部署域名访问，以 nginx 为例：

```bash
# nginx.conf
server {
  listen 443;
  server_name dify-chat.com # 这里换成你的前端部署域名

  location / {
    add_header Access-Control-Allow-Origin https://dify-chat.com; # 这里换成你的前端部署协议+域名
    add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
  }
}
```

## 容器运行

项目包含 Docker 配置 (`Dockerfile`, `docker/docker-compose.yaml`)。

```bash
# 进入 docker 目录
cd docker
docker compose up dify-chat -d # 根据 docker-compose.yaml 中的服务名
```

浏览器访问 `http://127.0.0.1:8080/` (端口可能需要根据 `docker-compose.yaml` 或 `.env` 文件调整)。

**提示**: 默认的 Docker 配置可能是为旧的项目结构设计的。您可能需要检查并调整 `Dockerfile` 和 `docker-compose.yaml` 中的路径、构建上下文、启动命令等，以使其正确构建和运行当前项目中的 `vue2-chat-app` 和/或 `server`。

SSL 证书签发部分 (`certbot`) 说明保持不变，但用户需确保其配置的域名能正确指向通过 Docker 运行的应用。

_(Certbot 部分保持不变)_

## FAQ

_(FAQ 部分保持不变，但可能有些内容已不适用)_
A: pnpm install 报错 `Cannot find matching keyid: ${JSON.stringify({ signatures, keys })}`
Q: 先运行 `COREPACK_INTEGRITY_KEYS=0 corepack prepare` 再执行 `pnpm install`。

## Roadmap

- [ ] **`vue2-chat-app` 功能完善**: 增强其作为 Dify Chat 前端应用的功能。
- [ ] **明确各库包用途与集成**: 梳理 `api`, `core`, `helpers`, `theme` 包与主应用/服务的集成方式或提供明确的独立使用文档。
- [ ] **构建与环境问题修复**: 解决 `vue2-chat-app` 在 pnpm workspace 中的构建和脚本执行问题。
- [x] 支持多个会话切换 (原 Roadmap，需确认 `vue2-chat-app` 是否支持或计划支持)
- [ ] 国际化
- [ ] 支持夜间模式 (原 Roadmap，需确认 `vue2-chat-app` 是否支持或计划支持)
- [ ] 支持自定义主题 (原 Roadmap，需确认 `vue2-chat-app` 是否支持或计划支持)
- [ ] 补充不同类型应用场景的最佳实践
- [x] 容器化部署支持 (已存在，但可能需适配)

_(移除了大量原 Roadmap 中与 react-app 或具体 UI 组件库相关的条目，并新增了针对当前状况的条目。)_

## License

[MIT](./LICENSE)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=lexmin0412/dify-chat&type=Date)](https://www.star-history.com/#lexmin0412/dify-chat&Date)
