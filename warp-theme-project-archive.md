# Warp Theme Project Archive

## Date
2026-05-20

## Platform
Windows

## Objective
Create custom Warp terminal themes, apply them via `settings.toml`, and configure agent autonomy settings.

---

## Created Themes

### 1. midnight-purple (Active)
- **File:** `C:\Users\Admin\AppData\Roaming\warp\Warp\data\themes\midnight-purple.yaml`
- **Palette:**
  - accent: `#bb86fc` (purple)
  - background: `#121212` (near black)
  - foreground: `#e0e0e0` (light gray)
  - details: darker

### 2. ocean-blue
- **File:** `C:\Users\Admin\AppData\Roaming\warp\Warp\data\themes\ocean-blue.yaml`
- **Palette:**
  - accent: `#00a8e8` (cyan)
  - background: `#001f3f` (deep navy)
  - foreground: `#a8b2d1` (blue-gray)

### 3. custom-dark
- **File:** `C:\Users\Admin\AppData\Roaming\warp\Warp\data\themes\custom-dark.yaml`
- **Palette:**
  - accent: `#58a6ff` (blue)
  - background: `#0d1117` (navy)
  - foreground: `#c9d1d9` (gray)

---

## Settings Configuration

### Active Theme (`settings.toml` line 3-4)
```toml
[appearance.themes]
theme = { custom = { name = "midnight-purple", path = "C:\\Users\\Admin\\AppData\\Roaming\\warp\\Warp\\data\\themes\\midnight-purple.yaml" } }
```

### Agent Permissions (`settings.toml` line 40-43)
```toml
[agents.profiles]
agent_mode_coding_permissions = "always_ask_before_reading"
agent_mode_execute_readonly_commands = false
agent_mode_command_execution_allowlist = []
```

**Note:** Granular permissions (apply code diffs, create plans, execute commands, full terminal use, MCP) must be set to "Always ask" via Warp Settings UI (`Ctrl + ,` → Agents → Profiles → Permissions).

---

## Process Summary

1. **Detected OS** — Windows, themes directory at `%APPDATA%\warp\Warp\data\themes\`
2. **Created themes** — Valid YAML with required fields, no `background_image`
3. **Applied theme** — Updated `settings.toml` with properly escaped Windows path
4. **Cloned official repo** — HTTPS clone of `warpdotdev/themes`, cleaned up afterward
5. **Configured agents** — Set file reads to "always ask", disabled read-only auto-exec, emptied allowlist
6. **Verified files** — Confirmed YAML validity, TOML syntax, hot-reload readiness
7. **Cleaned up** — Removed temporary test scripts, retained only custom themes

---

## Key Lessons
- Windows TOML paths require `\\` escaping
- Warp hot-reloads `settings.toml` automatically
- `settings.toml` exposes subset of agent permissions; UI-only for granular controls
- Theme YAML requires exactly: `accent`, `background`, `details`, `foreground`, `terminal_colors`

## Status
Project closed. All deliverables verified.
