'use client';

import { KnowledgeEntry } from '@/types';
import { Calendar, MapPin, Edit2, Trash2, Eye, Clock } from 'lucide-react';

interface Props {
  entries: KnowledgeEntry[];
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
  onViewDetail?: (entry: KnowledgeEntry) => void;
}

interface CenturyGroup {
  century: number;
  isBc: boolean;
  label: string;
  entries: KnowledgeEntry[];
}

export default function EnhancedTimelineView({ entries, onEdit, onDelete, onViewDetail }: Props) {
  // Group entries by century
  const groupByCentury = (): CenturyGroup[] => {
    const groups: { [key: string]: CenturyGroup } = {};

    entries.forEach((entry) => {
      const year = entry.isBc ? -entry.year : entry.year;
      const centuryNum = Math.ceil(Math.abs(entry.year) / 100);
      const key = `${entry.isBc ? 'BC' : 'AD'}_${centuryNum}`;

      if (!groups[key]) {
        const label = entry.isBc
          ? `Thế kỷ ${centuryNum} TCN`
          : centuryNum === 21 ? `Thế kỷ 21 (2001-nay)`
          : centuryNum === 20 ? `Thế kỷ 20 (1901-2000)`
          : `Thế kỷ ${centuryNum}`;

        groups[key] = {
          century: centuryNum,
          isBc: entry.isBc,
          label,
          entries: [],
        };
      }

      groups[key].entries.push(entry);
    });

    // Sort groups by time (newest first)
    return Object.values(groups).sort((a, b) => {
      const aYear = a.isBc ? -a.century * 100 : a.century * 100;
      const bYear = b.isBc ? -b.century * 100 : b.century * 100;
      return bYear - aYear;
    });
  };

  const formatDate = (entry: KnowledgeEntry) => {
    let date = '';
    if (entry.day && entry.month) {
      date = `${entry.day}/${entry.month}/`;
    } else if (entry.month) {
      date = `Tháng ${entry.month}/`;
    }
    date += `${entry.year}`;
    if (entry.approximateDate) date += ' (≈)';
    return date;
  };

  const centuryGroups = groupByCentury();

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <p className="text-gray-500">Chưa có dữ liệu. Hãy thêm kiến thức mới!</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {centuryGroups.map((group, groupIndex) => {
        // Sort entries within group by year (newest first)
        const sortedEntries = [...group.entries].sort((a, b) => {
          const aYear = a.isBc ? -a.year : a.year;
          const bYear = b.isBc ? -b.year : b.year;
          return bYear - aYear;
        });

        // Group by category for parallel display
        const categoryGroups: { [categoryId: string]: KnowledgeEntry[] } = {};
        sortedEntries.forEach((entry) => {
          const primaryCategory = entry.categories?.find(c => c.isPrimary)?.category || entry.categories?.[0]?.category;
          const categoryId = primaryCategory?.id || 'uncategorized';
          if (!categoryGroups[categoryId]) {
            categoryGroups[categoryId] = [];
          }
          categoryGroups[categoryId].push(entry);
        });

        return (
          <div key={`${group.isBc ? 'BC' : 'AD'}_${group.century}`} className="relative">
            {/* Century Header */}
            <div className="sticky top-20 z-10 mb-6">
              <div className="relative">
                {/* Content */}
                <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-100 rounded-lg text-slate-700">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {group.label}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                          {group.entries.length} sự kiện
                        </p>
                      </div>
                    </div>

                    {/* Category Legend for this century */}
                    <div className="flex gap-2 flex-wrap justify-end">
                      {Object.keys(categoryGroups).map((catId) => {
                        const entry = categoryGroups[catId][0];
                        const category = entry.categories?.find(c => c.isPrimary)?.category || entry.categories?.[0]?.category;
                        if (!category) return null;
                        return (
                          <div
                            key={catId}
                            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${category.color}15`,
                              color: category.color,
                              border: `1px solid ${category.color}40`,
                            }}
                          >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                            <span className="bg-white/70 px-1.5 rounded-full text-[10px]">
                              {categoryGroups[catId].length}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Content - Multi-column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 hidden lg:block"></div>

              {sortedEntries.map((entry, index) => {
                const primaryCategory = entry.categories?.find(c => c.isPrimary)?.category || entry.categories?.[0]?.category;
                const primaryCountry = entry.countries?.find(c => c.isPrimary)?.country || entry.countries?.[0]?.country;

                return (
                  <div
                    key={entry.id}
                    className="relative group"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Connection dot */}
                    <div
                      className="absolute -left-2 top-8 w-4 h-4 rounded-full border-4 border-white shadow-lg hidden lg:block z-10"
                      style={{
                        backgroundColor: primaryCategory?.color || '#8B5CF6',
                      }}
                    ></div>

                    {/* Card */}
                    <div
                      className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 group-hover:border-gray-300"
                    >
                      {/* Category Color Bar - Subtle */}
                      <div
                        className="absolute top-0 left-0 bottom-0 w-1"
                        style={{
                          backgroundColor: primaryCategory?.color || '#64748b',
                        }}
                      ></div>

                      <div className="p-4 pl-5">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 flex-wrap flex-1">
                            {/* Category Badge */}
                            {primaryCategory && (
                              <div
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-sm border"
                                style={{
                                  backgroundColor: `${primaryCategory.color}08`,
                                  borderColor: `${primaryCategory.color}30`,
                                  color: primaryCategory.color,
                                }}
                              >
                                <span className="text-base">{primaryCategory.icon}</span>
                                <span className="text-xs font-semibold">{primaryCategory.name}</span>
                              </div>
                            )}

                            {/* Date Badge */}
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 rounded-md text-xs text-slate-700 border border-slate-200">
                              <Calendar className="w-3 h-3" />
                              <span className="font-semibold">{formatDate(entry)}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {onViewDetail && (
                              <button
                                onClick={() => onViewDetail(entry)}
                                className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-md transition"
                                title="Xem chi tiết"
                              >
                                <Eye size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => onEdit(entry)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-md transition"
                              title="Chỉnh sửa"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => onDelete(entry.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition"
                              title="Xóa"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-base leading-snug">
                          {entry.title}
                        </h3>

                        {/* Description */}
                        {entry.description && (
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                            {entry.description}
                          </p>
                        )}

                        {/* Country */}
                        {primaryCountry && (
                          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2.5">
                            <MapPin className="w-3 h-3" />
                            <span className="font-medium">{primaryCountry.name}</span>
                            {primaryCountry.region && (
                              <span className="text-slate-400">• {primaryCountry.region}</span>
                            )}
                          </div>
                        )}

                        {/* Tags */}
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {entry.tags.slice(0, 3).map((t) => (
                              <span
                                key={t.tagId}
                                className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-md font-medium"
                              >
                                #{t.tag.name}
                              </span>
                            ))}
                            {entry.tags.length > 3 && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-md font-medium">
                                +{entry.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Importance */}
                        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-slate-100">
                          <span className="text-amber-500 text-xs">
                            {'★'.repeat(entry.importanceLevel)}
                            <span className="text-slate-300">{'★'.repeat(5 - entry.importanceLevel)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Century Separator */}
            {groupIndex < centuryGroups.length - 1 && (
              <div className="mt-12 mb-6">
                <div className="relative flex items-center">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <div className="px-4 py-1.5 bg-slate-50 rounded-md text-xs font-semibold text-slate-500 border border-slate-200">
                    ⏰ Trở về quá khứ
                  </div>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* End of Timeline */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-lg">📚</span>
          <span className="text-slate-600 font-semibold text-sm">Bắt đầu hành trình tri thức</span>
          <span className="text-lg">📚</span>
        </div>
      </div>
    </div>
  );
}
