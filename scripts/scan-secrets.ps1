# Heuristic secret scan. Never prints matched values.
[CmdletBinding()]
param(
  [Parameter(Mandatory=$true, Position=0)]
  [Alias('Path')]
  [string[]]$TargetPath,
  [long]$MaxFileBytes = 25000000
)
$ErrorActionPreference = 'Stop'
$patterns = [ordered]@{
  'Google API-key-like' = 'AIza[0-9A-Za-z_-]{30,}'
  'Private-key PEM block' = '-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'
  'Credential assignment' = '(?i)(?:api[_-]?key|client_secret|private_key|password)[ \t]*[:=][ \t]*["'']?[^\s"'']{8,}'
  'Possible token' = '(?i)(?:access_token|refresh_token|id_token)\s*[:=]\s*["''][^"'']{12,}["'']'
}
$files = @(
  foreach ($target in $TargetPath) {
    if (Test-Path -LiteralPath $target -PathType Leaf) {
      Get-Item -LiteralPath $target
    } elseif (Test-Path -LiteralPath $target -PathType Container) {
      Get-ChildItem -LiteralPath $target -File -Recurse -Force -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch '[\\/](\.git|node_modules|vendor)[\\/]' }
    } else {
      Write-Output ("NOT FOUND: {0}" -f $target)
    }
  }
)
$scanned = 0
$findings = 0
foreach ($file in ($files | Sort-Object FullName -Unique)) {
  if ($file.Length -gt $MaxFileBytes) { Write-Output ("SKIP oversized file: {0} ({1} bytes)" -f $file.FullName,$file.Length); continue }
  try { $content = [System.IO.File]::ReadAllText($file.FullName) } catch { continue }
  $scanned++
  foreach ($name in $patterns.Keys) {
    $count = [regex]::Matches($content, $patterns[$name]).Count
    if ($count -gt 0) {
      $findings += $count
      Write-Output ("REVIEW: {0} | pattern={1} | count={2} | values=REDACTED" -f $file.FullName,$name,$count)
    }
  }
}
Write-Output ("Summary: files_scanned={0}; pattern_matches={1}. Findings are heuristic and require review." -f $scanned,$findings)
if ($findings -gt 0) { exit 2 }
