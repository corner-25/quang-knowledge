'use client';

import { useState, useEffect } from 'react';
import { KnowledgeEntry } from '@/types';
import { X, Search, Calendar, Link2 } from 'lucide-react';

interface RelationshipFormProps {
  sourceEntry: KnowledgeEntry;
  onClose: () => void;
  onSave: () => void;
}

const RELATIONSHIP_TYPES = [
  {
    value: 'influences',
    label: 'Ảnh hưởng đến',
    icon: '💡',
    description: 'Kiến thức này có ảnh hưởng đến kiến thức khác',
    color: 'blue',
  },
  {
    value: 'builds_upon',
    label: 'Xây dựng dựa trên',
    icon: '🏗️',
    description: 'Kiến thức này được xây dựng dựa trên kiến thức khác',
    color: 'green',
  },
  {
    value: 'contradicts',
    label: 'Mâu thuẫn với',
    icon: '⚡',
    description: 'Kiến thức này mâu thuẫn hoặc phản bác kiến thức khác',
    color: 'red',
  },
  {
    value: 'related_to',
    label: 'Liên quan đến',
    icon: '🔗',
    description: 'Kiến thức này có liên quan chung với kiến thức khác',
    color: 'purple',
  },
];

export default function RelationshipForm({ sourceEntry, onClose, onSave }: RelationshipFormProps) {
  const [allEntries, setAllEntries] = useState<KnowledgeEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<KnowledgeEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null);
  const [relationshipType, setRelationshipType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allEntries.filter(
        (entry) =>
          entry.id !== sourceEntry.id &&
          (entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(allEntries.filter((e) => e.id !== sourceEntry.id));
    }
  }, [searchTerm, allEntries, sourceEntry.id]);

  const loadEntries = async () => {
    try {
      const res = await fetch('/api/knowledge');
      const data = await res.json();
      setAllEntries(data.data);
      setFilteredEntries(data.data.filter((e: KnowledgeEntry) => e.id !== sourceEntry.id));
    } catch (error) {
      console.error('Error loading entries:', error);
      setError('Không thể tải danh sách kiến thức');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEntry || !relationshipType) {
      setError('Vui lòng chọn kiến thức và loại mối quan hệ');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/relationships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: sourceEntry.id,
          targetId: selectedEntry.id,
          relationshipType,
          description: description.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể tạo mối quan hệ');
      }

      onSave();
    } catch (error: any) {
      setError(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (entry: KnowledgeEntry) => {
    return `${Math.abs(entry.year)} ${entry.isBc ? 'TCN' : 'CN'}`;
  };

  const selectedType = RELATIONSHIP_TYPES.find((t) => t.value === relationshipType);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Link2 className="w-6 h-6" />
                Thêm mối quan hệ
              </h2>
              <p className="text-purple-100 text-sm">
                Từ: <span className="font-semibold">{sourceEntry.title}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Relationship Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Loại mối quan hệ <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {RELATIONSHIP_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setRelationshipType(type.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    relationshipType === type.value
                      ? `border-${type.color}-500 bg-${type.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{type.label}</h3>
                      <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                    </div>
                    {relationshipType === type.value && (
                      <div className={`w-5 h-5 rounded-full bg-${type.color}-500 flex items-center justify-center`}>
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Select Target Entry */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Chọn kiến thức {selectedType && `"${selectedType.label.toLowerCase()}"`}{' '}
              <span className="text-red-500">*</span>
            </label>

            {/* Search Box */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm kiến thức..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Selected Entry Display */}
            {selectedEntry && (
              <div className="mb-3 p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{selectedEntry.title}</h4>
                    {selectedEntry.description && (
                      <p className="text-sm text-gray-600 mt-1">{selectedEntry.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(selectedEntry)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(null)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Entries List */}
            {!selectedEntry && (
              <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                {filteredEntries.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Không tìm thấy kiến thức nào
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredEntries.slice(0, 50).map((entry) => (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => setSelectedEntry(entry)}
                        className="w-full p-3 hover:bg-gray-50 text-left transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 text-sm">{entry.title}</h4>
                        {entry.description && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                            {entry.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(entry)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Ghi chú về mối quan hệ (tùy chọn)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Ví dụ: Newton đã phát triển định luật vạn vật hấp dẫn dựa trên các quan sát của Kepler..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || !selectedEntry || !relationshipType}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Đang lưu...' : 'Tạo mối quan hệ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
