'use client';

import { useState, useCallback } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Edit3,
  Languages,
  XCircle,
  History,
  Lightbulb,
  Zap,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  GitBranch,
  Heart,
  PlayCircle,
  Crown,
  FileText,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type {
  ConjugationCategory as CategoryType,
  ConjugationForm,
} from '../types';

interface ConjugationCategoryProps {
  /** Category identifier */
  category: CategoryType;
  /** Forms in this category */
  forms: ConjugationForm[];
  /** Whether the category is expanded */
  isExpanded: boolean;
  /** Callback when category is toggled */
  onToggle: () => void;
  /** Callback when a form is copied */
  onCopy: (form: ConjugationForm) => void;
}

/**
 * ConjugationCategory - Collapsible card displaying conjugation forms by category
 *
 * Features:
 * - Collapsible card with smooth animation
 * - Category name in English and Japanese
 * - Forms with kanji, hiragana, romaji
 * - Copy button for each form
 * - Hover/focus highlighting
 * - Proper ARIA labels and roles
 *
 * Requirements: 5.2, 5.3, 5.7, 6.1, 10.2
 */
export default function ConjugationCategory({
  category,
  forms,
  isExpanded,
  onToggle,
  onCopy,
}: ConjugationCategoryProps) {
  const categoryInfo = getCategoryInfo(category);

  if (forms.length === 0) {
    return null;
  }

  return (
    <div
      className='group flex flex-col transition-all duration-1000'
      role='listitem'
    >
      {/* Category header - Pure Alignment */}
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center justify-between py-12 transition-all duration-500',
          'cursor-pointer focus:outline-none',
        )}
        aria-expanded={isExpanded}
        aria-controls={`category-${category}`}
        aria-label={`${categoryInfo.name} (${categoryInfo.nameJa}), ${forms.length} forms. ${isExpanded ? 'Collapse' : 'Expand'}`}
      >
        <div className='flex items-center gap-10'>
          {/* Subtle colored marker */}
          <div
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-all duration-1000',
              isExpanded
                ? 'scale-[3] shadow-lg'
                : 'opacity-40 group-hover:scale-[2]',
              categoryInfo.colorClass, // Changed from bgClass to colorClass
            )}
            style={{ backgroundColor: categoryInfo.color }} // We'll need to update the info function
            aria-hidden='true'
          />

          <div className='flex flex-col text-left'>
            <h4
              className={cn(
                'text-5xl font-black tracking-tighter transition-all duration-700',
                isExpanded
                  ? 'text-(--main-color)'
                  : 'text-(--secondary-color) opacity-20 group-hover:opacity-100',
              )}
            >
              {categoryInfo.name}
            </h4>
            <div className='mt-2 flex items-center gap-6'>
              <span className='font-japanese text-sm font-bold tracking-widest text-(--main-color) opacity-20'>
                {categoryInfo.nameJa}
              </span>
              <span className='text-[10px] font-black tracking-[0.4em] text-(--secondary-color) uppercase opacity-10'>
                {forms.length} Entries
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-12'>
          <div
            className={cn(
              'hidden h-[1px] w-64 bg-gradient-to-r from-transparent via-(--border-color)/20 to-transparent transition-all duration-1000 lg:block',
              isExpanded ? 'opacity-0' : 'opacity-100',
            )}
          />
          <div
            className={cn(
              'transition-all duration-700',
              isExpanded
                ? 'rotate-180 text-(--main-color)'
                : 'text-(--secondary-color) opacity-20 group-hover:opacity-100',
            )}
          >
            <ChevronDown className='h-6 w-6' aria-hidden='true' />
          </div>
        </div>
      </button>

      {/* Forms list - Flowing directly on canvas */}
      <div
        id={`category-${category}`}
        className={cn(
          'grid transition-all duration-1000 ease-in-out',
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
        role='region'
        aria-label={`${categoryInfo.name} conjugation forms`}
        hidden={!isExpanded}
      >
        <div className='overflow-hidden'>
          <div
            className='flex flex-col gap-0'
            role='list'
            aria-label={`${forms.length} ${categoryInfo.name.toLowerCase()} forms`}
          >
            {forms.map((form, index) => (
              <FormRow
                key={form.id}
                form={form}
                onCopy={onCopy}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Individual form row component
 */
function FormRow({
  form,
  onCopy,
  index,
}: {
  form: ConjugationForm;
  onCopy: (form: ConjugationForm) => void;
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    onCopy(form);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [form, onCopy]);

  return (
    <div
      className={cn(
        'group flex items-center justify-between gap-8 py-10 transition-all duration-500',
        'border-b border-(--border-color)/10 last:border-0',
        'animate-in fade-in slide-in-from-left-8 duration-700',
      )}
      style={{ animationDelay: `${index * 40}ms` }}
      role='listitem'
    >
      {/* Form info */}
      <div className='flex min-w-0 flex-1 flex-col gap-4'>
        <div className='flex items-baseline gap-6'>
          <span
            className='font-japanese text-4xl font-black text-(--main-color) sm:text-5xl'
            lang='ja'
          >
            {form.kanji}
          </span>
          {form.kanji !== form.hiragana && (
            <span
              className='font-japanese text-xl font-medium text-(--secondary-color) opacity-30'
              lang='ja'
            >
              {form.hiragana}
            </span>
          )}
        </div>
        <div className='flex flex-wrap items-center gap-6'>
          <div className='flex items-center gap-3'>
            <span className='text-[10px] font-black tracking-[0.4em] text-(--secondary-color) uppercase opacity-40'>
              {form.name}
            </span>
          </div>
          <div className='h-3 w-[1px] bg-(--border-color)/20' />
          <span className='font-mono text-[11px] font-bold tracking-widest text-(--secondary-color) opacity-30'>
            {form.romaji}
          </span>
          {form.formality === 'polite' && (
            <div className='flex items-center gap-2'>
              <div className='h-1.5 w-1.5 rounded-full bg-blue-500/40' />
              <span className='text-[9px] font-black tracking-[0.3em] text-blue-500/60 uppercase'>
                Polite
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Copy icon button - Pure Icon */}
      <button
        onClick={handleCopy}
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center transition-all duration-500 active:scale-90',
          'text-(--secondary-color) opacity-0 group-hover:opacity-100 focus:opacity-100',
          copied && 'text-green-500 opacity-100',
        )}
        aria-label={copied ? 'Copied' : 'Copy'}
      >
        {copied ? (
          <Check className='h-6 w-6' aria-hidden='true' />
        ) : (
          <Copy
            className='h-5 w-5 hover:text-(--main-color)'
            aria-hidden='true'
          />
        )}
      </button>
    </div>
  );
}

/**
 * Get display information for a category
 */
function getCategoryInfo(category: CategoryType): {
  name: string;
  nameJa: string;
  colorClass: string;
  color: string;
} {
  const categories: Record<
    CategoryType,
    { name: string; nameJa: string; colorClass: string; color: string }
  > = {
    basic: {
      name: 'Basic Forms',
      nameJa: '基本形',
      colorClass: 'text-blue-500',
      color: '#3b82f6',
    },
    polite: {
      name: 'Polite Forms',
      nameJa: '丁寧形',
      colorClass: 'text-purple-500',
      color: '#a855f7',
    },
    negative: {
      name: 'Negative Forms',
      nameJa: '否定形',
      colorClass: 'text-red-500',
      color: '#ef4444',
    },
    past: {
      name: 'Past Forms',
      nameJa: '過去形',
      colorClass: 'text-amber-500',
      color: '#f59e0b',
    },
    volitional: {
      name: 'Volitional Forms',
      nameJa: '意向形',
      colorClass: 'text-cyan-500',
      color: '#06b6d4',
    },
    potential: {
      name: 'Potential Forms',
      nameJa: '可能形',
      colorClass: 'text-green-500',
      color: '#22c55e',
    },
    passive: {
      name: 'Passive Forms',
      nameJa: '受身形',
      colorClass: 'text-indigo-500',
      color: '#6366f1',
    },
    causative: {
      name: 'Causative Forms',
      nameJa: '使役形',
      colorClass: 'text-orange-500',
      color: '#f97316',
    },
    'causative-passive': {
      name: 'Causative-Passive',
      nameJa: '使役受身形',
      colorClass: 'text-pink-500',
      color: '#ec4899',
    },
    imperative: {
      name: 'Imperative Forms',
      nameJa: '命令形',
      colorClass: 'text-yellow-500',
      color: '#eab308',
    },
    conditional: {
      name: 'Conditional Forms',
      nameJa: '条件形',
      colorClass: 'text-teal-500',
      color: '#14b8a6',
    },
    'tai-form': {
      name: 'Desire Forms',
      nameJa: 'たい形',
      colorClass: 'text-rose-500',
      color: '#f43f5e',
    },
    progressive: {
      name: 'Progressive Forms',
      nameJa: '進行形',
      colorClass: 'text-sky-500',
      color: '#0ea5e9',
    },
    honorific: {
      name: 'Honorific Forms',
      nameJa: '敬語',
      colorClass: 'text-violet-500',
      color: '#8b5cf6',
    },
  };

  return (
    categories[category] || {
      name: category,
      nameJa: category,
      colorClass: 'text-gray-500',
      color: '#6b7280',
    }
  );
}
