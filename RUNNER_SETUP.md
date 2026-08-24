# Mac Self-hosted Runner 設定指南

## 這是什麼？ What is it?
Self-hosted Runner（自託管執行器）就是安裝在家中 Mac 的 GitHub 接單器。
它會等待 GitHub Actions 派工作過來，再在這台 Mac 上執行。

## 重要安全原則
目前這個 Repository 是公開的，因此在真正連上家中 Mac 前要非常保守：
- 只允許手動觸發 workflow_dispatch
- 不允許 pull_request 觸發
- 不執行外部使用者提供的程式
- 不把 Issue 內容直接當 shell 指令執行
- 不把密碼或 token 寫進 repository

## 安裝流程 Installation Flow
1. GitHub Repository → Settings
2. Actions → Runners
3. New self-hosted runner
4. 選擇 macOS
5. 選擇 ARM64（Apple Silicon Mac）
6. GitHub 會顯示一組官方下載與設定指令
7. 在家中 Mac 的 Terminal（終端機）逐行執行
8. 設定 runner 名稱，例如：namasia-mac
9. Labels（標籤）建議：self-hosted, macOS, ARM64, namasia
10. 完成後回 GitHub 確認狀態為 Online（上線）

## 建議安裝位置
建議建立獨立資料夾，例如：
~/github-runner/namasia-farm

不要把 Runner 安裝在桌面或品牌照片資料夾裡。

## Runner 長期運作
完成基本測試後，再設定為背景服務 Service。
目標是 Mac 開機後自動啟動，不需要手動開 Terminal。

## 第一個測試
先不要讓 Codex 填表。
第一個測試只做：
GitHub 手動按 Run workflow → Mac Runner 顯示「收到測試工作」→ 成功結束。

只有這個通過後，才進入 Codex CLI 串接。

## 中英對照
- Settings：設定
- Actions：自動化工作
- Runners：執行器
- New self-hosted runner：新增自託管執行器
- Online：上線
- Offline：離線
- Labels：標籤
- Service：背景服務
- Terminal：終端機
- Run workflow：執行工作流程
