param(
  [ValidateSet(
    "blackwall-crimson",
    "obsidian-gold",
    "neon-emerald",
    "midnight-cobalt",
    "atelier-paper",
    "nordic-snow",
    "kyoto-matcha",
    "cyber-daylight"
  )]
  [string]$Theme = "blackwall-crimson",
  [ValidateSet(
    "telemetry-2line",
    "netrunner-hud",
    "minimal-1line"
  )]
  [string]$PromptStyle = "telemetry-2line",
  [switch]$ConfigureCmd
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ZenHome = Join-Path $HOME ".zen-terminal"

if (-not (Test-Path $ZenHome)) {
  New-Item -ItemType Directory -Path $ZenHome -Force | Out-Null
}

Copy-Item -Path (Join-Path $ScriptDir "zen-profile.ps1") -Destination (Join-Path $ZenHome "zen-profile.ps1") -Force
Copy-Item -Path (Join-Path $ScriptDir "windows-terminal-schemes.json") -Destination (Join-Path $ZenHome "windows-terminal-schemes.json") -Force
Set-Content -Path (Join-Path $ZenHome "active-theme.txt") -Value $Theme -Encoding UTF8
Set-Content -Path (Join-Path $ZenHome "active-prompt.txt") -Value $PromptStyle -Encoding UTF8
if (-not (Test-Path (Join-Path $ZenHome "wallpaper-enabled.txt"))) {
  Set-Content -Path (Join-Path $ZenHome "wallpaper-enabled.txt") -Value "on" -Encoding UTF8
}

$DocsDir = [Environment]::GetFolderPath("MyDocuments")
if (-not $DocsDir) { $DocsDir = Join-Path $HOME "Documents" }

$ProfilePaths = @(
  $PROFILE.CurrentUserCurrentHost,
  (Join-Path $DocsDir "PowerShell\Microsoft.PowerShell_profile.ps1"),
  (Join-Path $DocsDir "WindowsPowerShell\Microsoft.PowerShell_profile.ps1")
) | Select-Object -Unique

$AllHostPaths = @(
  $PROFILE.CurrentUserAllHosts,
  (Join-Path $DocsDir "PowerShell\profile.ps1"),
  (Join-Path $DocsDir "WindowsPowerShell\profile.ps1")
) | Select-Object -Unique

foreach ($ahPath in $AllHostPaths) {
  if ($ahPath -and (Test-Path $ahPath)) {
    $rawAh = Get-Content -Path $ahPath -Raw -ErrorAction SilentlyContinue
    if ($rawAh -match "zeN-Terminal") {
      $cleanedAh = [regex]::Replace($rawAh, "(?s)# >>> zeN-Terminal \(@zen-ui/system\) >>>.*?# <<< zeN-Terminal \(@zen-ui/system\) <<<\r?\n?", "")
      Set-Content -Path $ahPath -Value $cleanedAh.Trim() -Encoding UTF8
    }
  }
}

$LoaderLines = @(
  "# >>> zeN-Terminal (@zen-ui/system) >>>",
  "if (Test-Path `"$HOME\.zen-terminal\zen-profile.ps1`") {",
  "  . `"$HOME\.zen-terminal\zen-profile.ps1`"",
  "}",
  "# <<< zeN-Terminal (@zen-ui/system) <<<"
)
$LoaderBlock = $LoaderLines -join "`r`n"

foreach ($pPath in $ProfilePaths) {
  if (-not $pPath) { continue }
  $parentDir = Split-Path -Parent $pPath
  if (-not (Test-Path $parentDir)) {
    New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
  }
  if (-not (Test-Path $pPath)) {
    Set-Content -Path $pPath -Value $LoaderBlock -Encoding UTF8
  } else {
    $existing = Get-Content -Path $pPath -Raw -ErrorAction SilentlyContinue
    if ($null -eq $existing -or $existing -notmatch "zeN-Terminal") {
      Add-Content -Path $pPath -Value "`r`n$LoaderBlock" -Encoding UTF8
    }
  }
}

$WtPaths = @(
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json",
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json",
  "$env:LOCALAPPDATA\Microsoft\Windows Terminal\settings.json"
)
foreach ($wtPath in $WtPaths) {
  if (Test-Path $wtPath) {
    $backupPath = "$wtPath.zen-backup"
    if (-not (Test-Path $backupPath)) {
      Copy-Item -Path $wtPath -Destination $backupPath -Force
    }
  }
}

$ConsolePaths = @(
  "HKCU:\Console",
  "HKCU:\Console\%SystemRoot%_System32_WindowsPowerShell_v1.0_powershell.exe",
  "HKCU:\Console\%SystemRoot%_SysWOW64_WindowsPowerShell_v1.0_powershell.exe",
  "HKCU:\Console\%SystemRoot%_System32_cmd.exe"
)
foreach ($cPath in $ConsolePaths) {
  if (-not (Test-Path -LiteralPath $cPath)) {
    New-Item -Path $cPath -Force | Out-Null
  }
  Set-ItemProperty -LiteralPath $cPath -Name "VirtualTerminalLevel" -Value 1 -Type DWord -ErrorAction SilentlyContinue
  Set-ItemProperty -LiteralPath $cPath -Name "ColorTable00" -Value 0x00080505 -Type DWord -ErrorAction SilentlyContinue
  Set-ItemProperty -LiteralPath $cPath -Name "ColorTable05" -Value 0x00080505 -Type DWord -ErrorAction SilentlyContinue
  Set-ItemProperty -LiteralPath $cPath -Name "ScreenColors" -Value 0x07 -Type DWord -ErrorAction SilentlyContinue
}

if (Get-AppxPackage -Name "Microsoft.WindowsTerminal" -ErrorAction SilentlyContinue) {
  $StartupKey = "HKCU:\Console\%%Startup"
  if (-not (Test-Path -LiteralPath $StartupKey)) {
    New-Item -Path $StartupKey -Force | Out-Null
  }
  Set-ItemProperty -LiteralPath $StartupKey -Name "DelegationConsole" -Value "{2EACA947-7F5F-4CFA-BA87-8F7FBEEFBE69}" -Type String
  Set-ItemProperty -LiteralPath $StartupKey -Name "DelegationTerminal" -Value "{E12CFF52-A866-4C77-9A90-F570A7AA2C6B}" -Type String
}

$Global:ZenBannerShown = $true
. (Join-Path $ZenHome "zen-profile.ps1")
Export-ZenTabIcons -Force
Export-ZenWallpapers -Force
Sync-ZenWindowsTerminalSettings -ThemeId $Theme
Write-ZenCmdAutorunScript -ThemeId $Theme

$CmdInitPath = Join-Path $ZenHome "zen-cmd-init.cmd"
$RegPath = "HKCU:\Software\Microsoft\Command Processor"
if (-not (Test-Path $RegPath)) {
  New-Item -Path $RegPath -Force | Out-Null
}
Set-ItemProperty -Path $RegPath -Name "AutoRun" -Value "`"$CmdInitPath`""

Show-ZenBanner
Write-Host "  [OK] Installed zeN-Terminal (PowerShell, CMD & Windows Terminal)" -ForegroundColor Green
Write-Host "  [OK] Generated 8 @zen-ui/system Blackwall Lattice 1920x1080 wallpapers & Window Themes" -ForegroundColor Green
Write-Host "  [OK] Type 'zen-ui' in PowerShell or CMD to launch the full-screen interactive workbench!" -ForegroundColor Cyan
Write-Host ""
