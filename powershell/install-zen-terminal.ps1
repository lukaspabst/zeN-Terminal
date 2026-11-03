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

$DocsDir = [Environment]::GetFolderPath("MyDocuments")
if (-not $DocsDir) { $DocsDir = Join-Path $HOME "Documents" }

$ProfilePaths = @(
  $PROFILE.CurrentUserCurrentHost,
  $PROFILE.CurrentUserAllHosts,
  (Join-Path $DocsDir "PowerShell\Microsoft.PowerShell_profile.ps1"),
  (Join-Path $DocsDir "PowerShell\profile.ps1"),
  (Join-Path $DocsDir "WindowsPowerShell\Microsoft.PowerShell_profile.ps1"),
  (Join-Path $DocsDir "WindowsPowerShell\profile.ps1")
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
Write-Host "[OK] Installed zeN-Terminal into PowerShell profiles (`$PROFILE)" -ForegroundColor Green

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
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json",
  "$env:LOCALAPPDATA\Microsoft\Windows Terminal\settings.json"
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

      if ($wtJson.profiles.list) {
        foreach ($prof in $wtJson.profiles.list) {
          if ($prof.PSObject.Properties["colorScheme"]) {
            $prof.colorScheme = $ActiveSchemeName
          }
        }
      }

      $wtJson | ConvertTo-Json -Depth 32 | Set-Content $wtPath -Encoding UTF8
      Write-Host "[OK] Injected 8 @zen-ui/system schemes into Windows Terminal: $wtPath" -ForegroundColor Green
    } catch {
      Write-Warning "Could not automatically patch Windows Terminal settings.json: $_"
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
Write-Host "[OK] Overwrote classic Windows Console (conhost.exe) dark-blue palette & enabled 24-bit TrueColor VT" -ForegroundColor Green

if (Get-AppxPackage -Name "Microsoft.WindowsTerminal" -ErrorAction SilentlyContinue) {
  $StartupKey = "HKCU:\Console\%%Startup"
  if (-not (Test-Path -LiteralPath $StartupKey)) {
    New-Item -Path $StartupKey -Force | Out-Null
  }
  Set-ItemProperty -LiteralPath $StartupKey -Name "DelegationConsole" -Value "{2EACA947-7F5F-4CFA-BA87-8F7FBEEFBE69}" -Type String
  Set-ItemProperty -LiteralPath $StartupKey -Name "DelegationTerminal" -Value "{E12CFF52-A866-4C77-9A90-F570A7AA2C6B}" -Type String
  Write-Host "[OK] Set Windows Terminal as default host when launching cmd.exe or powershell.exe" -ForegroundColor Green
}

. (Join-Path $ZenHome "zen-profile.ps1")
Write-ZenCmdAutorunScript -ThemeId $Theme

$CmdInitPath = Join-Path $ZenHome "zen-cmd-init.cmd"
$RegPath = "HKCU:\Software\Microsoft\Command Processor"
if (-not (Test-Path $RegPath)) {
  New-Item -Path $RegPath -Force | Out-Null
}
Set-ItemProperty -Path $RegPath -Name "AutoRun" -Value "`"$CmdInitPath`""
Write-Host "[OK] Configured cmd.exe AutoRun prompt, banner & commands in $RegPath" -ForegroundColor Green

Write-Host ""
Write-Host "[CAPRI // ZEN-TERMINAL] Installed globally for PowerShell, CMD & Windows Terminal (theme: '$Theme')!" -ForegroundColor Cyan
Write-Host "  Commands available in BOTH PowerShell and CMD:" -ForegroundColor Yellow
Write-Host "    zen-themes                   -> List all 8 @zen-ui/system themes" -ForegroundColor Gray
Write-Host "    zen-theme <id>               -> Switch theme across PowerShell, CMD & Windows Terminal" -ForegroundColor Gray
Write-Host "    capri-guard <payload>        -> Scan text for SQLi, XSS & Prompt Injection" -ForegroundColor Gray
Write-Host "    zen-banner                   -> Render the zeN-Terminal telemetry header" -ForegroundColor Gray
