$Global:ZenThemes = @{
  "blackwall-crimson" = @{
    Id = "blackwall-crimson"
    Name = "Capri // Blackwall Crimson"
    Polarity = "DARK"
    AccentRgb = "255;46;147"
    SecondaryRgb = "0;255;102"
    MutedRgb = "148;163;184"
    InkRgb = "244;247;250"
    AccentHex = "#FF2E93"
    SecondaryHex = "#00FF66"
    CanvasHex = "#050508"
  }
  "obsidian-gold" = @{
    Id = "obsidian-gold"
    Name = "Zen // Obsidian Gold"
    Polarity = "DARK"
    AccentRgb = "245;184;65"
    SecondaryRgb = "251;146;60"
    MutedRgb = "166;159;145"
    InkRgb = "246;242;233"
    AccentHex = "#F5B841"
    SecondaryHex = "#FB923C"
    CanvasHex = "#070709"
  }
  "neon-emerald" = @{
    Id = "neon-emerald"
    Name = "Zen // Neon Emerald"
    Polarity = "DARK"
    AccentRgb = "16;185;129"
    SecondaryRgb = "45;212;191"
    MutedRgb = "110;231;183"
    InkRgb = "236;253;245"
    AccentHex = "#10B981"
    SecondaryHex = "#2DD4BF"
    CanvasHex = "#040807"
  }
  "midnight-cobalt" = @{
    Id = "midnight-cobalt"
    Name = "Zen // Midnight Cobalt"
    Polarity = "DARK"
    AccentRgb = "56;189;248"
    SecondaryRgb = "129;140;248"
    MutedRgb = "148;163;184"
    InkRgb = "241;245;249"
    AccentHex = "#38BDF8"
    SecondaryHex = "#818CF8"
    CanvasHex = "#060911"
  }
  "atelier-paper" = @{
    Id = "atelier-paper"
    Name = "Zen // Atelier Paper"
    Polarity = "LIGHT"
    AccentRgb = "180;83;9"
    SecondaryRgb = "194;65;12"
    MutedRgb = "110;105;95"
    InkRgb = "18;18;22"
    AccentHex = "#B45309"
    SecondaryHex = "#C2410C"
    CanvasHex = "#F6F2E9"
  }
  "nordic-snow" = @{
    Id = "nordic-snow"
    Name = "Zen // Nordic Snow"
    Polarity = "LIGHT"
    AccentRgb = "37;99;235"
    SecondaryRgb = "8;145;178"
    MutedRgb = "100;116;139"
    InkRgb = "15;23;42"
    AccentHex = "#2563EB"
    SecondaryHex = "#0891B2"
    CanvasHex = "#F8FAFC"
  }
  "kyoto-matcha" = @{
    Id = "kyoto-matcha"
    Name = "Zen // Kyoto Matcha"
    Polarity = "LIGHT"
    AccentRgb = "21;128;61"
    SecondaryRgb = "15;118;110"
    MutedRgb = "88;110;95"
    InkRgb = "20;32;24"
    AccentHex = "#15803D"
    SecondaryHex = "#0F766E"
    CanvasHex = "#F3F5F0"
  }
  "cyber-daylight" = @{
    Id = "cyber-daylight"
    Name = "Zen // Cyber Daylight"
    Polarity = "LIGHT"
    AccentRgb = "225;29;72"
    SecondaryRgb = "2;132;199"
    MutedRgb = "99;99;112"
    InkRgb = "9;9;13"
    AccentHex = "#E11D48"
    SecondaryHex = "#0284C7"
    CanvasHex = "#F2F2F5"
  }
}

$ZenStateFile = Join-Path $HOME ".zen-terminal\active-theme.txt"
if (Test-Path $ZenStateFile) {
  $SavedTheme = (Get-Content $ZenStateFile -Raw).Trim()
  if ($Global:ZenThemes.ContainsKey($SavedTheme)) {
    $Global:ActiveZenThemeId = $SavedTheme
  } else {
    $Global:ActiveZenThemeId = "blackwall-crimson"
  }
} else {
  $Global:ActiveZenThemeId = "blackwall-crimson"
}

