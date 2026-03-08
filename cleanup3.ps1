$content = Get-Content 'styles.css' -Raw

# Find position of first VIDEO SECTION
$firstVideo = $content.IndexOf('/* ===== VIDEO SECTION ===== */')

# Find position of IMAGE GRID after first VIDEO SECTION
$afterFirstVideo = $firstVideo + 100
$firstImageGrid = $content.IndexOf('/* ===== IMAGE GRID ===== */', $afterFirstVideo)

# Find position of IMAGE GRID for second occurrence
$secondImageGrid = $content.IndexOf('/* ===== IMAGE GRID ===== */', $firstImageGrid + 100)

# If second IMAGE GRID exists, there's duplication - remove everything between first and second VIDEO sections' IMAGE GRID
if ($secondImageGrid -gt 0) {
    # Get the section from start to just before the duplication begins (first CAROUSEL up to first IMAGE GRID)
    $part1 = $content.Substring(0, $firstImageGrid + 50)
    
    # Find where to continue (at second IMAGE GRID or after)
    # Actually just remove from after first CAROUSEL until BLOG GRID
    $blogGridPos = $content.IndexOf('/* ===== BLOG GRID ===== */')
    $blogGridPos2 = $content.IndexOf('/* ===== BLOG GRID ===== */', $blogGridPos + 100)
    
    if ($blogGridPos2 -gt 0) {
        # Remove the duplicate BLOG GRID section
        $part1 = $content.Substring(0, $blogGridPos + 50)
        $part2 = $content.Substring($blogGridPos2)
        $cleaned = $part1.TrimEnd() + "`n`n" + $part2.TrimStart()
    }
} else {
    $cleaned = $content
}

$cleaned | Set-Content 'styles.css'
Write-Host "CSS cleaned"
