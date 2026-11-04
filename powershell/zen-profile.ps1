[Console]::InputEncoding  = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding           = [System.Text.Encoding]::UTF8

$Global:ZenThemes = [ordered]@{
  "blackwall-crimson" = @{
    Id             = "blackwall-crimson"
    Name           = "Capri // Blackwall Crimson"
    Polarity       = "DARK"
    AccentRgb      = "255;46;147"
    SecondaryRgb   = "0;255;102"
    MutedRgb       = "148;163;184"
    InkRgb         = "244;247;250"
    CanvasRgb      = "5;5;8"
    SurfaceRgb     = "22;12;24"
    AccentBgRgb    = "64;12;40"
    AccentHex      = "#FF2E93"
    SecondaryHex   = "#00FF66"
    CanvasHex      = "#050508"
    TabRowHex      = "#040407"
    TabActiveHex   = "#2B0B1E"
    InkHex         = "#F4F7FA"
  }
  "obsidian-gold" = @{
    Id             = "obsidian-gold"
    Name           = "Zen // Obsidian Gold"
    Polarity       = "DARK"
    AccentRgb      = "245;184;65"
    SecondaryRgb   = "251;146;60"
    MutedRgb       = "166;159;145"
    InkRgb         = "246;242;233"
    CanvasRgb      = "7;7;9"
    SurfaceRgb     = "26;22;14"
    AccentBgRgb    = "62;44;12"
    AccentHex      = "#F5B841"
    SecondaryHex   = "#FB923C"
    CanvasHex      = "#070709"
    TabRowHex      = "#060608"
    TabActiveHex   = "#2D210B"
    InkHex         = "#F6F2E9"
  }
  "neon-emerald" = @{
    Id             = "neon-emerald"
    Name           = "Zen // Neon Emerald"
    Polarity       = "DARK"
    AccentRgb      = "16;185;129"
    SecondaryRgb   = "45;212;191"
    MutedRgb       = "110;231;183"
    InkRgb         = "236;253;245"
    CanvasRgb      = "4;8;7"
    SurfaceRgb     = "12;28;22"
    AccentBgRgb    = "10;56;40"
    AccentHex      = "#10B981"
    SecondaryHex   = "#2DD4BF"
    CanvasHex      = "#040807"
    TabRowHex      = "#030706"
    TabActiveHex   = "#0B2B20"
    InkHex         = "#ECFDF5"
  }
  "midnight-cobalt" = @{
    Id             = "midnight-cobalt"
    Name           = "Zen // Midnight Cobalt"
    Polarity       = "DARK"
    AccentRgb      = "56;189;248"
    SecondaryRgb   = "129;140;248"
    MutedRgb       = "148;163;184"
    InkRgb         = "241;245;249"
    CanvasRgb      = "6;9;17"
    SurfaceRgb     = "16;26;46"
    AccentBgRgb    = "14;46;78"
    AccentHex      = "#38BDF8"
    SecondaryHex   = "#818CF8"
    CanvasHex      = "#060911"
    TabRowHex      = "#05070E"
    TabActiveHex   = "#0F2747"
    InkHex         = "#F1F5F9"
  }
  "atelier-paper" = @{
    Id             = "atelier-paper"
    Name           = "Zen // Atelier Paper"
    Polarity       = "LIGHT"
    AccentRgb      = "180;83;9"
    SecondaryRgb   = "194;65;12"
    MutedRgb       = "110;105;95"
    InkRgb         = "18;18;22"
    CanvasRgb      = "246;242;233"
    SurfaceRgb     = "229;222;206"
    AccentBgRgb    = "245;220;190"
    AccentHex      = "#B45309"
    SecondaryHex   = "#C2410C"
    CanvasHex      = "#F6F2E9"
    TabRowHex      = "#EAE3D2"
    TabActiveHex   = "#FFFFFF"
    InkHex         = "#121216"
  }
  "nordic-snow" = @{
    Id             = "nordic-snow"
    Name           = "Zen // Nordic Snow"
    Polarity       = "LIGHT"
    AccentRgb      = "37;99;235"
    SecondaryRgb   = "8;145;178"
    MutedRgb       = "100;116;139"
    InkRgb         = "15;23;42"
    CanvasRgb      = "248;250;252"
    SurfaceRgb     = "226;232;240"
    AccentBgRgb    = "219;234;254"
    AccentHex      = "#2563EB"
    SecondaryHex   = "#0891B2"
    CanvasHex      = "#F8FAFC"
    TabRowHex      = "#E2E8F0"
    TabActiveHex   = "#FFFFFF"
    InkHex         = "#0F172A"
  }
  "kyoto-matcha" = @{
    Id             = "kyoto-matcha"
    Name           = "Zen // Kyoto Matcha"
    Polarity       = "LIGHT"
    AccentRgb      = "21;128;61"
    SecondaryRgb   = "15;118;110"
    MutedRgb       = "88;110;95"
    InkRgb         = "20;32;24"
    CanvasRgb      = "243;245;240"
    SurfaceRgb     = "222;229;215"
    AccentBgRgb    = "220;252;231"
    AccentHex      = "#15803D"
    SecondaryHex   = "#0F766E"
    CanvasHex      = "#F3F5F0"
    TabRowHex      = "#E2E8DD"
    TabActiveHex   = "#FFFFFF"
    InkHex         = "#142018"
  }
  "cyber-daylight" = @{
    Id             = "cyber-daylight"
    Name           = "Zen // Cyber Daylight"
    Polarity       = "LIGHT"
    AccentRgb      = "225;29;72"
    SecondaryRgb   = "2;132;199"
    MutedRgb       = "99;99;112"
    InkRgb         = "9;9;13"
    CanvasRgb      = "242;242;245"
    SurfaceRgb     = "222;222;230"
    AccentBgRgb    = "255;228;234"
    AccentHex      = "#E11D48"
    SecondaryHex   = "#0284C7"
    CanvasHex      = "#F2F2F5"
    TabRowHex      = "#E4E4EB"
    TabActiveHex   = "#FFFFFF"
    InkHex         = "#09090D"
  }
}

$ZenHomeDir = Join-Path $HOME ".zen-terminal"
if (-not (Test-Path $ZenHomeDir)) {
  New-Item -ItemType Directory -Path $ZenHomeDir -Force | Out-Null
}

$ZenThemeStateFile     = Join-Path $ZenHomeDir "active-theme.txt"
$ZenPromptStateFile    = Join-Path $ZenHomeDir "active-prompt.txt"
$ZenWallpaperStateFile = Join-Path $ZenHomeDir "wallpaper-enabled.txt"
$ZenShaderStateFile    = Join-Path $ZenHomeDir "shader-enabled.txt"
$ZenGuardStateFile     = Join-Path $ZenHomeDir "guard-enabled.txt"

if (Test-Path $ZenThemeStateFile) {
  $savedTheme = (Get-Content $ZenThemeStateFile -Raw).Trim()
  $Global:ActiveZenThemeId = if ($Global:ZenThemes.Contains($savedTheme)) { $savedTheme } else { "blackwall-crimson" }
} else {
  $Global:ActiveZenThemeId = "blackwall-crimson"
}

$ValidPromptStyles = @("telemetry-2line", "netrunner-hud", "minimal-1line")
if (Test-Path $ZenPromptStateFile) {
  $savedPrompt = (Get-Content $ZenPromptStateFile -Raw).Trim()
  $Global:ActiveZenPromptStyle = if ($ValidPromptStyles -contains $savedPrompt) { $savedPrompt } else { "telemetry-2line" }
} else {
  $Global:ActiveZenPromptStyle = "telemetry-2line"
}

if (Test-Path $ZenWallpaperStateFile) {
  $Global:ZenWallpaperEnabled = ((Get-Content $ZenWallpaperStateFile -Raw).Trim() -ne "off")
} else {
  $Global:ZenWallpaperEnabled = $true
}

if (Test-Path $ZenShaderStateFile) {
  $Global:ZenShaderEnabled = ((Get-Content $ZenShaderStateFile -Raw).Trim() -eq "on")
} else {
  $Global:ZenShaderEnabled = $false
}

if (Test-Path $ZenGuardStateFile) {
  $Global:CapriGuardAuto = ((Get-Content $ZenGuardStateFile -Raw).Trim() -ne "off")
} else {
  $Global:CapriGuardAuto = $true
}

function Export-ZenShader {
  $shaderDir = Join-Path $ZenHomeDir "shaders"
  if (-not (Test-Path $shaderDir)) {
    New-Item -ItemType Directory -Path $shaderDir -Force | Out-Null
  }
  $shaderPath = Join-Path $shaderDir "capri-crt.hlsl"
  $hlsl = @"
Texture2D shaderTexture;
SamplerState samplerState;

cbuffer PixelShaderSettings {
  float  Time;
  float  Scale;
  float2 Resolution;
  float4 Background;
};

float4 main(float4 pos : SV_POSITION, float2 tex : TEXCOORD) : SV_TARGET {
  float4 color = shaderTexture.Sample(samplerState, tex);
  float headerMask = smoothstep(44.0, 58.0, tex.y * Resolution.y);
  float scanline = sin(tex.y * Resolution.y * 3.14159265) * 0.032 * headerMask;
  float2 uv = tex * (1.0 - tex.yx);
  float vig = lerp(1.0, pow(uv.x * uv.y * 15.0, 0.12), headerMask);
  color.rgb = saturate((color.rgb - scanline) * lerp(0.90, 1.03, vig));
  return color;
}
"@
  [System.IO.File]::WriteAllText($shaderPath, $hlsl, (New-Object System.Text.UTF8Encoding($false)))
  return $shaderPath
}

