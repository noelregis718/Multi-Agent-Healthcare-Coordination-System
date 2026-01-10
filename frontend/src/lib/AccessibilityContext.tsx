'use client';

/**
 * AccessibilityContext.tsx
 * 
 * Global accessibility settings for CareOrbit
 * Implements Microsoft Inclusive Design principles:
 * - Recognize exclusion
 * - Learn from diversity  
 * - Solve for one, extend to many
 * 
 * Features:
 * - Font size scaling (elderly users, low vision)
 * - High contrast mode (visual impairments)
 * - Reduced motion (vestibular disorders)
 * - Screen reader announcements
 * - Keyboard navigation support
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Accessibility settings interface
export interface AccessibilitySettings {
  // Font scaling (1 = normal, 1.25 = large, 1.5 = extra large)
  fontSize: number;
  // High contrast mode for visual impairments
  highContrast: boolean;
  // Reduced motion for vestibular disorders
  reducedMotion: boolean;
  // Screen reader mode (more verbose descriptions)
  screenReaderMode: boolean;
  // Large touch targets for motor impairments
  largeTouchTargets: boolean;
  // Simple language mode (8th grade reading level)
  simpleLanguage: boolean;
}

// Default settings (accessible baseline)
const defaultSettings: AccessibilitySettings = {
  fontSize: 1,
  highContrast: false,
  reducedMotion: false,
  screenReaderMode: false,
  largeTouchTargets: false,
  simpleLanguage: true, // Default ON for health literacy
};

// Context interface
interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  getFontSizeClass: () => string;
  getContrastClass: () => string;
}

// Create context
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Storage key for persistence
const STORAGE_KEY = 'careorbit-accessibility-settings';

/**
 * AccessibilityProvider Component
 * Wraps the app to provide accessibility settings globally
 */
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      }
      
      // Check system preferences
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setSettings(prev => ({ ...prev, reducedMotion: true }));
      }
      if (window.matchMedia('(prefers-contrast: more)').matches) {
        setSettings(prev => ({ ...prev, highContrast: true }));
      }
    } catch (e) {
      console.warn('Failed to load accessibility settings:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (e) {
        console.warn('Failed to save accessibility settings:', e);
      }
    }
  }, [settings, isLoaded]);

  // Apply CSS custom properties for font scaling
  useEffect(() => {
    document.documentElement.style.setProperty('--a11y-font-scale', settings.fontSize.toString());
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion);
    document.documentElement.classList.toggle('large-touch-targets', settings.largeTouchTargets);
  }, [settings]);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Reset to defaults
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  // Screen reader announcement
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.getElementById(`a11y-announcer-${priority}`);
    if (announcer) {
      announcer.textContent = '';
      // Small delay to ensure screen readers pick up the change
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    }
  }, []);

  // Get Tailwind class for font size
  const getFontSizeClass = useCallback(() => {
    if (settings.fontSize >= 1.5) return 'text-xl';
    if (settings.fontSize >= 1.25) return 'text-lg';
    return 'text-base';
  }, [settings.fontSize]);

  // Get contrast class
  const getContrastClass = useCallback(() => {
    return settings.highContrast ? 'high-contrast' : '';
  }, [settings.highContrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        announce,
        getFontSizeClass,
        getContrastClass,
      }}
    >
      {/* Screen reader announcer regions */}
      <div
        id="a11y-announcer-polite"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <div
        id="a11y-announcer-assertive"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * useAccessibility Hook
 * Access accessibility settings from any component
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

/**
 * SkipLink Component
 * Allows keyboard users to skip to main content
 */
export function SkipLink({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-careorbit-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  );
}

/**
 * AccessibilityPanel Component
 * UI for users to adjust accessibility settings
 */
export function AccessibilityPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { settings, updateSettings, resetSettings } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 id="a11y-panel-title" className="text-xl font-bold text-white">
            Accessibility Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
            aria-label="Close accessibility settings"
          >
            <span className="text-slate-400 text-xl">×</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Text Size
            </label>
            <div className="flex gap-2">
              {[
                { value: 1, label: 'Normal' },
                { value: 1.25, label: 'Large' },
                { value: 1.5, label: 'Extra Large' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateSettings({ fontSize: value })}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    settings.fontSize === value
                      ? 'bg-careorbit-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  aria-pressed={settings.fontSize === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle options */}
          {[
            { key: 'highContrast', label: 'High Contrast', description: 'Increase color contrast for better visibility' },
            { key: 'reducedMotion', label: 'Reduce Motion', description: 'Minimize animations and transitions' },
            { key: 'largeTouchTargets', label: 'Large Buttons', description: 'Bigger tap/click targets' },
            { key: 'simpleLanguage', label: 'Simple Language', description: 'Use plain language (8th grade level)' },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
              <button
                role="switch"
                aria-checked={settings[key as keyof AccessibilitySettings] as boolean}
                onClick={() => updateSettings({ [key]: !settings[key as keyof AccessibilitySettings] })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[key as keyof AccessibilitySettings]
                    ? 'bg-careorbit-500'
                    : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[key as keyof AccessibilitySettings] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Reset button */}
        <button
          onClick={resetSettings}
          className="mt-6 w-full py-2 px-4 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 transition-colors text-sm"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

export default AccessibilityContext;