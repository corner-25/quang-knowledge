'use client';

import { KnowledgeEntry } from '@/types';
import { Calendar, MapPin, BookOpen, Edit2, Trash2, Eye } from 'lucide-react';

interface Props {
  entries: KnowledgeEntry[];
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
  onViewDetail?: (entry: KnowledgeEntry) => void;
}

export default function TimelineComponent({ entries, onEdit, onDelete, onViewDetail }: Props) {
  const sortedEntries = [...entries].sort((a, b) => {
    const aYear = a.isBc ? -a.year : a.year;
    const bYear = b.isBc ? -b.year : b.year;
    return bYear - aYear;
  });

  const formatDate = (entry: KnowledgeEntry) => {
    let date = '';
    if (entry.day && entry.month) {
      date = `${entry.day}/${entry.month}/`;
    } else if (entry.month) {
      date = `Tháng ${entry.month}/`;
    }
    date += `${entry.year} ${entry.isBc ? 'TCN' : 'CN'}`;
    if (entry.approximateDate) date += ' (≈)';
    return date;
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <p className="text-gray-500">Chưa có dữ liệu. Hãy thêm kiến thức mới!</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

      <div className="space-y-6">
        {sortedEntries.map((entry, index) => {
          const primaryCategory = entry.categories?.find(c => c.isPrimary)?.category || entry.categories?.[0]?.category;
          const primaryCountry = entry.countries?.find(c => c.isPrimary)?.country || entry.countries?.[0]?.country;

          return (
            <div key={entry.id} className="relative pl-20">
              {/* Timeline Dot */}
              <div
                className="absolute left-5 w-6 h-6 rounded-full border-4 border-white shadow-lg"
                style={{
                  backgroundColor: primaryCategory?.color || '#3B82F6',
                  transform: 'translateX(-50%)',
                }}
              ></div>

              {/* Card */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition border-l-4" style={{ borderLeftColor: primaryCategory?.color || '#3B82F6' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {formatDate(entry)}
                      </div>
                      {primaryCategory && (
                        <div className="flex items-center gap-1" style={{ color: primaryCategory.color }}>
                          <span>{primaryCategory.icon}</span>
                          <span>{primaryCategory.name}</span>
                        </div>
                      )}
                      {primaryCountry && (
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {primaryCountry.name}
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{entry.title}</h3>

                    {entry.description && (
                      <p className="text-gray-700 mb-3">{entry.description}</p>
                    )}

                    {entry.content && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{entry.content}</p>
                    )}

                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {entry.tags.map((t) => (
                          <span key={t.tagId} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {t.tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-yellow-500">
                        {'★'.repeat(entry.importanceLevel)}{'☆'.repeat(5 - entry.importanceLevel)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {onViewDetail && (
                      <button
                        onClick={() => onViewDetail(entry)}
                        className="p-2 hover:bg-purple-50 text-purple-600 rounded-lg transition"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(entry)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