function New-ZenPillPath {
  param([int]$X, [int]$Y, [int]$Width, [int]$Height)
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = [math]::Max(4, $Height)
  $gp.AddArc($X, $Y, $d, $d, 90, 180)
  $gp.AddArc(($X + $Width - $d), $Y, $d, $d, 270, 180)
  $gp.CloseFigure()
  return $gp
}

function Export-ZenTabIcons {
  param([switch]$Force)
  $iconDir = Join-Path $ZenHomeDir "icons"
  if (-not (Test-Path $iconDir)) {
    New-Item -ItemType Directory -Path $iconDir -Force | Out-Null
  }
  try {
    Add-Type -AssemblyName System.Drawing -ErrorAction Stop
  } catch {
    return
  }

  foreach ($key in $Global:ZenThemes.Keys) {
    $t = $Global:ZenThemes[$key]
    $aParts = $t.AccentRgb -split ";"
    $sParts = $t.SecondaryRgb -split ";"

    foreach ($shellType in @("ps", "cmd")) {
      $iconPath = Join-Path $iconDir "$($t.Id)-$shellType.png"
      if ((-not $Force) -and (Test-Path $iconPath)) { continue }

      $sz = 64
      $bmp = New-Object System.Drawing.Bitmap($sz, $sz)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
      $g.Clear([System.Drawing.Color]::Transparent)

      $r = if ($shellType -eq "ps") { [int]$aParts[0] } else { [int]$sParts[0] }
      $gr = if ($shellType -eq "ps") { [int]$aParts[1] } else { [int]$sParts[1] }
      $b = if ($shellType -eq "ps") { [int]$aParts[2] } else { [int]$sParts[2] }

      $outerPts = @(
        (New-Object System.Drawing.Point(32, 4)),
        (New-Object System.Drawing.Point(60, 32)),
        (New-Object System.Drawing.Point(32, 60)),
        (New-Object System.Drawing.Point(4, 32))
      )
      $midPts = @(
        (New-Object System.Drawing.Point(32, 10)),
        (New-Object System.Drawing.Point(54, 32)),
        (New-Object System.Drawing.Point(32, 54)),
        (New-Object System.Drawing.Point(10, 32))
      )
      $corePts = @(
        (New-Object System.Drawing.Point(32, 15)),
        (New-Object System.Drawing.Point(49, 32)),
        (New-Object System.Drawing.Point(32, 49)),
        (New-Object System.Drawing.Point(15, 32))
      )

      $outerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(48, $r, $gr, $b))
      $midBrush   = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(115, $r, $gr, $b))
      $coreBrush  = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, $r, $gr, $b))
      $edgePen    = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 255, 255, 255), 1.5)

      $g.FillPolygon($outerBrush, $outerPts)
      $g.FillPolygon($midBrush, $midPts)
      $g.FillPolygon($coreBrush, $corePts)
      $g.DrawPolygon($edgePen, $corePts)

      $edgePen.Dispose()
      $coreBrush.Dispose()
      $midBrush.Dispose()
      $outerBrush.Dispose()
      $g.Dispose()

      $bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
      $bmp.Dispose()
    }
  }
}

function Export-ZenWallpapers {
  param([switch]$Force)
  $wallDir = Join-Path $ZenHomeDir "wallpapers"
  if (-not (Test-Path $wallDir)) {
    New-Item -ItemType Directory -Path $wallDir -Force | Out-Null
  }
  try {
    Add-Type -AssemblyName System.Drawing -ErrorAction Stop
  } catch {
    return
  }

  foreach ($key in $Global:ZenThemes.Keys) {
    $t = $Global:ZenThemes[$key]
    $legacyPath = Join-Path $wallDir "$($t.Id).png"
    if (Test-Path $legacyPath) {
      Remove-Item $legacyPath -Force -ErrorAction SilentlyContinue
    }
    $outPath = Join-Path $wallDir "$($t.Id)-4k.png"
    if ((-not $Force) -and (Test-Path $outPath)) { continue }

    $cParts  = $t.CanvasRgb -split ";"
    $aParts  = $t.AccentRgb -split ";"
    $sParts  = $t.SecondaryRgb -split ";"
    $sfParts = $t.SurfaceRgb -split ";"

    $w = 3840
    $h = 2160
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $bmp.SetResolution(96, 96)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.TextRenderingHint  = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $bgColor = [System.Drawing.Color]::FromArgb(255, [int]$cParts[0], [int]$cParts[1], [int]$cParts[2])
    $g.Clear($bgColor)

    $isDark = ($t.Polarity -eq "DARK")
    $glowAlpha1 = if ($isDark) { 42 } else { 24 }
    $glowAlpha2 = if ($isDark) { 28 } else { 18 }
    $minorAlpha = if ($isDark) { 13 } else { 15 }
    $majorAlpha = if ($isDark) { 30 } else { 30 }

    $path1 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path1.AddEllipse(($w - 1100), -300, 1400, 1000)
    $pgb1 = New-Object System.Drawing.Drawing2D.PathGradientBrush($path1)
    $pgb1.CenterColor = [System.Drawing.Color]::FromArgb($glowAlpha1, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2])
    $pgb1.SurroundColors = @([System.Drawing.Color]::FromArgb(0, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]))
    $g.FillPath($pgb1, $path1)
    $pgb1.Dispose()
    $path1.Dispose()

    $path2 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path2.AddEllipse(($w - 2600), 300, 1600, 1200)
    $pgb2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($path2)
    $pgb2.CenterColor = [System.Drawing.Color]::FromArgb($glowAlpha2, [int]$sParts[0], [int]$sParts[1], [int]$sParts[2])
    $pgb2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, [int]$sParts[0], [int]$sParts[1], [int]$sParts[2]))
    $g.FillPath($pgb2, $path2)
    $pgb2.Dispose()
    $path2.Dispose()

    $minorPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($minorAlpha, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]), 1)
    $majorPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb($majorAlpha, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]), 1)
    $crossPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(62, [int]$sParts[0], [int]$sParts[1], [int]$sParts[2]), 1)

    for ($x = $w; $x -ge 0; $x -= 48) {
      if ((($w - $x) % 240) -eq 0) {
        $g.DrawLine($majorPen, $x, 0, $x, $h)
      } else {
        $g.DrawLine($minorPen, $x, 0, $x, $h)
      }
    }
    for ($y = 0; $y -le $h; $y += 48) {
      if (($y % 240) -eq 0) {
        $g.DrawLine($majorPen, 0, $y, $w, $y)
      } else {
        $g.DrawLine($minorPen, 0, $y, $w, $y)
      }
    }

    for ($x = ($w - 240); $x -gt 0; $x -= 240) {
      for ($y = 240; $y -lt $h; $y += 240) {
        $g.DrawLine($crossPen, $x - 5, $y, $x + 5, $y)
        $g.DrawLine($crossPen, $x, $y - 5, $x, $y + 5)
      }
    }

    $topGlowRect = New-Object System.Drawing.Rectangle(0, 0, $w, 30)
    $topGlowBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
      $topGlowRect,
      [System.Drawing.Color]::FromArgb(72, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]),
      [System.Drawing.Color]::FromArgb(0, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]),
      [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
    )
    $g.FillRectangle($topGlowBrush, $topGlowRect)
    $topGlowBrush.Dispose()

    $hudPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(215, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]), 2)
    $g.DrawLine($hudPen, 0, 1, $w, 1)
    $g.DrawLine($hudPen, ($w - 1), 0, ($w - 1), $h)

    try {
      $fontFamily = try {
        New-Object System.Drawing.FontFamily("Cascadia Code")
      } catch {
        New-Object System.Drawing.FontFamily("Consolas")
      }
      $pillFont = New-Object System.Drawing.Font($fontFamily, 11, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
      $sf = New-Object System.Drawing.StringFormat([System.Drawing.StringFormat]::GenericTypographic)
      $sf.Alignment = [System.Drawing.StringAlignment]::Near
      $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

      $p1Text = $t.Name
      $p2Text = "GUARD: ARMED"

      $p1Measured = $g.MeasureString($p1Text, $pillFont, 1000, $sf)
      $p2Measured = $g.MeasureString($p2Text, $pillFont, 1000, $sf)

      $pillH = 30
      $pillY = 12
      $p2W = [int][math]::Ceiling($p2Measured.Width) + 42
      $p1W = [int][math]::Ceiling($p1Measured.Width) + 44
      $p2X = $w - $p2W - 20
      $p1X = $p2X - $p1W - 10

      $pill1Path = New-ZenPillPath -X $p1X -Y $pillY -Width $p1W -Height $pillH
      $pill1Bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, [int]$sfParts[0], [int]$sfParts[1], [int]$sfParts[2]))
      $pill1Border = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(240, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]), 1.8)
      $pill1TextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, [int]$aParts[0], [int]$aParts[1], [int]$aParts[2]))
      $g.FillPath($pill1Bg, $pill1Path)
      $g.DrawPath($pill1Border, $pill1Path)

      $dCx = $p1X + 18
      $dCy = $pillY + 15
      $diamondPts = @(
        (New-Object System.Drawing.Point($dCx, ($dCy - 6))),
        (New-Object System.Drawing.Point(($dCx + 6), $dCy)),
        (New-Object System.Drawing.Point($dCx, ($dCy + 6))),
        (New-Object System.Drawing.Point(($dCx - 6), $dCy))
      )
      $g.FillPolygon($pill1TextBrush, $diamondPts)

      $rect1 = New-Object System.Drawing.RectangleF(($p1X + 30), ($pillY + 1), ($p1W - 34), $pillH)
      $g.DrawString($p1Text, $pillFont, $pill1TextBrush, $rect1, $sf)

      $pill2Path = New-ZenPillPath -X $p2X -Y $pillY -Width $p2W -Height $pillH
      $pill2Bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 6, 38, 24))
      $pill2Border = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(240, 16, 185, 129), 1.8)
      $pill2TextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))
      $g.FillPath($pill2Bg, $pill2Path)
      $g.DrawPath($pill2Border, $pill2Path)

      $dotX = $p2X + 14
      $dotY = $pillY + 11
      $g.FillEllipse($pill2TextBrush, $dotX, $dotY, 8, 8)

      $rect2 = New-Object System.Drawing.RectangleF(($p2X + 28), ($pillY + 1), ($p2W - 32), $pillH)
      $g.DrawString($p2Text, $pillFont, $pill2TextBrush, $rect2, $sf)

      $pill1Path.Dispose()
      $pill2Path.Dispose()
      $pill1Bg.Dispose()
      $pill1Border.Dispose()
      $pill1TextBrush.Dispose()
      $pill2Bg.Dispose()
      $pill2Border.Dispose()
      $pill2TextBrush.Dispose()
      $sf.Dispose()
      $pillFont.Dispose()
      $fontFamily.Dispose()
    } catch {}

    $hudPen.Dispose()
    $crossPen.Dispose()
    $majorPen.Dispose()
    $minorPen.Dispose()
    $g.Dispose()

    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
  }
}

