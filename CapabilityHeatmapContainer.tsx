import React, { useState, useEffect, useCallback } from 'react';
import { CapabilityData, RagStatus, CellAttributes, L1Capability, L2Capability, OverlayConfig, DynamicOverlayOption, TooltipType } from './types';
import HeatmapControls from './components/GridControls';
import CapabilityHeatmap from './components/CapabilityHeatmap';
import { ICONS } from './constants';

interface CapabilityHeatmapContainerProps {
  /**
   * The hierarchical data to be visualized in the heatmap.
   */
  capabilities: CapabilityData;
  /**
   * The configuration that defines the available heatmap overlays.
   */
  overlayConfig: OverlayConfig[];
}

const CapabilityHeatmapContainer: React.FC<CapabilityHeatmapContainerProps> = ({
  capabilities,
  overlayConfig: initialOverlayConfig,
}) => {
  const [selectedOverlays, setSelectedOverlays] = useState<string[]>([]);
  const [tooltipType, setTooltipType] = useState<TooltipType>('list');
  const [processedOverlayConfig, setProcessedOverlayConfig] = useState<DynamicOverlayOption[]>([]);

  useEffect(() => {
    // Process the overlay config to include React icon components
    const dynamicOptions: DynamicOverlayOption[] = initialOverlayConfig.map(o => ({
      ...o,
      iconComponent: ICONS[o.icon] ? React.createElement(ICONS[o.icon]) : null,
    }));
    setProcessedOverlayConfig(dynamicOptions);
  }, [initialOverlayConfig]);


  const handleOverlayChange = (overlayId: string) => {
    setSelectedOverlays(prev =>
      prev.includes(overlayId)
        ? prev.filter(item => item !== overlayId)
        : [...prev, overlayId]
    );
  };

  return (
    <div className="flex-grow min-w-0 h-full">
        <CapabilityHeatmap 
            capabilities={capabilities} 
            selectedOverlays={selectedOverlays}
            overlayConfig={processedOverlayConfig} 
            tooltipType={tooltipType}
        />
    </div>
  );
};

export default CapabilityHeatmapContainer;
