'use client';

import { useState, useEffect } from 'react';
import { KnowledgeEntry, Category, Country } from '@/types';
import { X, Save } from 'lucide-react';

interface Props {
  entry?: KnowledgeEntry;
  categories: Category[];
  countries: Country[];
  onSave: (entry: KnowledgeEntry) => void;
  onCancel: () => void;
}

export default function KnowledgeForm({ entry, categories, countries, onSave, onCancel }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: entry?.title || '',
    description: entry?.description || '',
    content: entry?.content || '',
    year: entry?.year || new Date().getFullYear(),
    month: entry?.month || '',
    day: entry?.day || '',
    isBc: entry?.isBc || false,
    approximateDate: entry?.approximateDate || false,
    importanceLevel: entry?.importanceLevel || 3,
    source: entry?.source || '',
    selectedCategories: entry?.categories?.map(c => ({ id: c.category.id, isPrimary: c.isPrimary })) || [],
    selectedCountries: entry?.countries?.map(c => ({ id: c.country.id, isPrimary: c.isPrimary })) || [],
    tags: entry?.tags?.map(t => t.tag.name).join(', ') || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        categories: formData.selectedCategories,
        countries: formData.selectedCountries,
        tags: formData.tags.split(',').map(t => ({ name: t.trim() })).filter(t => t.name),
      };

      const url = entry ? `/api/knowledge/${entry.id}` : '/api/knowledge';
      const method = entry ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        onSave(result.data);
      } else {
        alert('Có lỗi xảy ra: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Có lỗi xảy ra khi lưu kiến thức');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    const exists = formData.selectedCategories.find(c => c.id === categoryId);
    if (exists) {
      setFormData({
        ...formData,
        selectedCategories: formData.selectedCategories.filter(c => c.id !== categoryId),
      });
    } else {
      setFormData({
        ...formData,
        selectedCategories: [...formData.selectedCategories, { id: categoryId, isPrimary: false }],
      });
    }
  };

  const toggleCountry = (countryId: string) => {
    const exists = formData.selectedCountries.find(c => c.id === countryId);
    if (exists) {
      setFormData({
        ...formData,
        selectedCountries: formData.selectedCountries.filter(c => c.id !== countryId),
      });
    } else {
      setFormData({
        ...formData,
        selectedCountries: [...formData.selectedCountries, { id: countryId, isPrimary: false }],
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{entry ? 'Chỉnh sửa kiến thức' : 'Thêm kiến thức mới'}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="VD: Định lý Pythagoras"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mô tả ngắn gọn..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nội dung chi tiết..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Năm *</label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tháng</label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBc}
                onChange={(e) => setFormData({ ...formData, isBc: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Trước Công Nguyên (BC)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.approximateDate}
                onChange={(e) => setFormData({ ...formData, approximateDate: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Ngày tháng ước tính</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Độ quan trọng: {formData.importanceLevel}/5</label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.importanceLevel}
              onChange={(e) => setFormData({ ...formData, importanceLevel: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Môn học</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={!!formData.selectedCategories.find(c => c.id === cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-4 h-4"
                  />
                  <span style={{ color: cat.color }}>{cat.icon} {cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quốc gia</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {countries.map((country) => (
                <label key={country.id} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={!!formData.selectedCountries.find(c => c.id === country.id)}
                    onChange={() => toggleCountry(country.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{country.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (phân cách bằng dấu phẩy)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="VD: toán học cổ đại, hình học"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nguồn tham khảo</label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nguồn sách, website..."
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
