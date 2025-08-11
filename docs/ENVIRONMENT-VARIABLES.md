# Environment Variables Documentation

## Required Variables

### Sanity CMS (Required)
```bash
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
```
- **Purpose**: Connect to Sanity CMS for content management
- **Required for**: All deployments (hub and individual pub sites)
- **Where to find**: Sanity project dashboard

### Optional Variables

#### Sanity Token (Optional)
```bash
SANITY_TOKEN=your_sanity_token_here
```
- **Purpose**: Authenticated requests to Sanity (for draft content or write operations)
- **When needed**: Only if accessing draft content or performing write operations
- **How to generate**: Sanity dashboard > API > Tokens

#### Google Analytics (Optional)
```bash
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
- **Purpose**: Enable Google Analytics tracking
- **When needed**: For production sites requiring analytics
- **Format**: Must start with 'G-' followed by alphanumeric ID

#### Target Pub Slug (Build-time only)
```bash
TARGET_PUB_SLUG=the-bull-otford
```
- **Purpose**: Build a specific pub site instead of the hub
- **When to use**: For individual pub deployments
- **Valid values**:
  - `the-bull-otford`
  - `the-chaser-inn`
  - `the-crown`
  - `the-halfway-house`
  - `the-rising-sun`

## Setting Environment Variables

### Local Development (.env file)
Create a `.env` file in the project root:
```bash
# Required
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production

# Optional
SANITY_TOKEN=your_token_here
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Netlify Deployment
1. Go to Site settings > Environment variables
2. Add each variable with its value
3. Variables are automatically available during build

### Building Individual Pub Sites
```bash
# Local build
TARGET_PUB_SLUG=the-bull-otford npm run build

# Netlify build command
TARGET_PUB_SLUG=the-bull-otford npm run build
```

## Environment-Specific Configurations

### Development
- **Sanity Dataset**: Can use `development` dataset for testing
- **GA_MEASUREMENT_ID**: Usually omitted to avoid tracking dev activity
- **Debug mode**: Enabled by default in development

### Staging
- **Sanity Dataset**: Use `production` or dedicated `staging` dataset
- **GA_MEASUREMENT_ID**: Use separate staging measurement ID
- **Robots.txt**: Consider blocking search engines

### Production
- **Sanity Dataset**: Always use `production`
- **GA_MEASUREMENT_ID**: Use production measurement ID
- **All caching**: Enabled for performance

## Security Considerations

### Never Commit These
- `.env` files (already in .gitignore)
- `SANITY_TOKEN` values
- API keys or secrets

### Public Variables
These are safe to expose:
- `SANITY_PROJECT_ID` (public)
- `SANITY_DATASET` (public)
- `GA_MEASUREMENT_ID` (public)

### Private Variables
Keep these secure:
- `SANITY_TOKEN` (if used)
- Any future API keys

## Troubleshooting

### Content Not Loading
1. Check `SANITY_PROJECT_ID` is correct
2. Verify `SANITY_DATASET` exists
3. Ensure CORS is configured in Sanity

### Analytics Not Working
1. Verify `GA_MEASUREMENT_ID` format
2. Check Google Analytics property is active
3. Ensure tracking code is not blocked by ad blockers

### Build Failures
1. All required variables must be set
2. Check variable names are exactly as specified
3. No trailing spaces in values

## Variable Usage in Code

### Accessing in Astro
```javascript
// In .astro files or .js/.ts files
const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;
const token = import.meta.env.SANITY_TOKEN;
const gaId = import.meta.env.GA_MEASUREMENT_ID;
```

### Build-time Variables
```javascript
// TARGET_PUB_SLUG is only available during build
const targetPub = process.env.TARGET_PUB_SLUG;
```

## Default Values

The application provides sensible defaults:
- **Dataset**: Falls back to 'production' if not specified
- **GA**: Analytics component only loads if ID is provided
- **Token**: Sanity client works without token (public read access)

## Multi-Site Deployment Strategy

### Hub Site (Main)
```bash
# No TARGET_PUB_SLUG needed
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
GA_MEASUREMENT_ID=G-HUBSITE123
```

### Individual Pub Sites
```bash
# Each pub gets its own deployment
TARGET_PUB_SLUG=the-bull-otford
SANITY_PROJECT_ID=it7wwto3
SANITY_DATASET=production
GA_MEASUREMENT_ID=G-BULL123  # Optional: separate tracking
```

## Future Considerations

### Potential Future Variables
- `SMTP_*` - For email sending
- `STRIPE_*` - For payment processing
- `MAP_API_KEY` - For advanced map features
- `CDN_URL` - For asset delivery
- `SENTRY_DSN` - For error tracking

### Migration Path
When adding new variables:
1. Add with defaults for backward compatibility
2. Document in this file
3. Update deployment guides
4. Notify all team members