function Sync-ZenTerminalOscColors {
  param([string]$ThemeId)
  $t = $Global:ZenThemes[$ThemeId]
  if (-not $t) { return }
  try {
    $Host.UI.RawUI.WindowTitle = "zeN // PowerShell"
  } catch {}
  if ([Environment]::UserInteractive -and -not [Console]::IsOutputRedirected) {
    $esc = [char]27
    $bel = [char]7
    [Console]::Write("$esc]0;zeN // PowerShell$bel$esc]4;0;$($t.CanvasHex)$bel$esc]4;5;$($t.CanvasHex)$bel$esc]4;6;$($t.InkHex)$bel$esc]4;7;$($t.InkHex)$bel$esc]10;$($t.InkHex)$bel$esc]11;$($t.CanvasHex)$bel$esc]12;$($t.AccentHex)$bel")
  }
}

function Sync-ZenWindowsTerminalSettings {
  param([string]$ThemeId)
  $t = $Global:ZenThemes[$ThemeId]
  if (-not $t) { $t = $Global:ZenThemes["blackwall-crimson"] }

  Export-ZenTabIcons
  Export-ZenWallpapers
  $shaderPath    = Export-ZenShader
  $wallpaperPath = Join-Path $ZenHomeDir "wallpapers\$($t.Id)-4k.png"
  $psIconPath    = Join-Path $ZenHomeDir "icons\$($t.Id)-ps.png"
  $cmdIconPath   = Join-Path $ZenHomeDir "icons\$($t.Id)-cmd.png"

  $schemesPath = Join-Path $ZenHomeDir "windows-terminal-schemes.json"
  $schemes = $null
  if (Test-Path $schemesPath) {
    try { $schemes = Get-Content $schemesPath -Raw | ConvertFrom-Json } catch {}
  }

  $wtThemes = @()
  foreach ($k in $Global:ZenThemes.Keys) {
    $item = $Global:ZenThemes[$k]
    $appTheme = if ($item.Polarity -eq "DARK") { "dark" } else { "light" }
    $wtThemes += [pscustomobject]@{
      name   = $item.Name
      tab    = [pscustomobject]@{
        background          = $item.TabActiveHex
        unfocusedBackground = "#00000000"
        showCloseButton     = "always"
      }
      tabRow = [pscustomobject]@{
        background          = $item.TabRowHex
        unfocusedBackground = $item.CanvasHex
      }
      window = [pscustomobject]@{
        applicationTheme = $appTheme
        useMica          = $true
      }
    }
  }

  $wtPaths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json",
    "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json",
    "$env:LOCALAPPDATA\Microsoft\Windows Terminal\settings.json"
  )

  foreach ($wtPath in $wtPaths) {
    if (Test-Path $wtPath) {
      try {
        $json = Get-Content $wtPath -Raw | ConvertFrom-Json
        if ($schemes) {
          $existingSchemes = @()
          if ($json.schemes) {
            $existingSchemes = @($json.schemes | Where-Object { $_.name -notmatch "^(Capri|Zen) //" })
          }
          $json | Add-Member -NotePropertyName "schemes" -NotePropertyValue ($existingSchemes + $schemes) -Force
        }

        $json | Add-Member -NotePropertyName "themes" -NotePropertyValue $wtThemes -Force
        $json | Add-Member -NotePropertyName "theme" -NotePropertyValue $t.Name -Force
        $json | Add-Member -NotePropertyName "tabWidthMode" -NotePropertyValue "titleLength" -Force

        if (-not $json.profiles.defaults) {
          $json.profiles | Add-Member -NotePropertyName "defaults" -NotePropertyValue ([pscustomobject]@{}) -Force
        }
        $defs = $json.profiles.defaults
        $defs | Add-Member -NotePropertyName "colorScheme" -NotePropertyValue $t.Name -Force
        if ($defs.PSObject.Properties["tabColor"]) {
          $defs.PSObject.Properties.Remove("tabColor")
        }
        if (Test-Path $psIconPath) {
          $defs | Add-Member -NotePropertyName "icon" -NotePropertyValue $psIconPath -Force
        }
        $defs | Add-Member -NotePropertyName "suppressApplicationTitle" -NotePropertyValue $false -Force
        $defs | Add-Member -NotePropertyName "opacity" -NotePropertyValue 94 -Force
        $defs | Add-Member -NotePropertyName "useAcrylic" -NotePropertyValue $true -Force
        $defs | Add-Member -NotePropertyName "padding" -NotePropertyValue "20, 18, 20, 18" -Force
        $defs | Add-Member -NotePropertyName "cursorShape" -NotePropertyValue "bar" -Force
        $defs | Add-Member -NotePropertyName "intenseTextStyle" -NotePropertyValue "all" -Force
        $defs | Add-Member -NotePropertyName "font" -NotePropertyValue ([pscustomobject]@{
          face = "Cascadia Code"
          size = 10.5
        }) -Force

        if ($Global:ZenWallpaperEnabled -and (Test-Path $wallpaperPath)) {
          $defs | Add-Member -NotePropertyName "backgroundImage" -NotePropertyValue $wallpaperPath -Force
          $defs | Add-Member -NotePropertyName "backgroundImageOpacity" -NotePropertyValue 0.94 -Force
          $defs | Add-Member -NotePropertyName "backgroundImageStretchMode" -NotePropertyValue "none" -Force
          $defs | Add-Member -NotePropertyName "backgroundImageAlignment" -NotePropertyValue "topRight" -Force
        } else {
          if ($defs.PSObject.Properties["backgroundImage"]) {
            $defs.PSObject.Properties.Remove("backgroundImage")
          }
        }

        if ($Global:ZenShaderEnabled -and (Test-Path $shaderPath)) {
          $defs | Add-Member -NotePropertyName "experimental.pixelShaderPath" -NotePropertyValue $shaderPath -Force
        } else {
          if ($defs.PSObject.Properties["experimental.pixelShaderPath"]) {
            $defs.PSObject.Properties.Remove("experimental.pixelShaderPath")
          }
        }

        if ($json.profiles.list) {
          foreach ($prof in $json.profiles.list) {
            if ($prof.PSObject.Properties["colorScheme"]) {
              $prof.colorScheme = $t.Name
            }
            if ($prof.PSObject.Properties["tabColor"]) {
              $prof.PSObject.Properties.Remove("tabColor")
            }
            if ($prof.commandline -match "powershell\.exe" -and $prof.commandline -notmatch "-NoLogo") {
              $prof.commandline = "$($prof.commandline) -NoLogo"
            }
            if (($prof.commandline -match "powershell\.exe" -or $prof.name -match "Windows PowerShell|zeN // PowerShell") -and ($prof.name -notmatch "Developer")) {
              $prof | Add-Member -NotePropertyName "name" -NotePropertyValue "zeN // PowerShell" -Force
              $prof | Add-Member -NotePropertyName "tabTitle" -NotePropertyValue "zeN // PowerShell" -Force
              $prof | Add-Member -NotePropertyName "suppressApplicationTitle" -NotePropertyValue $false -Force
              if (Test-Path $psIconPath) {
                $prof | Add-Member -NotePropertyName "icon" -NotePropertyValue $psIconPath -Force
              }
            }
            if (($prof.commandline -match "cmd\.exe" -or $prof.name -match "Eingabeaufforderung|Command Prompt|zeN // CMD") -and ($prof.name -notmatch "Developer")) {
              $prof | Add-Member -NotePropertyName "name" -NotePropertyValue "zeN // CMD" -Force
              $prof | Add-Member -NotePropertyName "tabTitle" -NotePropertyValue "zeN // CMD" -Force
              $prof | Add-Member -NotePropertyName "suppressApplicationTitle" -NotePropertyValue $false -Force
              if (Test-Path $cmdIconPath) {
                $prof | Add-Member -NotePropertyName "icon" -NotePropertyValue $cmdIconPath -Force
              }
            }
          }
        }

        $json | ConvertTo-Json -Depth 32 | Set-Content $wtPath -Encoding UTF8
      } catch {}
    }
  }
}

