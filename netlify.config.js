// Netlify deployment configuration
module.exports = {
  // Netlify site name (optional)
  // This will be used to create the site URL: https://site-name.netlify.app
  site_name: "wh-pubs",
  
  // Build settings
  build: {
    // Directory to publish (relative to root)
    publish: "dist",
    
    // Build command
    command: "npm run build",
    
    // Environment variables
    environment: {
      NODE_ENV: "production",
      // Add any other environment variables needed for your build
      // SANITY_PROJECT_ID: "your-sanity-project-id",
      // SANITY_DATASET: "production",
      // SANITY_TOKEN: "your-sanity-token"
    }
  },
  
  // Deploy settings
  deploy: {
    // Production branch
    production_branch: "main",
    
    // Deploy preview settings
    preview: {
      // Deploy preview enabled
      enabled: true
    }
  },
  
  // Headers
  headers: [
    {
      for: "/*",
      values: {
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      }
    },
    {
      for: "/*.js",
      values: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      for: "/*.css",
      values: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      for: "/images/*",
      values: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  ],
  
  // Redirects
  redirects: [
    {
      from: "/*",
      to: "/404",
      status: 404
    }
  ]
};
