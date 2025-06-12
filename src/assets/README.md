# Assets Guide

## Required Files for Your Ferrari-Inspired Website

### Videos (src/assets/videos/)
- **hero-background.mp4**: Main hero background video (1920x1080 recommended)
- **hero-background.webm**: WebM format for better browser compatibility

### Images (src/assets/images/)
- **hero-background.gif**: Animated GIF fallback for hero section
- **about-background.jpg**: Background image for About section (1200x800 recommended)

### Fonts (src/assets/fonts/)
- Add custom fonts here if desired (Ferrari uses clean, modern fonts)

## Recommendations:

### Hero Video/GIF:
- Should be elegant and professional
- Consider abstract motion graphics, geometric patterns, or subtle animations
- Ferrari red (#dc143c) color scheme
- Duration: 5-10 seconds if looping
- Size: Keep under 5MB for good performance

### About Image:
- Professional workspace, team photo, or abstract business imagery
- Should work well with red overlay and white text
- High resolution but optimized for web

### Fallback Strategy:
1. Website tries to load MP4 video first
2. Falls back to WebM if MP4 fails
3. Falls back to GIF if both video formats fail
4. Falls back to gradient background if no media files

## File Placement:
Just drag and drop your files into the respective folders:
- Videos: src/assets/videos/
- Images: src/assets/images/
- Fonts: src/assets/fonts/