function Get-ZenTelemetrySnapshot {
  if ($Global:ZenCachedTelemetry) {
    return $Global:ZenCachedTelemetry
  }
  $ramPct  = 32
  $ramText = "Active"
  try {
    $os = Get-CimInstance Win32_OperatingSystem -ErrorAction Stop
    $totalGb = [math]::Round($os.TotalVisibleMemorySize / 1MB, 1)
    $freeGb  = [math]::Round($os.FreePhysicalMemory / 1MB, 1)
    $usedGb  = [math]::Round($totalGb - $freeGb, 1)
    if ($totalGb -gt 0) {
      $ramPct = [int][math]::Round(($usedGb / $totalGb) * 100)
    }
    $ramText = "$usedGb / $totalGb GB ($ramPct%)"
  } catch {}

  $barFull  = [char]0x2588
  $barEmpty = [char]0x2591
  $filledCount = [math]::Max(1, [math]::Min(10, [int][math]::Round($ramPct / 10)))
  $emptyCount  = 10 - $filledCount
  $ramBar = ($barFull.ToString() * $filledCount) + ($barEmpty.ToString() * $emptyCount)

  $Global:ZenCachedTelemetry = @{
    RamPct  = $ramPct
    RamText = $ramText
    RamBar  = $ramBar
    Host    = $env:COMPUTERNAME
    User    = $env:USERNAME
    PsVer   = "$($PSVersionTable.PSVersion.Major).$($PSVersionTable.PSVersion.Minor)"
  }
  return $Global:ZenCachedTelemetry
}

function ConvertTo-Cmd512SafeUtf8 {
  param([string]$Text)
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  $bytes = [System.Collections.Generic.List[byte]]::new($utf8.GetBytes($Text))

  $chunkEnd = 512
  while ($chunkEnd -lt $bytes.Count) {
    if (($bytes[$chunkEnd] -band 0xC0) -eq 0x80) {
      $leadIdx = $chunkEnd - 1
      while ($leadIdx -gt 0 -and (($bytes[$leadIdx] -band 0xC0) -eq 0x80)) {
        $leadIdx--
      }
      $padNeeded = $chunkEnd - $leadIdx
      $insertPos = -1
      for ($i = $leadIdx - 1; $i -ge [math]::Max(0, $chunkEnd - 500); $i--) {
        if ($bytes[$i] -eq 0x1B -and ($i + 1) -lt $bytes.Count -and $bytes[$i + 1] -eq 0x5B) {
          $insertPos = $i + 2
          break
        }
      }
      if ($insertPos -ge 0) {
        for ($p = 0; $p -lt $padNeeded; $p++) {
          $bytes.Insert($insertPos, [byte]0x30)
        }
      } else {
        for ($p = 0; $p -lt $padNeeded; $p++) {
          $bytes.Insert($leadIdx, [byte]0x20)
        }
      }
    }
    $chunkEnd += 512
  }
  return $bytes.ToArray()
}

function Format-ZenBoxRow {
  param(
    [string]$Content,
    [int]$InnerWidth = 86,
    [string]$BorderColor = ""
  )
  $esc = [char]27
  $vt  = [char]0x2502
  $rst = "$esc[0m"
  $plain = [regex]::Replace($Content, "\x1b\[[0-9;]*m", "")
  $padLen = $InnerWidth - $plain.Length
  if ($padLen -lt 0) { $padLen = 0 }
  $pad = " " * $padLen
  return "  $BorderColor$vt$rst$Content$pad$BorderColor$vt$rst"
}

function Format-ZenHudBannerLines {
  param(
    [string]$ThemeId = $Global:ActiveZenThemeId,
    [string]$ShellName = "POWERSHELL"
  )
  $t = $Global:ZenThemes[$ThemeId]
  if (-not $t) { $t = $Global:ZenThemes["blackwall-crimson"] }

  $esc      = [char]27
  $tl       = [char]0x256D
  $tr       = [char]0x256E
  $bl       = [char]0x2570
  $br       = [char]0x256F
  $hz       = [char]0x2500
  $vt       = [char]0x2502
  $ml       = [char]0x251C
  $mr       = [char]0x2524
  $lb       = [char]0x27E6
  $rb       = [char]0x27E7
  $diamond  = [char]0x25C6
  $dot      = [char]0x25CF
  $mid      = [char]0x00B7
  $block    = [char]0x2588
  $dHalf    = [char]0x2584
  $boxDR    = [char]0x2554
  $boxDL    = [char]0x2557
  $boxUR    = [char]0x255A
  $boxUL    = [char]0x255D
  $boxH     = [char]0x2550
  $boxV     = [char]0x2551

  $ac   = "$esc[38;2;$($t.AccentRgb)m"
  $acB  = "$esc[1;38;2;$($t.AccentRgb)m"
  $sc   = "$esc[38;2;$($t.SecondaryRgb)m"
  $scB  = "$esc[1;38;2;$($t.SecondaryRgb)m"
  $mu   = "$esc[38;2;$($t.MutedRgb)m"
  $in   = "$esc[38;2;$($t.InkRgb)m"
  $inB  = "$esc[1;38;2;$($t.InkRgb)m"
  $rst  = "$esc[0m"

  $pillAccent = "$esc[1;48;2;$($t.AccentRgb)m$esc[38;2;$($t.CanvasRgb)m"
  $pillSurf   = "$esc[48;2;$($t.SurfaceRgb)m$esc[1;38;2;$($t.AccentRgb)m"
  $pillGuard  = if ($Global:CapriGuardAuto) {
    "$esc[48;2;6;48;28m$esc[1;38;2;0;255;102m $dot CAPRI GUARD: ARMED $rst"
  } else {
    "$esc[48;2;60;16;24m$esc[1;38;2;255;51;102m $dot CAPRI GUARD: BYPASSED $rst"
  }

  $swatches = @()
  foreach ($k in $Global:ZenThemes.Keys) {
    $item = $Global:ZenThemes[$k]
    $glyph = if ($k -eq $t.Id) { "$esc[1;38;2;$($item.AccentRgb)m$block$block$rst" } else { "$esc[38;2;$($item.AccentRgb)m$dHalf$dHalf$rst" }
    $swatches += $glyph
  }
  $swatchStrip = $swatches -join " "

  $tel = Get-ZenTelemetrySnapshot
  $W = 88
  $lineFull = $hz.ToString() * $W

  $logo1 = "$acB  $block$block$block$block$block$block$block$boxDL$block$block$block$block$block$block$block$boxDL$block$block$block$boxDL   $block$block$boxDL$rst"
  $logo2 = "$acB  $boxUR$boxH$boxH$block$block$block$boxUL $block$block$boxDR$boxH$boxH$boxH$boxH$boxUL$block$block$block$block$boxDL  $block$block$boxV$rst"
  $logo3 = "$ac    $block$block$block$boxUL  $block$block$block$block$block$boxDL  $block$block$boxDR$block$block$boxDL $block$block$boxV$rst"
  $logo4 = "$sc   $block$block$block$boxUL   $block$block$boxDR$boxH$boxH$boxUL  $block$block$boxV$boxUR$block$block$boxDL$block$block$boxV$rst"
  $logo5 = "$scB  $block$block$block$block$block$block$block$boxDL$block$block$block$block$block$block$block$boxDL$block$block$boxV $boxUR$block$block$block$block$boxV$rst"
  $logo6 = "$sc  $boxUR$boxH$boxH$boxH$boxH$boxH$boxH$boxUL$boxUR$boxH$boxH$boxH$boxH$boxH$boxH$boxUL$boxUR$boxH$boxUL  $boxUR$boxH$boxH$boxH$boxUL$rst"

  $wallState   = if ($Global:ZenWallpaperEnabled) { "LATTICE ON" } else { "LATTICE OFF" }
  $shaderState = if ($Global:ZenShaderEnabled) { "SHADER ON" } else { "SHADER OFF" }

  $hdrText = " $pillAccent $diamond zeN-TERMINAL // CAPRI SHELL $rst  $pillSurf @zen-ui/system $mid $ShellName $rst"
  $divText = " $acB$diamond WORKBENCH COMMANDS$rst $mu$mid HTTPS://TERMINAL.LPABST.DEV$rst"

  $lines = @(
    "",
    "  $mu$tl$lineFull$tr$rst",
    (Format-ZenBoxRow -Content $hdrText -InnerWidth $W -BorderColor $mu),
    "  $mu$ml$lineFull$mr$rst",
    (Format-ZenBoxRow -Content "$logo1   $mu$vt$rst  $mu`SCHEME   :$rst $acB$($t.Name.PadRight(26))$rst $pillSurf $($t.Polarity) $mid $($t.AccentHex) $rst" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "$logo2   $mu$vt$rst  $mu`TOPOLOGY :$rst $inB$($Global:ActiveZenPromptStyle.PadRight(18))$rst $mu($wallState $mid $shaderState)$rst" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "$logo3   $mu$vt$rst  $mu`FIREWALL :$rst $pillGuard" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "$logo4   $mu$vt$rst  $mu`HOST SYS :$rst $in$($tel.Host)$rst $mu$mid User:$rst $in$($tel.User)$rst $mu$mid$rst $sc$ShellName$rst" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "$logo5   $mu$vt$rst  $mu`MEMORY   :$rst $sc[$($tel.RamBar)]$rst $in$($tel.RamText)$rst" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "$logo6   $mu$vt$rst  $mu`MATRIX   :$rst $swatchStrip  $mu(8 Themes)$rst" -InnerWidth $W -BorderColor $mu),
    "  $mu$ml$lineFull$mr$rst",
    (Format-ZenBoxRow -Content $divText -InnerWidth $W -BorderColor $mu),
    "  $mu$ml$lineFull$mr$rst",
    (Format-ZenBoxRow -Content "  $pillSurf zen-ui         $rst $in`Interactive TUI Workbench  $rst $pillSurf zen-themes      $rst $in`8-Theme Matrix$rst" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "  $pillSurf zen-theme <id> $rst $in`Switch Theme Live          $rst $pillSurf zen-prompt <id> $rst $in`Switch Prompt Style$rst" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "  $pillSurf capri-guard    $rst $in`Scan SQLi / XSS / Prompt   $rst $pillSurf ll / zen-status $rst $in`DataTable & HUD$rst" -InnerWidth $W -BorderColor $mu),
    (Format-ZenBoxRow -Content "  $pillSurf zen-wallpaper  $rst $in`Toggle Blackwall Lattice   $rst $pillSurf zen-shader      $rst $in`Toggle CRT Shader$rst" -InnerWidth $W -BorderColor $mu),
    "  $mu$bl$lineFull$br$rst",
    ""
  )
  return $lines
}

