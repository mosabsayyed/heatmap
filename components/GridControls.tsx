
import React from 'react';
import type { DynamicOverlayOption, TooltipType } from '../types';
import { HEATMAP_GRADIENT_CSS } from '../constants';

interface HeatmapControlsProps {
  numL1: number;
  setNumL1: (n: number) => void;
  maxL2: number;
  setMaxL2: (n: number) => void;
  maxL3: number;
  setMaxL3: (n: number) => void;
  onGenerate: () => void;
  overlayOptions: DynamicOverlayOption[];
  selectedOverlays: string[];
  onOverlayChange: (overlayId: string) => void;
  isLoading: boolean;
  tooltipType: TooltipType;
  setTooltipType: (type: TooltipType) => void;
}

const HeatmapControls: React.FC<HeatmapControlsProps> = ({
  numL1,
  setNumL1,
  maxL2,
  setMaxL2,
  maxL3,
  setMaxL3,
  onGenerate,
  overlayOptions,
  selectedOverlays,
  onOverlayChange,
  isLoading,
  tooltipType,
  setTooltipType,
}) => {
  return (
    <div className="bg-[var(--heatmap-bg-secondary)]/50 p-6 rounded-lg shadow-lg border border-[var(--heatmap-border-primary)] backdrop-blur-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-[var(--heatmap-text-primary)] mb-4 border-b border-[var(--heatmap-border-secondary)] pb-2">Data Controls (Demo)</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="numL1" className="block text-sm font-medium text-[var(--heatmap-text-secondary)]">L1 Capabilities</label>
              <input
                type="number"
                id="numL1"
                value={numL1}
                onChange={(e) => setNumL1(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1 block w-full bg-[var(--heatmap-bg-tertiary)] border-[var(--heatmap-border-secondary)] rounded-md shadow-sm py-2 px-3 text-[var(--heatmap-text-primary)] focus:outline-none focus:ring-[var(--heatmap-accent-focus-ring)] focus:border-[var(--heatmap-accent-focus-ring)] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="maxL2" className="block text-sm font-medium text-[var(--heatmap-text-secondary)]">Max L2s per L1</label>
              <input
                type="number"
                id="maxL2"
                value={maxL2}
                onChange={(e) => setMaxL2(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1 block w-full bg-[var(--heatmap-bg-tertiary)] border-[var(--heatmap-border-secondary)] rounded-md shadow-sm py-2 px-3 text-[var(--heatmap-text-primary)] focus:outline-none focus:ring-[var(--heatmap-accent-focus-ring)] focus:border-[var(--heatmap-accent-focus-ring)] sm:text-sm"
              />
            </div>
             <div>
              <label htmlFor="maxL3" className="block text-sm font-medium text-[var(--heatmap-text-secondary)]">Max L3s per L2</label>
              <input
                type="number"
                id="maxL3"
                value={maxL3}
                onChange={(e) => setMaxL3(Math.max(0, parseInt(e.target.value) || 0))}
                className="mt-1 block w-full bg-[var(--heatmap-bg-tertiary)] border-[var(--heatmap-border-secondary)] rounded-md shadow-sm py-2 px-3 text-[var(--heatmap-text-primary)] focus:outline-none focus:ring-[var(--heatmap-accent-focus-ring)] focus:border-[var(--heatmap-accent-focus-ring)] sm:text-sm"
              />
            </div>
            <button
              onClick={onGenerate}
              className="w-full bg-[var(--heatmap-accent-primary)] text-[var(--heatmap-text-button)] font-bold py-2 px-4 rounded-md hover:bg-[var(--heatmap-accent-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--heatmap-bg-secondary)] focus:ring-[var(--heatmap-accent-focus-ring)] transition-colors duration-200 disabled:bg-[var(--heatmap-accent-disabled)] disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Loading Config...' : 'Generate New Map'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[var(--heatmap-text-primary)] mb-4 border-b border-[var(--heatmap-border-secondary)] pb-2">Tooltip View</h3>
          <div className="flex items-center justify-between p-2 rounded-md bg-[var(--heatmap-bg-tertiary)]/50">
            <span className="font-medium text-[var(--heatmap-text-secondary)]">Display Mode</span>
            <div className="relative inline-flex items-center cursor-pointer">
              <button
                onClick={() => setTooltipType('list')}
                className={`px-3 py-1 text-sm rounded-l-md transition-colors ${tooltipType === 'list' ? 'bg-[var(--heatmap-accent-primary)] text-[var(--heatmap-text-button)]' : 'bg-[var(--heatmap-bg-tertiary)] hover:bg-opacity-75'}`}
                aria-pressed={tooltipType === 'list'}
              >
                List
              </button>
              <button
                onClick={() => setTooltipType('chart')}
                className={`px-3 py-1 text-sm rounded-r-md transition-colors ${tooltipType === 'chart' ? 'bg-[var(--heatmap-accent-primary)] text-[var(--heatmap-text-button)]' : 'bg-[var(--heatmap-bg-tertiary)] hover:bg-opacity-75'}`}
                aria-pressed={tooltipType === 'chart'}
              >
                Chart
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[var(--heatmap-text-primary)] mb-4 border-b border-[var(--heatmap-border-secondary)] pb-2">Heatmap Overlays</h3>
          {isLoading ? (
            <div className="text-[var(--heatmap-text-muted)]">Loading...</div>
          ) : (
            <div className="space-y-3">
              {overlayOptions.map(option => (
                <label key={option.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-[var(--heatmap-bg-tertiary)]/50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOverlays.includes(option.id)}
                    onChange={() => onOverlayChange(option.id)}
                    className="h-5 w-5 rounded bg-[var(--heatmap-bg-tertiary)] border-[var(--heatmap-border-secondary)] text-[var(--heatmap-accent-primary)] focus:ring-[var(--heatmap-accent-focus-ring)] focus:ring-offset-[var(--heatmap-bg-secondary)]"
                  />
                  <span className="text-[var(--heatmap-text-secondary)] font-medium">{option.label}</span>
                   {option.iconComponent}
                </label>
              ))}
            </div>
          )}
        </div>
         <div className="pt-4">
             <h4 className="text-lg font-semibold text-[var(--heatmap-text-primary)] mb-3">Legend</h4>
             <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2">
                     <span className="w-4 h-4 border-l-4" style={{borderColor: 'var(--heatmap-rag-green)'}}></span>
                     <span className="text-xs text-[var(--heatmap-text-muted)]">Green</span>
                 </div>
                 <div className="flex items-center space-x-2">
                     <span className="w-4 h-4 border-l-4" style={{borderColor: 'var(--heatmap-rag-amber)'}}></span>
                     <span className="text-xs text-[var(--heatmap-text-muted)]">Amber</span>
                 </div>
                 <div className="flex items-center space-x-2">
                     <span className="w-4 h-4 border-l-4" style={{borderColor: 'var(--heatmap-rag-red)'}}></span>
                     <span className="text-xs text-[var(--heatmap-text-muted)]">Red</span>
                 </div>
             </div>
             <div className="mt-4">
                 <div className="text-sm text-[var(--heatmap-text-secondary)] mb-2">Heatmap Scale:</div>
                 <div 
                    className="w-full h-4 rounded-full"
                    style={{ background: HEATMAP_GRADIENT_CSS }}
                 >
                 </div>
                 <div className="flex justify-between text-xs text-[var(--heatmap-text-muted)] mt-1">
                     <span>Low</span>
                     <span>High</span>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default HeatmapControls;