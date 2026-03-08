$content = Get-Content 'styles.css' -Raw

# Find all occurrences of RESPONSIVE DESIGN
$first = $content.IndexOf('/* ===== RESPONSIVE DESIGN ===== */')
$part1 = $content.Substring(0, $first)
$part2 = $content.Substring($first)

# Write cleaned CSS
$part1 + $part2 | Set-Content 'styles.css'
Write-Host 'CSS cleaned'
