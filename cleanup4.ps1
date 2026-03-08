$content = [System.IO.File]::ReadAllText('styles.css')

# Find both occurrences of CAROUSEL (GALLERY PAGE)
$firstCarouselIndex = $content.IndexOf('/* ===== CAROUSEL (GALLERY PAGE) ===== */')
$secondCarouselIndex = $content.IndexOf('/* ===== CAROUSEL (GALLERY PAGE) ===== */', $firstCarouselIndex + 1)

# If we found a second occurrence, remove it
if ($secondCarouselIndex -gt 0) {
    # Keep everything up to just before the second CAROUSEL section
    $beforeSecond = $content.Substring(0, $secondCarouselIndex)
    
    # Find where RESPONSIVE DESIGN is
    $responsiveIndex = $content.IndexOf('/* ===== RESPONSIVE DESIGN ===== */', $secondCarouselIndex)
    
    # If RESPONSIVE DESIGN exists, get everything from there to the end
    if ($responsiveIndex -gt 0) {
        $afterSecond = $content.Substring($responsiveIndex)
        $cleaned = $beforeSecond.TrimEnd() + "`n`n" + $afterSecond
    } else {
        $cleaned = $beforeSecond
    }
} else {
    $cleaned = $content
}

[System.IO.File]::WriteAllText('styles.css', $cleaned)
Write-Host "Removed duplicate sections"
