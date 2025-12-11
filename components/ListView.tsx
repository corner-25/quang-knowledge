'use client';

import { KnowledgeEntry, TimelineView } from '@/types';
import { Calendar, MapPin, Edit2, Trash2, Eye } from 'lucide-react';

interface Props {
  entries: KnowledgeEntry[];
  view: TimelineView;
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
  onViewDetail?: (entry: KnowledgeEntry) => void;
}

export default function ListView({ entries, view, onEdit, onDelete, onViewDetail }: Props) {
  const formatDate = (entry: KnowledgeEntry) => {
    let date = '';
    if (entry.day && entry.month) {
      date = `${entry.day}/${entry.month}/`;
    } else if (entry.month) {
      date = `Tháng ${entry.month}/`;
    }
    date += `${entry.year} ${entry.isBc ? 'TCN' : 'CN'}`;
    return date;
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const aYear = a.isBc ? -a.year : a.year;
    const bYear = b.isBc ? -b.year : b.year;
    return bYear - aYear;
  });

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <p className="text-gray-500">Chưa có dữ liệu</p>
      </div>
    );
  }

  if (view === 'calendar') {
    // Group by century
    const grouped: { [key: string]: KnowledgeEntry[] } = {};
    sortedEntries.forEach(entry => {
      const year = entry.isBc ? -entry.year : entry.year;
      const century = Math.floor(year / 100);
      const label = entry.isBc
        ? `Thế kỷ ${Math.abs(century) + 1} TCN`
        : century === 0
        ? 'Thế kỷ 1 CN'
        : `Thế kỷ ${century + 1} CN`;
      if (!grouped[label]) grouped[label] = [];
      grouped[label].push(entry);
    });

    return (
      <div className="space-y-8">
        {Object.entries(grouped).map(([century, entries]) => (
          <div key={century}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{century}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map((entry) => {
                const primaryCategory = entry.categories?.find(c => c.isPrimary)?.category || entry.categories?.[0]?.category;
                return (
                  <div
                    key={entry.id}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition border-t-4"
                    style={{ borderTopColor: primaryCategory?.color || '#3B82F6' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">{formatDate(entry)}</span>
                      {primaryCategory && (
                        <span style={{ color: primaryCategory.color }}>{primaryCategory.icon}</span>
                      )}
                    </div>
                    <h3 className="font-bold mb-2">{entry.title}</h3>
                    {entry.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{entry.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-yellow-500 text-sm">
                        {'★'.repeat(entry.importanceLevel)}
                      </span>
                      <div className="flex gap-1">
                        {onViewDetail && (
                          <button onClick={() => onViewDetail(entry)} className="p-1 hover:bg-purple-50 text-purple-600 rounded" title="Xem chi tiết">
                            <Eye size={14} />
                          </button>
                        )}
                        <button onClick={() => onEdit(entry)} className="p-1 hover:bg-blue-50 text-blue-600 rounded" title="Chỉnh sửa">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => onDelete(entry.id)} className="p-1 hover:bg-red-50 text-red-600 rounded" title="Xóa">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List or Grid view
  const isGrid = view === 'grid';

  return (
    <div className={isGrid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
      {sortedEntries.map((entry) => {
        const primaryCategory = entry.categories?.find(c => c.isPrimary)?.category || entry.categories?.[0]?.category;
        const primaryCountry = entry.countries?.find(c => c.isPrimary)?.country || entry.countries?.[0]?.country;

        return (
          <div
            key={entry.id}
            className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border-l-4"
            style={{ borderLeftColor: primaryCategory?.color || '#3B82F6' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(entry)}
                  </div>
                  {primaryCategory && (
                    <span style={{ color: primaryCategory.color }}>{primaryCategory.icon} {primaryCategory.name}</span>
                  )}
                </div>

                <h3 className="text-lg font-bold mb-2">{entry.title}</h3>

                {entry.description && (
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">{entry.description}</p>
                )}

                {primaryCountry && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <MapPin size={14} />
                    {primaryCountry.name}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-500 text-sm">
                    {'★'.repeat(entry.importanceLevel)}{'☆'.repeat(5 - entry.importanceLevel)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {onViewDetail && (
                  <button onClick={() => onViewDetail(entry)} className="p-2 hover:bg-purple-50 text-purple-600 rounded transition" title="Xem chi tiết">
                    <Eye size={16} />
                  </button>
                )}
                <button onClick={() => onEdit(entry)} className="p-2 hover:bg-blue-50 text-blue-600 rounded transition" title="Chỉnh sửa">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onDelete(entry.id)} className="p-2 hover:bg-red-50 text-red-600 rounded transition" title="Xóa">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
