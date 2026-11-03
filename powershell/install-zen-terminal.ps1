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

$ProfilePaths = @(
  $PROFILE.CurrentUserCurrentHost,
  $PROFILE.CurrentUserAllHosts,
  (Join-Path $HOME "Documents\PowerShell\Microsoft.PowerShell_profile.ps1"),
  (Join-Path $HOME "Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1")
) | Select-Object -Unique

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

$Schemes = Get-Content (Join-Path $ScriptDir "windows-terminal-schemes.json") -Raw | ConvertFrom-Json
$SchemeMap = @{
  "blackwall-crimson" = "Capri // Blackwall Crimson"
  "obsidian-gold"     = "Zen // Obsidian Gold"
  "neon-emerald"      = "Zen // Neon Emerald"
  "midnight-cobalt"   = "Zen // Midnight Cobalt"
  "atelier-paper"     = "Zen // Atelier Paper"
  "nordic-snow"       = "Zen // Nordic Snow"
  "kyoto-matcha"      = "Zen // Kyoto Matcha"
  "cyber-daylight"    = "Zen // Cyber Daylight"
}
$ActiveSchemeName = $SchemeMap[$Theme]

$WtPaths = @(
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json",
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json"
)

foreach ($wtPath in $WtPaths) {
  if (Test-Path $wtPath) {
    $backupPath = "$wtPath.zen-backup"
    if (-not (Test-Path $backupPath)) {
      Copy-Item -Path $wtPath -Destination $backupPath -Force
    }
    try {
      $wtJson = Get-Content $wtPath -Raw | ConvertFrom-Json
      $existingSchemes = @()
      if ($wtJson.schemes) {
        $existingSchemes = @($wtJson.schemes | Where-Object { $_.name -notmatch "^(Capri|Zen) //" })
      }
      $wtJson | Add-Member -NotePropertyName "schemes" -NotePropertyValue ($existingSchemes + $Schemes) -Force

      if (-not $wtJson.profiles.defaults) {
        $wtJson.profiles | Add-Member -NotePropertyName "defaults" -NotePropertyValue ([pscustomobject]@{}) -Force
      }
      $wtJson.profiles.defaults | Add-Member -NotePropertyName "colorScheme" -NotePropertyValue $ActiveSchemeName -Force
      $wtJson.profiles.defaults | Add-Member -NotePropertyName "opacity" -NotePropertyValue 90 -Force
      $wtJson.profiles.defaults | Add-Member -NotePropertyName "useAcrylic" -NotePropertyValue $true -Force

      $wtJson | ConvertTo-Json -Depth 32 | Set-Content $wtPath -Encoding UTF8
      Write-Host "[OK] Injected 8 @zen-ui/system schemes into Windows Terminal: $wtPath" -ForegroundColor Green
    } catch {
      Write-Warning "Could not automatically patch Windows Terminal settings.json: $_"
    }
  }
}

if ($ConfigureCmd) {
  $CmdInitPath = Join-Path $ZenHome "zen-cmd-init.cmd"
  $CmdLines = @(
    "@echo off",
    "PROMPT `$E[38;2;148;163;184m[CAPRI // CMD]`$E[0m `$E[38;2;255;46;147m`$P`$E[0m`$_`$E[1;38;2;0;255;102m`$G`$E[0m "
  )
  Set-Content -Path $CmdInitPath -Value ($CmdLines -join "`r`n") -Encoding ASCII
  $RegPath = "HKCU:\Software\Microsoft\Command Processor"
  if (-not (Test-Path $RegPath)) {
    New-Item -Path $RegPath -Force | Out-Null
  }
  Set-ItemProperty -Path $RegPath -Name "AutoRun" -Value "`"$CmdInitPath`""
  Write-Host "[OK] Configured classic cmd.exe AutoRun prompt in $RegPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "[CAPRI // ZEN-TERMINAL] Installed with theme '$Theme'!" -ForegroundColor Cyan
Write-Host "  Restart PowerShell or run: . `$PROFILE" -ForegroundColor Yellow
Write-Host "  Switch themes anytime via: zen-theme obsidian-gold | zen-themes | capri-guard '<text>'" -ForegroundColor Gray
