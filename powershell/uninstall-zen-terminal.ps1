$ErrorActionPreference = "Stop"
$ZenHome = Join-Path $HOME ".zen-terminal"

$ProfilePaths = @(
  $PROFILE.CurrentUserCurrentHost,
  $PROFILE.CurrentUserAllHosts,
  (Join-Path $HOME "Documents\PowerShell\Microsoft.PowerShell_profile.ps1"),
  (Join-Path $HOME "Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1")
) | Select-Object -Unique

foreach ($pPath in $ProfilePaths) {
  if ($pPath -and (Test-Path $pPath)) {
    $content = Get-Content -Path $pPath -Raw
    $cleaned = [regex]::Replace(
      $content,
      "(?s)# >>> zeN-Terminal \(@zen-ui/system\) >>>.*?# <<< zeN-Terminal \(@zen-ui/system\) <<<\r?\n?",
      ""
    )
    Set-Content -Path $pPath -Value $cleaned.Trim() -Encoding UTF8
  }
}

$WtPaths = @(
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json",
  "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json"
)
foreach ($wtPath in $WtPaths) {
  $backupPath = "$wtPath.zen-backup"
  if (Test-Path $backupPath) {
    Copy-Item -Path $backupPath -Destination $wtPath -Force
    Remove-Item -Path $backupPath -Force
    Write-Host "[OK] Restored Windows Terminal settings backup: $wtPath" -ForegroundColor Green
  }
}

$RegPath = "HKCU:\Software\Microsoft\Command Processor"
if (Test-Path $RegPath) {
  Remove-ItemProperty -Path $RegPath -Name "AutoRun" -ErrorAction SilentlyContinue
}

if (Test-Path $ZenHome) {
  Remove-Item -Path $ZenHome -Recurse -Force
}

Write-Host "[OK] Uninstalled zeN-Terminal and restored original Windows PowerShell & Terminal settings." -ForegroundColor Green
