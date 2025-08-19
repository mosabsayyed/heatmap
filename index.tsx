import CapabilityHeatmapContainer from './CapabilityHeatmapContainer';
import HeatmapControls from './components/GridControls';
import type { CapabilityData, OverlayConfig, DynamicOverlayOption, RagStatus, TooltipType } from './types';

// Export the main component
export { CapabilityHeatmapContainer };

// Export controls for optional use in the host application (e.g., for storybook or demos)
export { HeatmapControls };

// Export all relevant types for the consumer
export type {
    CapabilityData,
    OverlayConfig,
    DynamicOverlayOption,
    RagStatus,
    TooltipType
};
