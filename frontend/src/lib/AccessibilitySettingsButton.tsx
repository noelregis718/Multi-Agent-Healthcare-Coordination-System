'use client';

/**
 * AccessibilitySettingsButton.tsx
 * 
 * A floating button to access accessibility settings
 * Designed to be always visible and easily accessible
 */

import React, { useState } from 'react';
import { Settings, Eye, Type, Zap, Hand } from 'lucide-react';
import { AccessibilityPanel, useAccessibility } from '@/lib/accessibilityContext';

export function AccessibilitySettingsButton() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { settings } = useAccessibility();
  
  // Count active accessibility features
  const activeFeatures = [
    settings.fontSize > 1,
    settings.highContrast,
    settings.reducedMotion,
    settings.largeTouchTargets,
  ].filter(Boolean).length;

  return (
    <>
      {/* Floating accessibility button */}
      <button
        id="accessibility-settings"
        onClick={() => setIsPanelOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full 
                   bg-purple-600 hover:bg-purple-500 
                   text-white shadow-lg shadow-purple-500/30
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900
                   group"
        aria-label={`Accessibility settings. ${activeFeatures} features active.`}
        title="Accessibility Settings"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        
        {/* Active features indicator */}
        {activeFeatures > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full 
                           text-xs font-bold flex items-center justify-center">
            {activeFeatures}
          </span>
        )}
      </button>
      
      {/* Accessibility panel modal */}
      <AccessibilityPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </>
  );
}

/**
 * Quick accessibility indicators in header
 */
export function AccessibilityIndicators() {
  const { settings } = useAccessibility();
  
  return (
    <div className="flex items-center gap-2" aria-label="Active accessibility features">
      {settings.fontSize > 1 && (
        <span 
          className="p-1.5 rounded bg-blue-500/20 text-blue-400" 
          title="Large text enabled"
          aria-label="Large text mode active"
        >
          <Type className="w-4 h-4" />
        </span>
      )}
      {settings.highContrast && (
        <span 
          className="p-1.5 rounded bg-yellow-500/20 text-yellow-400" 
          title="High contrast enabled"
          aria-label="High contrast mode active"
        >
          <Eye className="w-4 h-4" />
        </span>
      )}
      {settings.reducedMotion && (
        <span 
          className="p-1.5 rounded bg-purple-500/20 text-purple-400" 
          title="Reduced motion enabled"
          aria-label="Reduced motion mode active"
        >
          <Zap className="w-4 h-4" />
        </span>
      )}
      {settings.largeTouchTargets && (
        <span 
          className="p-1.5 rounded bg-green-500/20 text-green-400" 
          title="Large buttons enabled"
          aria-label="Large touch targets active"
        >
          <Hand className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}

export default AccessibilitySettingsButton;
