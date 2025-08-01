# WH Pubs Specialized Subagents

This directory contains specialized AI subagents designed to accelerate development and maintain quality standards for the WH Pubs project.

## Available Subagents

### 1. 🗄️ sanity-content-manager
**Purpose**: Handles all Sanity CMS operations including content creation, schema updates, and GROQ queries.

**When to use**:
- Creating or updating pub, event, blog, or menu content
- Modifying Sanity schemas
- Writing GROQ queries
- Managing content relationships
- Setting up new content types

**Example usage**:
```
> Use sanity-content-manager to create a new pub with custom branding
> Have sanity-content-manager update the event schema to include ticket prices
```

### 2. 🚀 astro-component-builder
**Purpose**: Creates and maintains Astro pages and React components following project conventions.

**When to use**:
- Building new pages or components
- Updating existing UI elements
- Implementing responsive designs
- Adding TypeScript interfaces
- Integrating Sanity data into components

**Example usage**:
```
> Use astro-component-builder to create a new testimonials component
> Have astro-component-builder update the events page with the new filter
```

### 3. 🏠 pub-site-builder
**Purpose**: Manages multi-site architecture for individual pub deployments.

**When to use**:
- Setting up pub-specific builds
- Configuring TARGET_PUB_SLUG deployments
- Implementing pub customizations
- Testing multi-site content filtering
- Managing pub-specific layouts

**Example usage**:
```
> Use pub-site-builder to set up The Bull pub as a standalone site
> Have pub-site-builder fix the content filtering for pub-specific events
```

### 4. 🎨 ui-style-enforcer
**Purpose**: Ensures UI consistency, accessibility, and design system compliance.

**When to use**:
- After creating new components
- Reviewing styling consistency
- Checking accessibility compliance
- Fixing responsive issues
- Standardizing component patterns

**Example usage**:
```
> Use ui-style-enforcer to review the new booking form for accessibility
> Have ui-style-enforcer check all buttons follow our design system
```

### 5. 🚢 deployment-assistant
**Purpose**: Manages builds, deployments, and environment configurations.

**When to use**:
- Setting up new deployments
- Debugging build failures
- Configuring environment variables
- Optimizing build performance
- Managing Netlify settings

**Example usage**:
```
> Use deployment-assistant to debug the build error on Netlify
> Have deployment-assistant set up a new pub site deployment
```

## Benefits

### 🎯 Specialized Expertise
Each subagent has deep knowledge of its domain, leading to:
- More accurate code generation
- Better adherence to project patterns
- Faster problem resolution
- Fewer errors and rework

### 🧩 Better Context Management
Subagents operate in their own context, which:
- Prevents main conversation pollution
- Allows focused problem-solving
- Maintains cleaner conversation history
- Enables parallel task execution

### ⚡ Increased Development Speed
By using the right subagent for each task:
- Get targeted solutions faster
- Reduce back-and-forth clarifications
- Leverage pre-configured tool access
- Follow established patterns automatically

## Best Practices

1. **Use the right subagent for the job** - Each has specific expertise
2. **Be specific in your requests** - Clear instructions yield better results
3. **Chain subagents for complex tasks** - They can work together
4. **Let subagents be proactive** - They'll suggest improvements

## Example Workflow

```
# Creating a new pub with custom features
1. > Use sanity-content-manager to create The Red Lion pub in Sanity
2. > Use astro-component-builder to create a custom hero component
3. > Use pub-site-builder to set up the individual deployment
4. > Use ui-style-enforcer to ensure everything matches our design
5. > Use deployment-assistant to deploy to Netlify
```

## Maintenance

These subagents are version-controlled and can be updated as the project evolves. To modify a subagent:

1. Edit the corresponding `.md` file in this directory
2. Update the tools list if needed
3. Refine the system prompt for better performance
4. Test the changes thoroughly

Remember: Well-configured subagents dramatically improve development efficiency and code quality!