'use client';

/**
 * MedicalTermTooltip.tsx
 * 
 * Accessible tooltip component for explaining medical terminology
 * in plain language (8th grade reading level)
 * 
 * Accessibility features:
 * - Keyboard accessible (focus/hover)
 * - Screen reader friendly with aria descriptions
 * - Respects reduced motion preferences
 * - High contrast support
 */

import React, { useState, useRef, useEffect } from 'react';
import { getMedicalTermInfo, MedicalTerm } from '@/lib/medical-terms';
import { useAccessibility } from '@/lib/AccessibilityContext';
import { HelpCircle } from 'lucide-react';

interface MedicalTermTooltipProps {
  term: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

/**
 * MedicalTermTooltip Component
 * Wraps medical terms with an accessible tooltip showing plain language explanation
 */
export function MedicalTermTooltip({ 
  term, 
  children, 
  showIcon = true,
  className = '' 
}: MedicalTermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  
  const { settings } = useAccessibility();
  const termInfo = getMedicalTermInfo(term);
  
  // If no term info found, just render children
  if (!termInfo) {
    return <>{children || term}</>;
  }

  // Calculate tooltip position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      setPosition(spaceBelow < 150 && spaceAbove > spaceBelow ? 'top' : 'bottom');
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const displayText = settings.simpleLanguage ? termInfo.simple : termInfo.term;

  return (
    <span
      ref={triggerRef}
      className={`relative inline-flex items-center gap-1 group ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {/* Trigger text */}
      <span
        tabIndex={0}
        role="button"
        aria-describedby={`tooltip-${term.replace(/\s+/g, '-')}`}
        className="underline decoration-dotted decoration-careorbit-400 underline-offset-2 cursor-help focus:outline-none focus:ring-2 focus:ring-careorbit-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
      >
        {children || displayText}
      </span>
      
      {/* Help icon */}
      {showIcon && (
        <HelpCircle 
          className="w-3.5 h-3.5 text-careorbit-400 opacity-60 group-hover:opacity-100 transition-opacity" 
          aria-hidden="true"
        />
      )}

      {/* Tooltip */}
      {isOpen && (
        <div
          ref={tooltipRef}
          id={`tooltip-${term.replace(/\s+/g, '-')}`}
          role="tooltip"
          className={`
            absolute z-50 w-64 p-3 rounded-lg shadow-xl
            bg-slate-800 border border-slate-700
            text-sm text-slate-200
            ${settings.reducedMotion ? '' : 'animate-fade-in'}
            ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
            left-1/2 -translate-x-1/2
          `}
        >
          {/* Arrow */}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-2 h-2 
              bg-slate-800 border-slate-700 rotate-45
              ${position === 'top' 
                ? 'bottom-[-5px] border-r border-b' 
                : 'top-[-5px] border-l border-t'}
            `}
            aria-hidden="true"
          />
          
          {/* Content */}
          <div className="relative">
            {/* Medical term */}
            <p className="font-semibold text-careorbit-400 mb-1">
              {termInfo.term}
            </p>
            
            {/* Simple version */}
            <p className="font-medium text-white mb-2">
              = {termInfo.simple}
            </p>
            
            {/* Description */}
            <p className="text-slate-400 text-xs leading-relaxed">
              {termInfo.description}
            </p>
            
            {/* Category badge */}
            <span className="inline-block mt-2 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-slate-700 text-slate-400">
              {termInfo.category}
            </span>
          </div>
        </div>
      )}
    </span>
  );
}

/**
 * SimplifyText Component
 * Automatically finds and wraps medical terms in tooltips
 */
interface SimplifyTextProps {
  text: string;
  className?: string;
}

export function SimplifyText({ text, className = '' }: SimplifyTextProps) {
  const { settings } = useAccessibility();
  
  // If simple language mode is off, just return text
  if (!settings.simpleLanguage) {
    return <span className={className}>{text}</span>;
  }
  
  // Find medical terms and wrap them
  // This is a simplified version - production would use more sophisticated parsing
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  
  // List of terms to search for (sorted by length to match longer terms first)
  const termsToFind = [
    'Type 2 Diabetes', 'Diabetes Mellitus', 'Atrial Fibrillation', 
    'Chronic Kidney Disease', 'Heart Failure', 'Hypertension',
    'Hyperlipidemia', 'Metformin', 'Lisinopril', 'Atorvastatin',
    'Carvedilol', 'HbA1c', 'COPD', 'Depression', 'Anxiety'
  ];
  
  termsToFind.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const parts2: React.ReactNode[] = [];
    let match;
    let lastIndex = 0;
    
    while ((match = regex.exec(remaining)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts2.push(remaining.slice(lastIndex, match.index));
      }
      // Add wrapped term
      parts2.push(
        <MedicalTermTooltip key={`${term}-${key++}`} term={term}>
          {match[0]}
        </MedicalTermTooltip>
      );
      lastIndex = regex.lastIndex;
    }
    
    if (parts2.length > 0) {
      parts2.push(remaining.slice(lastIndex));
      remaining = '';
      parts.push(...parts2);
    }
  });
  
  if (remaining) {
    parts.push(remaining);
  }
  
  return <span className={className}>{parts.length > 0 ? parts : text}</span>;
}

/**
 * ReadingLevelBadge Component
 * Shows the reading level of content
 */
interface ReadingLevelBadgeProps {
  level?: number;
  className?: string;
}

export function ReadingLevelBadge({ level = 8, className = '' }: ReadingLevelBadgeProps) {
  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 ${className}`}
      title={`Content written at ${level}th grade reading level for accessibility`}
    >
      <span aria-hidden="true">📖</span>
      <span>{level}th Grade Level</span>
    </span>
  );
}

export default MedicalTermTooltip;