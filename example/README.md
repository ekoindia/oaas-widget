# Widget Test Page

This directory contains a simple HTML test page for testing the OaaS Widget during development.

## Quick Start

### Option 1: Automatic (Recommended)

Run both the build watcher and development server in parallel:

```bash
npm run dev:full
```

This will:

1. Start Rollup in watch mode (automatically rebuilds on file changes)
2. Start an HTTP server at `http://localhost:8080/example/index.html`
3. Open the test page in your default browser

### Option 2: Manual

Run the commands separately in different terminals:

**Terminal 1 - Build in watch mode:**

```bash
npm run dev
```

**Terminal 2 - Serve the test page:**

```bash
npm run serve
```

Then open `http://localhost:8080/example/index.html` in your browser.

## Files

-   **index.html** - Main test page with widget integration
-   **demo-config.js** - Mock configuration and steps data for testing

## Customizing Tests

### Modify Widget Configuration

Edit `demo-config.js` to:

-   Change step configurations
-   Add/remove steps
-   Modify form fields
-   Test different scenarios
-   Change user data

### Change Styling

Edit the `<style>` section in `index.html` to customize the test page appearance.

### Test Different States

The test page includes controls to:

-   🔄 **Reload Widget** - Reinitialize the widget
-   🗑️ **Clear Console** - Clear the console output
-   🎨 **Change Theme** - Cycle through different primary colors

## Development Workflow

1. Start the development environment:

    ```bash
    npm run dev:full
    ```

2. Edit your widget source files in `src/`

3. The page will automatically reload when you save changes (thanks to Rollup watch mode)

4. Check the console output panel on the test page for logs and errors

5. Use browser DevTools for advanced debugging

## Troubleshooting

### Widget not loading?

Make sure you've built the widget at least once:

```bash
npm run build
```

### Port 8080 already in use?

Specify a different port:

```bash
http-server example -p 3000 -o
```

### Changes not reflected?

1. Make sure `npm run dev` is running
2. Hard refresh the browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux)
3. Check the console for build errors

## Using with Storybook

This test page complements Storybook (not replaces it):

-   **Storybook** (`npm run storybook`) - Component development and documentation
-   **Test Page** - Integration testing and end-to-end widget behavior

Both tools serve different purposes in the development workflow.
