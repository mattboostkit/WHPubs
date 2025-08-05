# WH Pubs Design System

## Typography

### Section Headers
All sections follow a consistent pattern:
- **Eyebrow Text**: `text-secondary uppercase tracking-widest text-sm font-semibold mb-4`
- **Main Heading**: `text-4xl font-bold text-primary mb-6`
- **Subheading** (if needed): `text-lg text-gray-700`

Example:
```html
<p class="text-secondary uppercase tracking-widest text-sm font-semibold mb-4">Section Category</p>
<h2 class="text-4xl font-bold text-primary mb-6">Section Title</h2>
<p class="text-lg text-gray-700">Optional description text</p>
```

### Typography Rules
- No ALL CAPS in headers (use sentence case or title case)
- Consistent font sizes: 4xl for main headers, lg for body text
- Primary color (#1A1A1A) for headers
- Secondary color (#B79C64) for accents and eyebrow text

## Spacing

### Section Spacing
- All sections use `py-20` (80px vertical padding)
- Container uses `container mx-auto px-4`
- Max width for content: `max-w-6xl mx-auto` or `max-w-4xl mx-auto` for narrower sections

### Component Spacing
- Cards: `gap-6` or `gap-8` between cards
- Content blocks: `mb-12` after headers
- Buttons: `mb-6` or `mb-8` spacing

## Colors & Backgrounds

### Section Backgrounds
1. **White**: `bg-white` - Default for most sections
2. **Gray Gradient**: `bg-gradient-to-b from-white to-gray-50` - For alternating sections
3. **Reverse Gray**: `bg-gradient-to-b from-gray-50 to-white` - For variety
4. **Feature Sections**: Can use primary color with secondary text

### Color Usage
- **Primary** (#1A1A1A): Headers, buttons, main text
- **Secondary** (#B79C64): Accents, badges, highlights
- **Muted**: Gray tones for supporting text

## Buttons

### Button Sizes
- **Large**: `size="lg"` with `px-8 py-6 text-lg` for CTAs
- **Medium**: Default size for standard actions
- **Small**: `size="sm"` for card actions

### Button Variants
- **Primary**: `variant="default"` with `bg-primary text-white hover:bg-primary/90`
- **Secondary**: `variant="secondary"` with `bg-secondary text-primary hover:bg-secondary/90`
- **Outline**: `variant="outline"` for secondary actions

## Cards

### Card Styling
- No borders: `border-0 shadow-none`
- Hover effects: `hover:shadow-lg transition-shadow`
- Featured cards: `ring-2 ring-secondary`

## Badges

### Badge Styling
- Secondary badges: `bg-secondary/20 text-primary border border-secondary/40`
- Small size: `text-xs`
- With icons: `flex items-center gap-1`

## Responsive Design

### Breakpoints
- Mobile: Default
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

### Grid Layouts
- 3 columns on desktop: `md:grid-cols-3`
- 2 columns on tablet: `md:grid-cols-2`
- Stack on mobile: Default

## Component Patterns

### Section Header Pattern
```astro
<div class="text-center mb-12">
  <p class="text-secondary uppercase tracking-widest text-sm font-semibold mb-4">{eyebrowText}</p>
  <h2 class="text-4xl font-bold text-primary mb-6">{title}</h2>
  <p class="text-lg text-gray-700">{description}</p>
</div>
```

### CTA Button Pattern
```astro
<Button size="lg" variant="default" className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg">
  {buttonText}
</Button>
```

### Card Pattern
```astro
<Card className="border-0 shadow-none hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-lg">{title}</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```