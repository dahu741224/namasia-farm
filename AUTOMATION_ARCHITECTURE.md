# 那瑪夏小農夫｜活動報名自動化架構

## 目標 Goal
讓使用者在手機看到招商雷達後，只需要說「報名」，系統就能完成：
1. 建立活動工作單
2. 把工作派到家中 Mac
3. 由 Codex 執行報名
4. 只有付款、重大條款、重要缺件時才停下來
5. 成功後更新報名狀態與行事曆

## 核心元件 Core Components
- ChatGPT：判斷是否值得報、整理活動資訊、建立工作單
- GitHub Repository：保存規則、模板與自動化程式
- GitHub Issue：活動工作單
- GitHub Actions：自動工作流程
- Self-hosted Runner：家中 Mac 的 GitHub 接單器
- Codex CLI：在 Mac 上執行 AI 工作
- Google Drive：保存品牌資料、照片、證件與菜單
- Google Calendar：保存活動、提醒與錄取狀態
- Supabase：保存活動營收、成本與歷史表現

## 中英對照 Glossary
- Repository / Repo：專案庫
- Issue：工作單／任務單
- GitHub Actions：GitHub 自動工作流程
- Workflow：工作流程
- Trigger：觸發條件
- Self-hosted Runner：自託管執行器
- Codex CLI：Codex 命令列工具
- Commit：一次版本提交
- Secret：機密金鑰／秘密值

## 最終流程 Target Flow
手機雷達 → 使用者說「報名」 → ChatGPT 建立 GitHub Issue → GitHub Actions 啟動 → Self-hosted Runner 接單 → Codex CLI 讀 AGENTS.md 與 EVENT_REGISTRATION_TEMPLATE.md → 執行報名 → 回寫結果 → 更新 Calendar

## 安全規則 Safety Rules
1. GitHub 不保存電話、Email、證件、密碼、銀行帳號、驗證碼。
2. 敏感資料保留在 Google Drive 或安全憑證儲存區。
3. 付款、匯款、密碼、重大法律承諾必須人工確認。
4. 不允許來自 Pull Request 的任務直接在家中 Mac 執行。
5. Self-hosted Runner 只執行我們自己的受控 Workflow。
6. 公開 Repository 不應直接執行不可信任的外部程式或 Issue 內容。

## 建造階段 Build Phases
### Phase 1｜規則與工作單
- AGENTS.md
- EVENT_REGISTRATION_TEMPLATE.md
- AUTOMATION_ARCHITECTURE.md
- GitHub Issue 工作單格式

### Phase 2｜Mac 接單
- 安裝 Self-hosted Runner
- 確認 Runner 能被 GitHub 看見
- 只測試安全的手動 Workflow

### Phase 3｜Codex CLI
- 安裝與登入 Codex CLI
- 測試讀取 Repository
- 測試讀取 AGENTS.md
- 測試輸出執行結果

### Phase 4｜報名自動化
- GitHub Issue → Workflow
- Workflow → Mac Runner
- Runner → Codex CLI
- Codex → 報名執行
- 執行結果 → GitHub Issue

### Phase 5｜營運串聯
- 成功送件 → Google Calendar
- 錄取通知 → 更新為確定出攤
- 活動後營收 → Supabase
- 雷達評分使用歷史資料

## 成功標準 Definition of Done
當使用者人在外面，只說「報名」後，不需要再打開家中電腦；只有遇到付款、重大條款、真正缺資料時才需要回覆。