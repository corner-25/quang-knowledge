'use client';

import { useState, useEffect } from 'react';
import { KnowledgeEntry, Category, Country, TimelineView } from '@/types';
import KnowledgeForm from '@/components/KnowledgeForm';
import TimelineComponent from '@/components/TimelineComponent';
import EnhancedTimelineView from '@/components/EnhancedTimelineView';
import ListView from '@/components/ListView';
import DetailModal from '@/components/DetailModal';
import RelationshipForm from '@/components/RelationshipForm';
import { Plus, Filter, Search, Clock, List, Grid, Calendar } from 'lucide-react';

export default function Home() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<TimelineView>('timeline');
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | undefined>();
  const [viewingEntry, setViewingEntry] = useState<KnowledgeEntry | undefined>();
  const [relationships, setRelationships] = useState<any>(null);
  const [showRelationshipForm, setShowRelationshipForm] = useState(false);
  const [relationshipSourceEntry, setRelationshipSourceEntry] = useState<KnowledgeEntry | undefined>();

  const [filters, setFilters] = useState({
    categoryId: '',
    countryId: '',
    yearFrom: '',
    yearTo: '',
    search: ''
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadKnowledge();
  }, [filters]);

  const loadInitialData = async () => {
    try {
      const [categoriesRes, countriesRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/countries')
      ]);

      const categoriesData = await categoriesRes.json();
      const countriesData = await countriesRes.json();

      setCategories(categoriesData.data);
      setCountries(countriesData.data);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadKnowledge = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.countryId) params.append('countryId', filters.countryId);
      if (filters.yearFrom) params.append('yearFrom', filters.yearFrom);
      if (filters.yearTo) params.append('yearTo', filters.yearTo);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/knowledge?${params}`);
      const data = await response.json();
      setEntries(data.data || []);
    } catch (error) {
      console.error('Error loading knowledge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEntry = async (entry: KnowledgeEntry) => {
    await loadKnowledge();
    setShowForm(false);
    setEditingEntry(undefined);
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa kiến thức này?')) return;

    try {
      await fetch(`/api/knowledge/${id}`, { method: 'DELETE' });
      await loadKnowledge();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Có lỗi xảy ra khi xóa kiến thức');
    }
  };

  const clearFilters = () => {
    setFilters({
      categoryId: '',
      countryId: '',
      yearFrom: '',
      yearTo: '',
      search: ''
    });
  };

  const handleViewDetail = async (entry: KnowledgeEntry) => {
    setViewingEntry(entry);
    try {
      const res = await fetch(`/api/knowledge/${entry.id}/relationships`);
      const data = await res.json();
      setRelationships(data);
    } catch (error) {
      console.error('Error fetching relationships:', error);
      setRelationships(null);
    }
  };

  const handleCloseDetail = () => {
    setViewingEntry(undefined);
    setRelationships(null);
  };

  const handleEditFromDetail = () => {
    if (viewingEntry) {
      setEditingEntry(viewingEntry);
      setShowForm(true);
      setViewingEntry(undefined);
      setRelationships(null);
    }
  };

  const handleAddRelationship = () => {
    if (viewingEntry) {
      setRelationshipSourceEntry(viewingEntry);
      setShowRelationshipForm(true);
    }
  };

  const handleCloseRelationshipForm = () => {
    setShowRelationshipForm(false);
    setRelationshipSourceEntry(undefined);
  };

  const handleSaveRelationship = async () => {
    setShowRelationshipForm(false);
    setRelationshipSourceEntry(undefined);
    // Reload relationships if we're still viewing the same entry
    if (viewingEntry) {
      try {
        const res = await fetch(`/api/knowledge/${viewingEntry.id}/relationships`);
        const data = await res.json();
        setRelationships(data);
      } catch (error) {
        console.error('Error reloading relationships:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                📚 Knowledge Timeline
              </h1>
              <p className="text-sm text-slate-600 mt-1 font-medium">Tổng hợp kiến thức khoa học qua các thời đại</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <Filter size={18} />
                <span className="hidden sm:inline">Lọc</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Thêm kiến thức</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Tìm theo tiêu đề..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tất cả môn học</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quốc gia</label>
                <select
                  value={filters.countryId}
                  onChange={(e) => setFilters({ ...filters, countryId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tất cả quốc gia</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Selector */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedView('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedView === 'timeline'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Clock size={18} />
              Timeline
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedView === 'list'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <List size={18} />
              Danh sách
            </button>
            <button
              onClick={() => setSelectedView('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedView === 'grid'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Grid size={18} />
              Lưới
            </button>
            <button
              onClick={() => setSelectedView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedView === 'calendar'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Calendar size={18} />
              Theo thế kỷ
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {entries.length}
            </div>
            <div className="text-gray-600 mt-1">Kiến thức</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {categories.length}
            </div>
            <div className="text-gray-600 mt-1">Môn học</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {countries.length}
            </div>
            <div className="text-gray-600 mt-1">Quốc gia</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : selectedView === 'timeline' ? (
          <EnhancedTimelineView
            entries={entries}
            onEdit={(entry) => {
              setEditingEntry(entry);
              setShowForm(true);
            }}
            onDelete={handleDeleteEntry}
            onViewDetail={handleViewDetail}
          />
        ) : (
          <ListView
            entries={entries}
            view={selectedView}
            onEdit={(entry) => {
              setEditingEntry(entry);
              setShowForm(true);
            }}
            onDelete={handleDeleteEntry}
            onViewDetail={handleViewDetail}
          />
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <KnowledgeForm
          entry={editingEntry}
          categories={categories}
          countries={countries}
          onSave={handleSaveEntry}
          onCancel={() => {
            setShowForm(false);
            setEditingEntry(undefined);
          }}
        />
      )}

      {/* Detail Modal */}
      {viewingEntry && (
        <DetailModal
          entry={viewingEntry}
          onClose={handleCloseDetail}
          onEdit={handleEditFromDetail}
          onAddRelationship={handleAddRelationship}
          relationships={relationships}
        />
      )}

      {/* Relationship Form */}
      {showRelationshipForm && relationshipSourceEntry && (
        <RelationshipForm
          sourceEntry={relationshipSourceEntry}
          onClose={handleCloseRelationshipForm}
          onSave={handleSaveRelationship}
        />
      )}
    </div>
  );
}
