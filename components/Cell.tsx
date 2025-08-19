
import React, { useRef, useState, useEffect } from 'react';
import type { CapabilityCellData, DynamicOverlayOption, TooltipType } from '../types';
import { RAG_COLORS } from '../constants';
import Tooltip from './Tooltip';

interface CellProps {
  data: CapabilityCellData;
  onCellClick: (cellData: CapabilityCellData) => void;
  overlayConfig: DynamicOverlayOption[];
  tooltipType: TooltipType;
}

const Cell: React.FC<CellProps> = ({ data, onCellClick, overlayConfig, tooltipType }) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [showTooltipBelow, setShowTooltipBelow] = useState(false);
  
  const isClickable = !!data.attributes.popupUrl;

  useEffect(() => {
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      if (rect.top < 300) { // Simple check if the tooltip has enough space above
        setShowTooltipBelow(true);
      } else {
        setShowTooltipBelow(false);
      }
    }
  }, [data]);

  const borderClass = RAG_COLORS[data.status];
  const clickableClasses = isClickable ? 'cursor-pointer' : 'cursor-default';

  const handleClick = () => {
    if (isClickable) {
      onCellClick(data);
    }
  };

  return (
    <div 
        ref={cellRef} 
        className="relative group h-full w-full"
        onClick={handleClick}
        onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleClick() }}
        role={isClickable ? 'button' : 'gridcell'}
        tabIndex={isClickable ? 0 : -1}
        aria-label={`Capability ${data.name}`}
    >
        <div
          className={`relative h-full w-full border-l-4 ${borderClass} ${clickableClasses} flex items-center justify-center p-2 text-center rounded-md bg-[var(--heatmap-bg-tertiary)]/20 hover:bg-[var(--heatmap-bg-hover)] transition-all duration-200`}
        >
          <span className="text-[var(--heatmap-text-primary)] text-xs sm:text-sm font-medium break-words drop-shadow-md">{data.name}</span>
        </div>
        
        <Tooltip data={data} showBelow={showTooltipBelow} overlayConfig={overlayConfig} tooltipType={tooltipType} />
      </div>
  );
};

export default React.memo(Cell);