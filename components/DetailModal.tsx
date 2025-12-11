'use client';

import { X, Calendar, MapPin, Tag, Star, BookOpen, Link2, ArrowRight, Plus } from 'lucide-react';
import { KnowledgeEntry } from '@/types';

interface DetailModalProps {
  entry: KnowledgeEntry;
  onClose: () => void;
  onEdit: () => void;
  onAddRelationship?: () => void;
  relationships?: {
    influences: KnowledgeEntry[];
    buildsUpon: KnowledgeEntry[];
    contradicts: KnowledgeEntry[];
    relatedTo: KnowledgeEntry[];
  };
}

export default function DetailModal({ entry, onClose, onEdit, onAddRelationship, relationships }: DetailModalProps) {
  const formatDate = () => {
    const parts = [];
    if (entry.day) parts.push(entry.day);
    if (entry.month) parts.push(`Tháng ${entry.month}`);
    parts.push(`Năm ${Math.abs(entry.year)}`);
    parts.push(entry.isBc ? 'TCN' : 'CN');
    if (entry.approximateDate) parts.push('(Ước tính)');
    return parts.join(' ');
  };

  const getRelationshipIcon = (type: string) => {
    const icons = {
      influences: '💡',
      buildsUpon: '🏗️',
      contradicts: '⚡',
      relatedTo: '🔗'
    };
    return icons[type as keyof typeof icons] || '🔗';
  };

  const getRelationshipLabel = (type: string) => {
    const labels = {
      influences: 'Ảnh hưởng đến',
      buildsUpon: 'Xây dựng dựa trên',
      contradicts: 'Mâu thuẫn với',
      relatedTo: 'Liên quan đến'
    };
    return labels[type as keyof typeof labels] || 'Liên quan';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-start rounded-t-2xl">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{entry.title}</h2>
            <div className="flex items-center gap-2 text-blue-100">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {entry.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả</h3>
              <p className="text-gray-700 leading-relaxed">{entry.description}</p>
            </div>
          )}

          {/* Content */}
          {entry.content && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Nội dung chi tiết
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </div>
            </div>
          )}

          {/* Categories */}
          {entry.categories && entry.categories.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Môn học</h3>
              <div className="flex flex-wrap gap-3">
                {entry.categories.map((cat) => (
                  <div
                    key={cat.category.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border-2"
                    style={{
                      backgroundColor: `${cat.category.color}15`,
                      borderColor: cat.category.color,
                      color: cat.category.color,
                    }}
                  >
                    <span className="text-lg">{cat.category.icon}</span>
                    <span className="font-medium">{cat.category.name}</span>
                    {cat.isPrimary && (
                      <span className="bg-white px-2 py-0.5 rounded-full text-xs">Chính</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countries */}
          {entry.countries && entry.countries.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Quốc gia
              </h3>
              <div className="flex flex-wrap gap-2">
                {entry.countries.map((country) => (
                  <div
                    key={country.country.id}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg"
                  >
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-gray-900">{country.country.name}</span>
                    {country.country.region && (
                      <span className="text-sm text-gray-500">({country.country.region})</span>
                    )}
                    {country.isPrimary && (
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">Chính</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag.tag.id}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    #{tag.tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Importance Level */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mức độ quan trọng</h3>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= entry.importanceLevel
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">({entry.importanceLevel}/5)</span>
            </div>
          </div>

          {/* Source */}
          {entry.source && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nguồn tham khảo</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900">
                {entry.source}
              </div>
            </div>
          )}

          {/* Relationships */}
          {relationships && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-blue-600" />
                  Mối quan hệ với kiến thức khác
                </h3>
                {onAddRelationship && (
                  <button
                    onClick={onAddRelationship}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm mối quan hệ
                  </button>
                )}
              </div>

              {Object.entries(relationships).map(([type, items]) => {
                if (!items || items.length === 0) return null;
                return (
                  <div key={type} className="space-y-2">
                    <h4 className="text-md font-medium text-gray-700 flex items-center gap-2">
                      <span>{getRelationshipIcon(type)}</span>
                      <span>{getRelationshipLabel(type)}</span>
                    </h4>
                    <div className="space-y-2 ml-8">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <ArrowRight className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{item.title}</h5>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {Math.abs(item.year)} {item.isBc ? 'TCN' : 'CN'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {Object.values(relationships).every((arr) => !arr || arr.length === 0) && (
                <p className="text-gray-500 italic text-center py-4">
                  Chưa có mối quan hệ nào được thiết lập
                </p>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Ngày tạo:</span>{' '}
                {new Date(entry.createdAt).toLocaleDateString('vi-VN')}
              </div>
              <div>
                <span className="font-medium">Cập nhật:</span>{' '}
                {new Date(entry.updatedAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