function Export-ZenPrintHelper {
  $exePath = Join-Path $ZenHomeDir "zen-print.exe"
  if (Test-Path $exePath) { return $exePath }
  try {
    $cs = @"
using System;
using System.IO;
using System.Text;
public class ZenPrint {
  public static void Main(string[] args) {
    Console.OutputEncoding = Encoding.UTF8;
    if (args.Length > 0 && File.Exists(args[0])) {
      Console.Write(File.ReadAllText(args[0], Encoding.UTF8));
    }
  }
}
"@
    Add-Type -TypeDefinition $cs -OutputAssembly $exePath -OutputType ConsoleApplication -ErrorAction Stop
  } catch {}
  return $exePath
}

function Write-ZenCmdAutorunScript {
  param([string]$ThemeId = $Global:ActiveZenThemeId)
  $t = $Global:ZenThemes[$ThemeId]
  if (-not $t) { $t = $Global:ZenThemes["blackwall-crimson"] }

  $ZenPrintExe   = Export-ZenPrintHelper
  $CmdInitPath   = Join-Path $ZenHomeDir "zen-cmd-init.cmd"
  $CmdUtf8Path   = Join-Path $ZenHomeDir "zen-cmd-utf8.cmd"
  $CmdBannerPath = Join-Path $ZenHomeDir "zen-cmd-banner.txt"

  $bannerLines = Format-ZenHudBannerLines -ThemeId $ThemeId -ShellName "CMD.EXE"
  $safeBannerBytes = ConvertTo-Cmd512SafeUtf8 -Text (($bannerLines -join "`r`n") + "`r`n")
  [System.IO.File]::WriteAllBytes($CmdBannerPath, $safeBannerBytes)

  $esc      = [char]27
  $bel      = [char]7
  $topC     = [char]0x256D
  $botC     = [char]0x2570
  $dash     = [char]0x2500
  $boxDR    = [char]0x2554
  $boxUR    = [char]0x255A
  $boxH     = [char]0x2550
  $lb       = [char]0x27E6
  $rb       = [char]0x27E7
  $bolt     = [char]0x25C6
  $check    = [char]0x2714
  $arrow    = [char]0x276F
  $dot      = [char]0x25CF
  $idUpper  = $t.Id.ToUpper()

  $oscSeq = "$esc]0;zeN // CMD$bel$esc]4;0;$($t.CanvasHex)$bel$esc]4;5;$($t.CanvasHex)$bel$esc]4;6;$($t.InkHex)$bel$esc]4;7;$($t.InkHex)$bel$esc]10;$($t.InkHex)$bel$esc]11;$($t.CanvasHex)$bel$esc]12;$($t.AccentHex)$bel"

  if ($Global:ActiveZenPromptStyle -eq "minimal-1line") {
    $cmdPrompt = "PROMPT `$E[1;38;2;$($t.AccentRgb)m$bolt`$E[0m `$E[1;38;2;$($t.InkRgb)m`$P`$E[0m `$E[1;38;2;$($t.AccentRgb)m$arrow`$E[0m "
  } elseif ($Global:ActiveZenPromptStyle -eq "netrunner-hud") {
    $cmdPrompt = "PROMPT `$E[1;48;2;$($t.SurfaceRgb)m`$E[1;38;2;$($t.AccentRgb)m $bolt zen `$E[0m  `$E[1;38;2;$($t.InkRgb)m`$P`$E[0m`$_ `$E[1;38;2;$($t.AccentRgb)m$arrow`$E[0m "
  } else {
    $cmdPrompt = "PROMPT `$E[1;48;2;$($t.SurfaceRgb)m`$E[1;38;2;$($t.AccentRgb)m $bolt zen `$E[0m  `$E[1;38;2;$($t.InkRgb)m`$P`$E[0m  `$E[1;38;2;$($t.AccentRgb)m$arrow`$E[0m "
  }

  $printCmd = if (Test-Path $ZenPrintExe) { "`"$ZenPrintExe`" `"$CmdBannerPath`"" } else { "type `"$CmdBannerPath`"" }

  $Utf8Lines = @(
    "@echo off",
    "title zeN // CMD",
    "cls",
    "echo $oscSeq",
    $printCmd,
    $cmdPrompt,
    "doskey zen-ui=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Start-ZenWorkbench`" `$T call `"$CmdUtf8Path`"",
    "doskey zen=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Start-ZenWorkbench`" `$T call `"$CmdUtf8Path`"",
    "doskey zen-themes=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Show-ZenThemes`"",
    "doskey zen-banner=cls `$T $printCmd",
    "doskey zen-status=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Show-ZenStatus`"",
    "doskey zen-help=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Show-ZenHelp`"",
    "doskey ll=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Show-ZenDirectory`"",
    "doskey capri-guard=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Invoke-CapriGuard `$*`"",
    "doskey zen-theme=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Set-ZenTheme `$1`" `$T call `"$CmdUtf8Path`"",
    "doskey zen-prompt=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Set-ZenPrompt `$1`" `$T call `"$CmdUtf8Path`"",
    "doskey zen-wallpaper=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Set-ZenWallpaper `$1`"",
    "doskey zen-shader=powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command `". '$HOME\.zen-terminal\zen-profile.ps1'; Set-ZenShader `$1`""
  )
  $safeUtf8CmdBytes = ConvertTo-Cmd512SafeUtf8 -Text ($Utf8Lines -join "`r`n")
  [System.IO.File]::WriteAllBytes($CmdUtf8Path, $safeUtf8CmdBytes)

  $InitAsciiLines = @(
    "@echo off",
    "setlocal EnableDelayedExpansion",
    "set `"_zen_cmd=!CMDCMDLINE!`"",
    "if not `"!_zen_cmd!`" == `"!_zen_cmd:/c=!`" (",
    "  endlocal",
    "  exit /b 0",
    ")",
    "if not `"!_zen_cmd!`" == `"!_zen_cmd:/C=!`" (",
    "  endlocal",
    "  exit /b 0",
    ")",
    "endlocal",
    "chcp 65001 >nul 2>&1",
    "call `"$CmdUtf8Path`""
  )
  [System.IO.File]::WriteAllText($CmdInitPath, ($InitAsciiLines -join "`r`n"), [System.Text.Encoding]::ASCII)
}

function Apply-ZenPSReadLineColors {
  param([string]$ThemeId)
  $t = $Global:ZenThemes[$ThemeId]
  if (-not $t) { return }
  if (Get-Module -ListAvailable -Name PSReadLine) {
    $esc = [char]27
    Set-PSReadLineOption -BellStyle None -HistoryNoDuplicates -Colors @{
      Command   = "$esc[1;38;2;$($t.AccentRgb)m"
      Parameter = "$esc[38;2;$($t.SecondaryRgb)m"
      String    = "$esc[38;2;52;211;153m"
      Operator  = "$esc[38;2;$($t.AccentRgb)m"
      Variable  = "$esc[38;2;56;189;248m"
      Number    = "$esc[38;2;251;191;36m"
      Member    = "$esc[38;2;$($t.InkRgb)m"
      Type      = "$esc[38;2;$($t.SecondaryRgb)m"
      Comment   = "$esc[38;2;$($t.MutedRgb)m"
    }
  }
}

function Test-CapriPayload {
  param([string]$Payload)
  $threats = @()
  if (-not $Payload) { return $threats }
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
  return $threats
}

function Show-CapriInterceptAlert {
  param(
    [string]$Payload,
    [string[]]$Threats
  )
  $esc   = [char]27
  $tl    = [char]0x256D
  $tr    = [char]0x256E
  $bl    = [char]0x2570
  $br    = [char]0x256F
  $hz    = [char]0x2500
  $vt    = [char]0x2502
  $cross = [char]0x2716
  $line  = $hz.ToString() * 78
  $joined = $Threats -join " | "
  Write-Host ""
  Write-Host "  $esc[38;2;255;51;102m$tl$line$tr$esc[0m"
  Write-Host "  $esc[38;2;255;51;102m$vt$esc[0m  $esc[1;48;2;90;12;32m$esc[1;38;2;255;80;120m $cross CAPRI GUARD // COMMAND INTERCEPTED BEFORE EXECUTION $esc[0m"
  Write-Host "  $esc[38;2;255;51;102m$vt$esc[0m  $esc[38;2;244;247;250mVectors : $esc[1;38;2;255;46;147m$joined$esc[0m"
  Write-Host "  $esc[38;2;255;51;102m$vt$esc[0m  $esc[38;2;148;163;184mBuffer  : $Payload$esc[0m"
  Write-Host "  $esc[38;2;255;51;102m$bl$line$br$esc[0m"
}

if (Get-Module -ListAvailable -Name PSReadLine) {
  try {
    Set-PSReadLineKeyHandler -Chord Enter -ScriptBlock {
      $line = $null
      $cursor = $null
      [Microsoft.PowerShell.PSConsoleReadLine]::GetBufferState([ref]$line, [ref]$cursor)
      if ($Global:CapriGuardAuto -and $line -and $line.Trim() -notmatch '^(capri-guard|Invoke-CapriGuard)\b') {
        $threats = Test-CapriPayload -Payload $line
        if ($threats.Count -gt 0) {
          Write-Host ""
          Show-CapriInterceptAlert -Payload $line -Threats $threats
          [Microsoft.PowerShell.PSConsoleReadLine]::RevertLine()
          [Microsoft.PowerShell.PSConsoleReadLine]::InvokePrompt()
          return
        }
      }
      [Microsoft.PowerShell.PSConsoleReadLine]::AcceptLine()
    }
  } catch {}
}

function Set-ZenTheme {
  param(
    [Parameter(Mandatory = $false, Position = 0)]
    [string]$ThemeId = "blackwall-crimson"
  )
  $ThemeId = $ThemeId.ToLower().Trim()
  if (-not $Global:ZenThemes.Contains($ThemeId)) {
    Write-Host "  Unknown theme '$ThemeId'. Run 'zen-themes' to list all 8 themes." -ForegroundColor Red
    return
  }

  $Global:ActiveZenThemeId = $ThemeId
  $t = $Global:ZenThemes[$ThemeId]
  Set-Content -Path $ZenThemeStateFile -Value $ThemeId -Encoding UTF8

  Apply-ZenPSReadLineColors -ThemeId $ThemeId
  Sync-ZenTerminalOscColors -ThemeId $ThemeId
  Sync-ZenWindowsTerminalSettings -ThemeId $ThemeId
  Write-ZenCmdAutorunScript -ThemeId $ThemeId

  $esc   = [char]27
  $bolt  = [char]0x25C6
  $check = [char]0x2714
  $mid   = [char]0x00B7
  Write-Host ""
  Write-Host "  $esc[1;48;2;$($t.AccentRgb)m$esc[38;2;$($t.CanvasRgb)m $bolt CAPRI // ZEN-UI $esc[0m $esc[38;2;$($t.SecondaryRgb)m$check$esc[0m Switched PowerShell, Windows Terminal & CMD to $esc[1;38;2;$($t.AccentRgb)m$($t.Name)$esc[0m ($($t.Polarity) $mid $($t.AccentHex))"
  Write-Host ""
}

function Set-ZenPrompt {
  param(
    [Parameter(Mandatory = $false, Position = 0)]
    [ValidateSet("telemetry-2line", "netrunner-hud", "minimal-1line", "1", "2", "3")]
    [string]$Style = "telemetry-2line"
  )
  $mapped = switch ($Style) {
    "1" { "telemetry-2line" }
    "2" { "netrunner-hud" }
    "3" { "minimal-1line" }
    default { $Style.ToLower() }
  }
  $Global:ActiveZenPromptStyle = $mapped
  Set-Content -Path $ZenPromptStateFile -Value $mapped -Encoding UTF8
  Write-ZenCmdAutorunScript -ThemeId $Global:ActiveZenThemeId

  $t = $Global:ZenThemes[$Global:ActiveZenThemeId]
  $esc = [char]27
  $check = [char]0x2714
  Write-Host ""
  Write-Host "  $esc[1;48;2;$($t.SurfaceRgb)m$esc[1;38;2;$($t.AccentRgb)m PROMPT TOPOLOGY $esc[0m $esc[38;2;$($t.SecondaryRgb)m$check$esc[0m Active prompt style set to $esc[1;38;2;$($t.AccentRgb)m$mapped$esc[0m (Synced to PowerShell & CMD)"
  Write-Host ""
}

function Set-ZenWallpaper {
  param(
    [Parameter(Mandatory = $false, Position = 0)]
    [ValidateSet("on", "off", "toggle")]
    [string]$Mode = "toggle"
  )
  if ($Mode -eq "toggle") {
    $Global:ZenWallpaperEnabled = -not $Global:ZenWallpaperEnabled
  } else {
    $Global:ZenWallpaperEnabled = ($Mode -eq "on")
  }
  $val = if ($Global:ZenWallpaperEnabled) { "on" } else { "off" }
  Set-Content -Path $ZenWallpaperStateFile -Value $val -Encoding UTF8
  Sync-ZenWindowsTerminalSettings -ThemeId $Global:ActiveZenThemeId

  $t = $Global:ZenThemes[$Global:ActiveZenThemeId]
  $esc = [char]27
  Write-Host "  $esc[1;48;2;$($t.SurfaceRgb)m$esc[1;38;2;$($t.AccentRgb)m BLACKWALL LATTICE BG $esc[0m Wallpaper set to $esc[1;38;2;$($t.SecondaryRgb)m$($val.ToUpper())$esc[0m in Windows Terminal."
}

function Set-ZenShader {
  param(
    [Parameter(Mandatory = $false, Position = 0)]
    [ValidateSet("on", "off", "toggle")]
    [string]$Mode = "toggle"
  )
  if ($Mode -eq "toggle") {
    $Global:ZenShaderEnabled = -not $Global:ZenShaderEnabled
  } else {
    $Global:ZenShaderEnabled = ($Mode -eq "on")
  }
  $val = if ($Global:ZenShaderEnabled) { "on" } else { "off" }
  Set-Content -Path $ZenShaderStateFile -Value $val -Encoding UTF8
  Sync-ZenWindowsTerminalSettings -ThemeId $Global:ActiveZenThemeId

  $t = $Global:ZenThemes[$Global:ActiveZenThemeId]
  $esc = [char]27
  Write-Host "  $esc[1;48;2;$($t.SurfaceRgb)m$esc[1;38;2;$($t.AccentRgb)m GPU CRT PIXEL SHADER $esc[0m Shader set to $esc[1;38;2;$($t.SecondaryRgb)m$($val.ToUpper())$esc[0m in Windows Terminal."
}

function Show-ZenThemes {
  $esc   = [char]27
  $tl    = [char]0x256D
  $tr    = [char]0x256E
  $bl    = [char]0x2570
  $br    = [char]0x256F
  $hz    = [char]0x2500
  $vt    = [char]0x2502
  $ml    = [char]0x251C
  $mr    = [char]0x2524
  $block = "$([char]0x2588)$([char]0x2588)"
  $dot   = [char]0x25CF
  $ring  = [char]0x25CB
  $cur   = $Global:ZenThemes[$Global:ActiveZenThemeId]
  $mu    = "$esc[38;2;$($cur.MutedRgb)m"
  $acB   = "$esc[1;38;2;$($cur.AccentRgb)m"
  $rst   = "$esc[0m"
  $line  = $hz.ToString() * 82

  Write-Host ""
  Write-Host "  $mu$tl$line$tr$rst"
  Write-Host "  $mu$vt$rst  $acB@zen-ui/system // 8-THEME POLARITY MATRIX (POWERSHELL, WINDOWS TERMINAL & CMD)$rst  $mu$vt$rst"
  Write-Host "  $mu$ml$line$mr$rst"
  $idx = 1
  foreach ($key in $Global:ZenThemes.Keys) {
    $t = $Global:ZenThemes[$key]
    $isAct = ($key -eq $Global:ActiveZenThemeId)
    $stateBadge = if ($isAct) {
      "$esc[1;48;2;$($t.AccentRgb)m$esc[38;2;$($t.CanvasRgb)m $dot ACTIVE $rst"
    } else {
      "   $mu$ring [$idx]$rst  "
    }
    $polBadge = if ($t.Polarity -eq "DARK") {
      "$esc[48;2;28;24;14m$esc[38;2;245;184;65m DARK  $rst"
    } else {
      "$esc[48;2;14;36;48m$esc[38;2;56;189;248m LIGHT $rst"
    }
    $sw1 = "$esc[38;2;$($t.CanvasRgb)m$esc[48;2;$($t.MutedRgb)m$block$rst"
    $sw2 = "$esc[38;2;$($t.AccentRgb)m$block$rst"
    $sw3 = "$esc[38;2;$($t.SecondaryRgb)m$block$rst"
    $idPad = $t.Id.PadRight(19)
    $nmPad = $t.Name.PadRight(27)
    Write-Host "  $mu$vt$rst  $stateBadge  $sw1 $sw2 $sw3  $esc[1;38;2;$($t.AccentRgb)m$idPad$rst $esc[38;2;$($cur.InkRgb)m$nmPad$rst $polBadge $mu$($t.AccentHex)$rst  $mu$vt$rst"
    $idx++
  }
  Write-Host "  $mu$ml$line$mr$rst"
  Write-Host "  $mu$vt$rst  Usage: $acB`zen-theme <id>$rst  or launch interactive workbench: $acB`zen-ui$rst                  $mu$vt$rst"
  Write-Host "  $mu$bl$line$br$rst"
  Write-Host ""
}

function Invoke-CapriGuard {
  param(
    [Parameter(Mandatory = $false, Position = 0, ValueFromRemainingArguments = $true)]
    [string[]]$PayloadParts
  )
  $Payload = ($PayloadParts -join " ").Trim()
  $cur = $Global:ZenThemes[$Global:ActiveZenThemeId]
  $esc = [char]27
  if (-not $Payload) {
    Write-Host "  Usage: capri-guard `"<text>`" | capri-guard on | capri-guard off" -ForegroundColor Yellow
    return
  }
  if ($Payload -eq "on" -or $Payload -eq "off") {
    $Global:CapriGuardAuto = ($Payload -eq "on")
    Set-Content -Path $ZenGuardStateFile -Value $Payload -Encoding UTF8
    Write-ZenCmdAutorunScript -ThemeId $Global:ActiveZenThemeId
    Write-Host "  $esc[1;48;2;$($cur.SurfaceRgb)m$esc[1;38;2;$($cur.AccentRgb)m CAPRI GUARD $esc[0m Real-time Enter firewall set to $esc[1;38;2;$($cur.SecondaryRgb)m$($Payload.ToUpper())$esc[0m."
    return
  }

  $threats = Test-CapriPayload -Payload $Payload
  $check = [char]0x2714
  if ($threats.Count -eq 0) {
    Write-Host ""
    Write-Host "  $esc[1;48;2;6;48;28m$esc[1;38;2;0;255;102m $check PASS // CAPRI GUARD $esc[0m Payload verified clean (0 SQLi, XSS, or Prompt Injection vectors)."
    Write-Host ""
  } else {
    Show-CapriInterceptAlert -Payload $Payload -Threats $threats
    Write-Host ""
  }
}

function Show-ZenDirectory {
  param([string]$Path = ".")
  $cur   = $Global:ZenThemes[$Global:ActiveZenThemeId]
  $esc   = [char]27
  $tl    = [char]0x256D
  $tr    = [char]0x256E
  $bl    = [char]0x2570
  $br    = [char]0x256F
  $hz    = [char]0x2500
  $vt    = [char]0x2502
  $ml    = [char]0x251C
  $mr    = [char]0x2524
  $mu    = "$esc[38;2;$($cur.MutedRgb)m"
  $acB   = "$esc[1;38;2;$($cur.AccentRgb)m"
  $sc    = "$esc[38;2;$($cur.SecondaryRgb)m"
  $in    = "$esc[38;2;$($cur.InkRgb)m"
  $rst   = "$esc[0m"
  $line  = $hz.ToString() * 82

  $items = Get-ChildItem -Path $Path -Force | Sort-Object @{Expression = { -not $_.PSIsContainer }}, Name
  $resolved = (Resolve-Path $Path).Path
  Write-Host ""
  Write-Host "  $mu$tl$line$tr$rst"
  Write-Host "  $mu$vt$rst  $acB`ZEN-DATATABLE //$rst $in$($resolved.PadRight(52))$rst $mu($($items.Count) items)$rst  $mu$vt$rst"
  Write-Host "  $mu$ml$line$mr$rst"
  Write-Host "  $mu$vt  TYPE      SIZE         MODIFIED            NAME                                 $vt$rst"
  Write-Host "  $mu$ml$line$mr$rst"

  foreach ($item in $items) {
    $typePill = if ($item.PSIsContainer) {
      "$esc[48;2;$($cur.AccentBgRgb)m$acB [DIR]  $rst"
    } elseif ($item.Extension -match "\.(ps1|cmd|sh|bat)$") {
      "$esc[48;2;6;48;28m$sc [EXEC] $rst"
    } elseif ($item.Extension -match "\.(ts|tsx|js|json|css|html)$") {
      "$esc[48;2;$($cur.SurfaceRgb)m$acB [CODE] $rst"
    } else {
      "$mu [FILE] $rst"
    }

    $sizeStr = if ($item.PSIsContainer) {
      "-".PadLeft(10)
    } elseif ($item.Length -ge 1MB) {
      ("{0:N1} MB" -f ($item.Length / 1MB)).PadLeft(10)
    } elseif ($item.Length -ge 1KB) {
      ("{0:N1} KB" -f ($item.Length / 1KB)).PadLeft(10)
    } else {
      ("$($item.Length) B").PadLeft(10)
    }

    $dateStr = $item.LastWriteTime.ToString("yyyy-MM-dd HH:mm")
    $nameRaw = if ($item.Name.Length -gt 35) { $item.Name.Substring(0, 32) + "..." } else { $item.Name }
    $nameCol = if ($item.PSIsContainer) { "$acB$($nameRaw.PadRight(36))$rst" } else { "$in$($nameRaw.PadRight(36))$rst" }

    Write-Host "  $mu$vt$rst  $typePill  $sc$sizeStr$rst   $mu$dateStr$rst   $nameCol $mu$vt$rst"
  }
  Write-Host "  $mu$bl$line$br$rst"
  Write-Host ""
}

function Show-ZenStatus {
  Show-ZenBanner
  Show-ZenThemes
}

function Show-ZenHelp {
  $cur  = $Global:ZenThemes[$Global:ActiveZenThemeId]
  $esc  = [char]27
  $tl   = [char]0x256D
  $tr   = [char]0x256E
  $bl   = [char]0x2570
  $br   = [char]0x256F
  $hz   = [char]0x2500
  $vt   = [char]0x2502
  $ml   = [char]0x251C
  $mr   = [char]0x2524
  $mu   = "$esc[38;2;$($cur.MutedRgb)m"
  $acB  = "$esc[1;38;2;$($cur.AccentRgb)m"
  $sc   = "$esc[38;2;$($cur.SecondaryRgb)m"
  $in   = "$esc[38;2;$($cur.InkRgb)m"
  $rst  = "$esc[0m"
  $line = $hz.ToString() * 82

  Write-Host ""
  Write-Host "  $mu$tl$line$tr$rst"
  Write-Host "  $mu$vt$rst  $acB`zeN-TERMINAL // COMMAND REFERENCE (@zen-ui/system)$rst                              $mu$vt$rst"
  Write-Host "  $mu$ml$line$mr$rst"
  Write-Host "  $mu$vt$rst  $sc`zen-ui / zen                $rst $in`Launch interactive full-screen TUI workbench$rst       $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`zen-themes                  $rst $in`Display all 8 Dark & Light polarity schemes$rst        $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`zen-theme <id>              $rst $in`Switch theme across PS, CMD & Windows Terminal$rst     $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`zen-prompt <1|2|3|style>    $rst $in`Switch prompt (telemetry-2line, netrunner-hud...)$rst  $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`zen-wallpaper <on|off>      $rst $in`Toggle @zen-ui/system Blackwall Lattice wallpaper$rst  $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`zen-shader <on|off>         $rst $in`Toggle GPU HLSL CRT scanline pixel shader$rst          $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`capri-guard <payload|on|off>$rst $in`Scan input for SQLi/XSS/Prompt Injection$rst           $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`ll / zen-ls                 $rst $in`Render @zen-ui/system DataTable directory view$rst     $mu$vt$rst"
  Write-Host "  $mu$vt$rst  $sc`zen-banner / zen-status     $rst $in`Render the 2-column Capri Telemetry HUD card$rst       $mu$vt$rst"
  Write-Host "  $mu$bl$line$br$rst"
  Write-Host ""
}

function Show-ZenBanner {
  $lines = Format-ZenHudBannerLines -ThemeId $Global:ActiveZenThemeId -ShellName "POWERSHELL"
  foreach ($l in $lines) {
    Write-Host $l
  }
}

function Start-ZenWorkbench {
  if (-not [Environment]::UserInteractive -or [Console]::IsInputRedirected) {
    Show-ZenStatus
    return
  }

  $keys = @($Global:ZenThemes.Keys)
  $selectedIndex = [array]::IndexOf($keys, $Global:ActiveZenThemeId)
  if ($selectedIndex -lt 0) { $selectedIndex = 0 }
  $lastScanMessage = "Press [G] to test a payload against Capri Guard (SQLi, XSS, Prompt Injection)."

  try { [Console]::CursorVisible = $false } catch {}
  try {
    $running = $true
    while ($running) {
      [Console]::Clear()
      $cur   = $Global:ZenThemes[$Global:ActiveZenThemeId]
      $esc   = [char]27
      $tl    = [char]0x256D
      $tr    = [char]0x256E
      $bl    = [char]0x2570
      $br    = [char]0x256F
      $hz    = [char]0x2500
      $vt    = [char]0x2502
      $ml    = [char]0x251C
      $mr    = [char]0x2524
      $bolt  = [char]0x25C6
      $dot   = [char]0x25CF
      $mid   = [char]0x00B7
      $arrow = [char]0x276F
      $check = [char]0x2714
      $block = "$([char]0x2588)$([char]0x2588)"
      $mu    = "$esc[38;2;$($cur.MutedRgb)m"
      $acB   = "$esc[1;38;2;$($cur.AccentRgb)m"
      $sc    = "$esc[38;2;$($cur.SecondaryRgb)m"
      $in    = "$esc[38;2;$($cur.InkRgb)m"
      $rst   = "$esc[0m"
      $W     = 88
      $line  = $hz.ToString() * $W

      $pillAccent = "$esc[1;48;2;$($cur.AccentRgb)m$esc[38;2;$($cur.CanvasRgb)m"
      $pillSurf   = "$esc[48;2;$($cur.SurfaceRgb)m$esc[1;38;2;$($cur.AccentRgb)m"

      Write-Host ""
      Write-Host "  $mu$tl$line$tr$rst"
      Write-Host (Format-ZenBoxRow -Content "  $pillAccent $bolt zeN-TERMINAL // INTERACTIVE WORKBENCH TUI (@zen-ui/system) $rst  $pillSurf $($cur.Polarity) $mid $($cur.AccentHex) $rst" -InnerWidth $W -BorderColor $mu)
      Write-Host "  $mu$ml$line$mr$rst"
      Write-Host (Format-ZenBoxRow -Content "  ${acB}01 // 8-THEME POLARITY MATRIX$rst $mu(Use [Up/Down] or [1-8] to live-switch, [D] Polarity)$rst" -InnerWidth $W -BorderColor $mu)
      Write-Host (Format-ZenBoxRow -Content "" -InnerWidth $W -BorderColor $mu)

      for ($i = 0; $i -lt $keys.Count; $i++) {
        $k = $keys[$i]
        $item = $Global:ZenThemes[$k]
        $isSel = ($i -eq $selectedIndex)
        $isAct = ($k -eq $Global:ActiveZenThemeId)
        $cursorStr = if ($isSel) { "$esc[1;38;2;$($item.AccentRgb)m$arrow$rst" } else { " " }
        $actBadge  = if ($isAct) { "$esc[1;48;2;$($item.AccentRgb)m$esc[38;2;$($item.CanvasRgb)m $dot ACTIVE $rst" } else { "          " }
        $sw = "$esc[38;2;$($item.AccentRgb)m$block$esc[38;2;$($item.SecondaryRgb)m$block$rst"
        $num = $i + 1
        $rowStyle = if ($isSel) { "$esc[1;38;2;$($item.AccentRgb)m" } else { $in }
        $rowStr = "   $cursorStr [$num] $sw  $rowStyle{0,-20} {1,-28}$rst [{2,-5}] {3}" -f $item.Id, $item.Name, $item.Polarity, $actBadge
        Write-Host (Format-ZenBoxRow -Content $rowStr -InnerWidth $W -BorderColor $mu)
      }

      $wallBadge   = if ($Global:ZenWallpaperEnabled) { "${sc}ON$rst" } else { "${mu}OFF$rst" }
      $shaderBadge = if ($Global:ZenShaderEnabled) { "${sc}ON$rst" } else { "${mu}OFF$rst" }
      $guardBadge  = if ($Global:CapriGuardAuto) { "${sc}ARMED$rst" } else { "${mu}BYPASSED$rst" }

      Write-Host "  $mu$ml$line$mr$rst"
      Write-Host (Format-ZenBoxRow -Content "  ${acB}02 // PROMPT TOPOLOGY & VISUAL FX$rst" -InnerWidth $W -BorderColor $mu)
      Write-Host (Format-ZenBoxRow -Content "   Prompt Style : $pillSurf $($Global:ActiveZenPromptStyle) $rst   Lattice BG : $wallBadge   CRT Shader : $shaderBadge   Guard : $guardBadge" -InnerWidth $W -BorderColor $mu)
      Write-Host "  $mu$ml$line$mr$rst"
      Write-Host (Format-ZenBoxRow -Content "  ${acB}03 // CAPRI GUARD FIREWALL STATUS$rst" -InnerWidth $W -BorderColor $mu)
      Write-Host (Format-ZenBoxRow -Content "   $in$lastScanMessage$rst" -InnerWidth $W -BorderColor $mu)
      Write-Host "  $mu$ml$line$mr$rst"
      Write-Host (Format-ZenBoxRow -Content "  $pillSurf [Up/Down/1-8] $rst Theme  $pillSurf [P] $rst Prompt  $pillSurf [D] $rst Polarity  $pillSurf [W] $rst Lattice  $pillSurf [S] $rst Shader  $pillSurf [G] $rst Guard  $pillSurf [Q] $rst Quit" -InnerWidth $W -BorderColor $mu)
      Write-Host "  $mu$bl$line$br$rst"

      $keyInfo = [Console]::ReadKey($true)
      switch ($keyInfo.Key) {
        "UpArrow" {
          $selectedIndex = if ($selectedIndex -le 0) { $keys.Count - 1 } else { $selectedIndex - 1 }
          Set-ZenTheme -ThemeId $keys[$selectedIndex] | Out-Null
        }
        "DownArrow" {
          $selectedIndex = if ($selectedIndex -ge ($keys.Count - 1)) { 0 } else { $selectedIndex + 1 }
          Set-ZenTheme -ThemeId $keys[$selectedIndex] | Out-Null
        }
        "Enter" {
          Set-ZenTheme -ThemeId $keys[$selectedIndex] | Out-Null
        }
        "P" {
          $curIdx = [array]::IndexOf($ValidPromptStyles, $Global:ActiveZenPromptStyle)
          $nextIdx = ($curIdx + 1) % $ValidPromptStyles.Count
          Set-ZenPrompt -Style $ValidPromptStyles[$nextIdx] | Out-Null
        }
        "D" {
          $curPol = $Global:ZenThemes[$Global:ActiveZenThemeId].Polarity
          $targetPol = if ($curPol -eq "DARK") { "LIGHT" } else { "DARK" }
          for ($j = 0; $j -lt $keys.Count; $j++) {
            if ($Global:ZenThemes[$keys[$j]].Polarity -eq $targetPol) {
              $selectedIndex = $j
              Set-ZenTheme -ThemeId $keys[$j] | Out-Null
              break
            }
          }
        }
        "W" {
          Set-ZenWallpaper -Mode toggle | Out-Null
        }
        "S" {
          Set-ZenShader -Mode toggle | Out-Null
        }
        "F" {
          $nextGuard = if ($Global:CapriGuardAuto) { "off" } else { "on" }
          Invoke-CapriGuard $nextGuard | Out-Null
        }
        "G" {
          [Console]::CursorVisible = $true
          Write-Host ""
          Write-Host -NoNewline "  Enter test payload for Capri Guard: "
          $testInput = [Console]::ReadLine()
          [Console]::CursorVisible = $false
          if ($testInput) {
            $threats = Test-CapriPayload -Payload $testInput
            if ($threats.Count -eq 0) {
              $lastScanMessage = "$esc[38;2;0;255;102m[PASS] '$testInput' -> 0 threats detected.$rst"
            } else {
              $lastScanMessage = "$esc[38;2;255;51;102m[BLOCKED] '$testInput' -> $($threats -join ', ')$rst"
            }
          }
        }
        "Q" { $running = $false }
        "Escape" { $running = $false }
        default {
          $ch = $keyInfo.KeyChar
          if ($ch -ge '1' -and $ch -le '8') {
            $idxNum = [int][string]$ch - 1
            $selectedIndex = $idxNum
            Set-ZenTheme -ThemeId $keys[$selectedIndex] | Out-Null
          }
        }
      }
    }
  } finally {
    try { [Console]::CursorVisible = $true } catch {}
    [Console]::Clear()
    Show-ZenBanner
  }
}

Set-Alias -Name zen-ui -Value Start-ZenWorkbench -Scope Global
Set-Alias -Name zen -Value Start-ZenWorkbench -Scope Global
Set-Alias -Name zen-theme -Value Set-ZenTheme -Scope Global
Set-Alias -Name zen-themes -Value Show-ZenThemes -Scope Global
Set-Alias -Name zen-prompt -Value Set-ZenPrompt -Scope Global
Set-Alias -Name zen-wallpaper -Value Set-ZenWallpaper -Scope Global
Set-Alias -Name zen-shader -Value Set-ZenShader -Scope Global
Set-Alias -Name zen-status -Value Show-ZenStatus -Scope Global
Set-Alias -Name zen-help -Value Show-ZenHelp -Scope Global
Set-Alias -Name zen-ls -Value Show-ZenDirectory -Scope Global
Set-Alias -Name ll -Value Show-ZenDirectory -Scope Global
Set-Alias -Name capri-guard -Value Invoke-CapriGuard -Scope Global
Set-Alias -Name zen-banner -Value Show-ZenBanner -Scope Global

Apply-ZenPSReadLineColors -ThemeId $Global:ActiveZenThemeId
Sync-ZenTerminalOscColors -ThemeId $Global:ActiveZenThemeId

function global:prompt {
  $lastOk  = $?
  $esc     = [char]27
  $bolt    = [char]0x25C6
  $gitIcon = [char]0x2387
  $arrow   = [char]0x276F

  $t = $Global:ZenThemes[$Global:ActiveZenThemeId]
  if (-not $t) { $t = $Global:ZenThemes["blackwall-crimson"] }

  $acB = "$esc[1;38;2;$($t.AccentRgb)m"
  $sc  = "$esc[38;2;$($t.SecondaryRgb)m"
  $inB = "$esc[1;38;2;$($t.InkRgb)m"
  $rst = "$esc[0m"
  $pillBrand = "$esc[1;48;2;$($t.SurfaceRgb)m$esc[1;38;2;$($t.AccentRgb)m"

  $cwd = (Get-Location).Path.Replace($HOME, "~")
  $gitSeg = ""
  if (Get-Command git -ErrorAction SilentlyContinue) {
    $branch = git rev-parse --abbrev-ref HEAD 2>$null
    if ($LASTEXITCODE -eq 0 -and $branch) {
      $gitSeg = "  $sc$gitIcon $branch$rst"
    }
  }

  $arrowCol = if ($lastOk) { $acB } else { "$esc[1;38;2;255;51;102m" }

  if ($Global:ActiveZenPromptStyle -eq "minimal-1line") {
    return "`n$acB$bolt$rst $inB$cwd$rst$gitSeg  $arrowCol$arrow$rst "
  }

  if ($Global:ActiveZenPromptStyle -eq "netrunner-hud") {
    return "`n$pillBrand $bolt zen $rst  $inB$cwd$rst$gitSeg`n $arrowCol$arrow$rst "
  }

  return "`n$pillBrand $bolt zen $rst  $inB$cwd$rst$gitSeg  $arrowCol$arrow$rst "
}

$cmdArgs = [Environment]::GetCommandLineArgs()
if (-not $Global:ZenBannerShown -and [Environment]::UserInteractive -and -not [Console]::IsInputRedirected -and ($cmdArgs -notcontains "-Command") -and ($cmdArgs -notcontains "-c") -and ($cmdArgs -notcontains "-File")) {
  $Global:ZenBannerShown = $true
  try { [Console]::Clear() } catch {}
  Show-ZenBanner
}
