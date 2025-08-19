
import type React from 'react';

export enum RagStatus {
  Red = 'Red',
  Amber = 'Amber',
  Green = 'Green',
}

export interface CellAttributes {
  // Dynamic attributes for heatmap overlays. The key is the attribute 'id' from config.json.
  // The value is expected to be a number for heatmap calculations.
  [key: string]: number | string | undefined;

  // Optional fixed attributes for the popup modal
  popupUrl?: string;
  popupWidth?: string; // e.g., '80vw', '1024px'
  popupHeight?: string; // e.g., '90vh', '768px'
}

// Base interface for all capability cells
export interface CapabilityCellData {
  id: string;
  name: string;
  status: RagStatus;
  attributes: CellAttributes;
}

// L3 is the most granular capability
export interface L3Capability extends CapabilityCellData {}

// L2 contains L3s
export interface L2Capability extends CapabilityCellData {
  l3Capabilities: L3Capability[];
}

// L1 contains L2s
export interface L1Capability extends CapabilityCellData {
  l2Capabilities: L2Capability[];
}

// The top-level data structure is an array of L1 capabilities
export type CapabilityData = L1Capability[];

// Describes the structure of an overlay object in config.json
export interface OverlayConfig {
  id: string;
  label: string;
  unit: string;
  icon: string; // The name of the icon component key in the ICONS map
}

// The processed overlay option used within the application
export interface DynamicOverlayOption extends OverlayConfig {
    iconComponent: React.ReactNode;
}

// Defines the available rendering modes for the tooltip
export type TooltipType = 'list' | 'chart';
