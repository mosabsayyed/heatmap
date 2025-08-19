# Interactive Capability Heatmap Component

This project provides a highly interactive, reusable, and configurable heatmap component built with React and TypeScript. It's designed to be imported and used within any React-based application.

The component is highly themeable via CSS variables and can be configured to visualize any number of data overlays.

## Features

-   **NPM-Ready**: Designed to be consumed as a standard package in any modern JavaScript project.
-   **Configurable Overlays**: Define all heatmap attributes by passing a configuration object as a prop.
-   **CSS Variable Theming**: Easily adapt the component's look and feel to match your site's branding by overriding CSS Custom Properties.
-   **Configurable Tooltips**: Switch between a traditional list view and a graphical **Spider Chart** view for tooltips.
-   **Hierarchical Data Display**: Visualizes L1, L2, and L3 capabilities in a structured grid.
-   **Fluid Heatmap Overlay**: Renders a smooth, gradient-based heatmap inspired by modern weather maps.
-   **Clickable Cell Popups**: Cells can be configured to open a modal popup containing an `iframe` of a specified URL.

---

## Integration Guide

The component is designed to be installed from a package manager (like npm or yarn) and imported into your application.

### Step 1: Install the Module

```bash
# Using npm
npm install capability-heatmap-component

# Using yarn
yarn add capability-heatmap-component
```

### Step 2: Import Component and Styles

In your React application, import the main component and its stylesheet.

```jsx
import React, { useState, useEffect } from 'react';
// Import the main component and its types
import { CapabilityHeatmapContainer, CapabilityData, OverlayConfig } from 'capability-heatmap-component';

// Import the component's default styles
// The path may vary based on your build setup
import 'capability-heatmap-component/styles.css';

function YourAppPage() {
  const [capabilities, setCapabilities] = useState<CapabilityData>([]);
  const [overlayConfig, setOverlayConfig] = useState<OverlayConfig>([]);

  // Fetch or define your data and configuration here
  useEffect(() => {
    // Example: Fetch data from an API
    // fetch('/api/heatmap-data').then(res => res.json()).then(setCapabilities);
    // fetch('/api/heatmap-config').then(res => res.json()).then(setOverlayConfig);

    // For this example, we'll use static data
    const sampleConfig = [
        { "id": "staffNeeds", "label": "Staff Needs", "unit": "%", "icon": "StaffIcon" },
        { "id": "itTools", "label": "IT Tools", "unit": "%", "icon": "ToolsIcon" }
        // ... more overlays
    ];
    setOverlayConfig(sampleConfig);
    // ... set sample capabilities data
  }, []);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <CapabilityHeatmapContainer
        capabilities={capabilities}
        overlayConfig={overlayConfig}
      />
    </div>
  );
}
```
**Note:** You must provide both the `capabilities` data and the `overlayConfig` as props.

---

## Styling & Theming

The component is styled using **CSS Custom Properties (Variables)**. You can override these variables in your own stylesheet to seamlessly integrate the heatmap with your application's design system.

### How to Theme

In your main application's CSS file, define new values for the variables inside a `:root` block or on a specific container.

**Example `your-app.css`:**
```css
:root {
  --heatmap-bg-primary: #ffffff;
  --heatmap-bg-secondary: #f3f4f6;
  --heatmap-text-primary: #111827;
  --heatmap-text-secondary: #374151;
  --heatmap-accent-primary: #db2777; /* A pink accent */
  --heatmap-accent-hover: #c21e66;
  --heatmap-rag-green: #10b981;
}
```

### Key Themeable Variables

-   `--heatmap-bg-primary`: Main background color.
-   `--heatmap-bg-secondary`: Secondary background (e.g., control panel).
-   `--heatmap-text-primary`: Primary text color.
-   `--heatmap-text-muted`: Muted/secondary text color.
-   `--heatmap-border-primary`: Primary border color.
-   `--heatmap-accent-primary`: Main interactive/accent color.
-   `--heatmap-accent-hover`: Hover state for accent color.
-   `--heatmap-rag-green`, `--heatmap-rag-amber`, `--heatmap-rag-red`: Colors for RAG status indicators.
-   `--heatmap-spider-shape-fill`, `--heatmap-spider-shape-stroke`: Colors for the spider chart visualization.

---

## Configuration & Data

### Overlay Configuration (`overlayConfig` prop)

The heatmap overlays are defined by an array of objects passed to the `overlayConfig` prop. Each object defines one overlay:

-   `id` (string): A unique identifier. This **must** match the key used in the `attributes` object of your data.
-   `label` (string): The display name shown in the UI.
-   `unit` (string): The unit of measurement (e.g., "%", "k").
-   `icon` (string): The name of an icon from the `ICONS` registry in `constants.tsx`.

### Data Structure (`capabilities` prop)

The component requires a `CapabilityData` payload (`L1Capability[]`) passed to the `capabilities` prop.

```typescript
export interface CellAttributes {
  // Dynamic attributes matching IDs in config.json
  [key: string]: number | string | undefined;

  // Optional fixed attributes for popups
  popupUrl?: string;
  popupWidth?: string;
  popupHeight?: string;
}

export interface L1Capability {
  id: string;
  name: string;
  status: 'Red' | 'Amber' | 'Green';
  attributes: CellAttributes;
  l2Capabilities: L2Capability[];
}
```