function Apply-ZenPSReadLineColors {
  param([string]$ThemeId)
  $t = $Global:ZenThemes[$ThemeId]
  if (-not $t) { return }
  if (Get-Module -ListAvailable -Name PSReadLine) {
    $esc = [char]27
    Set-PSReadLineOption -Colors @{
      Command          = "$esc[38;2;$($t.AccentRgb)m"
      Parameter        = "$esc[38;2;$($t.SecondaryRgb)m"
      String           = "$esc[38;2;52;211;153m"
      Operator         = "$esc[38;2;$($t.AccentRgb)m"
      Variable         = "$esc[38;2;56;189;248m"
      Number           = "$esc[38;2;251;191;36m"
      Member           = "$esc[38;2;$($t.InkRgb)m"
      Type             = "$esc[38;2;$($t.SecondaryRgb)m"
      Comment          = "$esc[38;2;$($t.MutedRgb)m"
    }
  }
}

function Set-ZenTheme {
  param(
    [Parameter(Mandatory = $false)]
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
    [string]$ThemeId = "blackwall-crimson"
  )

  if (-not $Global:ZenThemes.ContainsKey($ThemeId)) {
    Write-Host "Unknown theme '$ThemeId'. Run 'zen-themes' to list all 8 themes." -ForegroundColor Red
    return
  }

  $Global:ActiveZenThemeId = $ThemeId
  $t = $Global:ZenThemes[$ThemeId]
  $stateDir = Join-Path $HOME ".zen-terminal"
  if (-not (Test-Path $stateDir)) {
    New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
  }
  Set-Content -Path (Join-Path $stateDir "active-theme.txt") -Value $ThemeId -Encoding UTF8

  Apply-ZenPSReadLineColors -ThemeId $ThemeId

  $wtPaths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json",
    "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json"
  )
  foreach ($wtPath in $wtPaths) {
    if (Test-Path $wtPath) {
      try {
        $json = Get-Content $wtPath -Raw | ConvertFrom-Json
        if (-not $json.profiles.defaults) {
          $json.profiles | Add-Member -NotePropertyName "defaults" -NotePropertyValue ([pscustomobject]@{}) -Force
        }
        $json.profiles.defaults | Add-Member -NotePropertyName "colorScheme" -NotePropertyValue $t.Name -Force
        $json | ConvertTo-Json -Depth 32 | Set-Content $wtPath -Encoding UTF8
      } catch {
      }
    }
  }

  $esc = [char]27
  $bolt = [char]0x26A1
  Write-Host "$esc[38;2;$($t.AccentRgb)m$bolt [CAPRI // ZEN-UI]$esc[0m Switched terminal theme to $esc[1;38;2;$($t.AccentRgb)m$($t.Name)$esc[0m ($($t.Polarity) | $($t.AccentHex))"
}

function Show-ZenThemes {
  $esc = [char]27
  $block = "$([char]0x2588)$([char]0x2588)"
  Write-Host ""
  Write-Host "  +------------------------------------------------------------------------------+"
  Write-Host "  |  @zen-ui/system : 8-THEME POLARITY MATRIX FOR WINDOWS TERMINAL & POWERSHELL  |"
  Write-Host "  +------------------------------------------------------------------------------+"
  foreach ($key in $Global:ZenThemes.Keys) {
    $t = $Global:ZenThemes[$key]
    $marker = if ($key -eq $Global:ActiveZenThemeId) { "* ACTIVE" } else { "        " }
    Write-Host ("  {0}  $esc[38;2;$($t.AccentRgb)m$block$esc[38;2;$($t.SecondaryRgb)m$block$esc[0m  {1,-20} {2,-28} [{3}]" -f $marker, $t.Id, $t.Name, $t.Polarity)
  }
  Write-Host ""
  Write-Host "  Usage: zen-theme <theme-id>   (e.g. zen-theme obsidian-gold)"
  Write-Host ""
}

