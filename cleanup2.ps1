$content = Get-Content 'styles.css' -Raw

# Split by RESPONSIVE DESIGN
$parts = $content -split '(/\* ===== RESPONSIVE DESIGN ===== \*/)'

# Keep the first part (up to first RESPONSIVE DESIGN) and the RESPONSIVE DESIGN marker and everything after
$cleaned = $parts[0] + $parts[1] + $parts[2]

$cleaned | Set-Content 'styles.css'
Write-Host "CSS cleaned - file size before cleanup: $($content.Length), after: $($cleaned.Length)"