function Invoke-CapriGuard {
  param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Payload
  )
  $esc = [char]27
  $check = [char]0x2714
  $cross = [char]0x2716
  $threats = @()

  if ($Payload -match "(?i)\b(ignore|disregard|forget|override|bypass)\s+(all\s+|any\s+)?(previous|prior|above|system|developer|guard)\s+(instructions?|prompts?|rules?|directives?|constraints?)") {
    $threats += "SYSTEM_PROMPT_OVERRIDE"
  }
  if ($Payload -match "(?i)(<\|im_start\|>|<\|im_end\|>|<\|system\|>|\[INST\]|</?system>|</?USER_REQUEST>)") {
    $threats += "ROLE_DELIMITER_INJECTION"
  }
  if ($Payload -match '(?i)(\bunion\s+(all\s+)?select\b|\bselect\b.{1,40}\bfrom\b|(?:\x27|"|\b)\s*(?:or|and)\s+(?:[\x27"]?\d+[\x27"]?\s*=\s*[\x27"]?\d+[\x27"]?|true\b)|;\s*(?:drop|delete|truncate|alter|update|insert)\s+(?:table|database|from|into)\b|\b(?:sleep|benchmark)\s*\(|\bwaitfor\s+delay\b|\$(?:where|ne|gt|lt|regex)\b)') {
    $threats += "SQL_NOSQL_INJECTION"
  }
  if ($Payload -match "(?i)(<script\b|javascript\s*:|on(?:error|load|mouseover|focus)\s*=)") {
    $threats += "XSS_PAYLOAD_SINK"
  }

  if ($threats.Count -eq 0) {
    Write-Host "$esc[38;2;0;255;102m$check [CAPRI // GUARD PASS]$esc[0m Input verified clean (0 SQLi, XSS, or Prompt Injection vectors)."
  } else {
    $joined = $threats -join ", "
    Write-Host "$esc[38;2;255;51;102m$cross [CAPRI // GUARD BLOCKED]$esc[0m Threat(s) detected: $esc[1;38;2;255;46;147m$joined$esc[0m"
  }
}

function Show-ZenBanner {
  $esc = [char]27
  $t = $Global:ZenThemes[$Global:ActiveZenThemeId]
  Write-Host "$esc[38;2;$($t.AccentRgb)m"
  Write-Host "  +==============================================================================+"
  Write-Host "  |  zeN-TERMINAL // CAPRI SHELL (@zen-ui/system)                                |"
  Write-Host "  +==============================================================================+$esc[0m"
  Write-Host "  $esc[38;2;$($t.SecondaryRgb)mTheme:$esc[0m $esc[1;38;2;$($t.AccentRgb)m$($t.Name)$esc[0m | $esc[38;2;$($t.SecondaryRgb)mCommands:$esc[0m zen-theme <id> | zen-themes | capri-guard <text>"
  Write-Host ""
}

Set-Alias -Name zen-theme -Value Set-ZenTheme -Scope Global
Set-Alias -Name zen-themes -Value Show-ZenThemes -Scope Global
Set-Alias -Name capri-guard -Value Invoke-CapriGuard -Scope Global
Set-Alias -Name zen-banner -Value Show-ZenBanner -Scope Global

Apply-ZenPSReadLineColors -ThemeId $Global:ActiveZenThemeId

function global:prompt {
  $lastOk = $?
  $esc = [char]27
  $topCorner = [char]0x256D
  $botCorner = [char]0x2570
  $dash = [char]0x2500
  $arrow = [char]0x276F
  $check = [char]0x2714
  $cross = [char]0x2716
  $gitIcon = [char]0x2387

  $t = $Global:ZenThemes[$Global:ActiveZenThemeId]
  if (-not $t) { $t = $Global:ZenThemes["blackwall-crimson"] }

  $cwd = (Get-Location).Path.Replace($HOME, "~")
  $gitBranch = ""
  if (Get-Command git -ErrorAction SilentlyContinue) {
    $branch = git rev-parse --abbrev-ref HEAD 2>$null
    if ($LASTEXITCODE -eq 0 -and $branch) {
      $gitBranch = "$dash[$esc[38;2;$($t.SecondaryRgb)m$gitIcon $branch$esc[38;2;$($t.MutedRgb)m]"
    }
  }

  $timeStr = (Get-Date).ToString("HH:mm:ss")
  $statusGlyph = if ($lastOk) { "$esc[38;2;$($t.SecondaryRgb)m$check" } else { "$esc[38;2;255;51;102m$cross" }

  $line1 = "$esc[38;2;$($t.MutedRgb)m$topCorner$dash[$esc[1;38;2;$($t.AccentRgb)mCAPRI // $($t.Id.ToUpper())$esc[0m$esc[38;2;$($t.MutedRgb)m]$dash[$esc[38;2;$($t.InkRgb)m$cwd$esc[38;2;$($t.MutedRgb)m]$gitBranch$dash[$timeStr]$esc[0m"
  $line2 = "$esc[38;2;$($t.MutedRgb)m$botCorner$dash$statusGlyph $esc[1;38;2;$($t.AccentRgb)m$arrow$esc[0m "
  return "`n$line1`n$line2"
}

Show-ZenBanner
