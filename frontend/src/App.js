import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function App() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalEvents: 0, eventsByCategory: [] });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    date: format(new Date(), 'yyyy-MM-dd')
  });
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchEvents();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      
      const response = await axios.get(`${API_URL}/events?${params}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/events`, formData);
      setFormData({
        title: '',
        description: '',
        category: 'general',
        date: format(new Date(), 'yyyy-MM-dd')
      });
      setShowForm(false);
      fetchEvents();
      fetchStats();
    } catch (error) {
      console.error('Error al crear evento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await axios.delete(`${API_URL}/events/${id}`);
        fetchEvents();
        fetchStats();
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    }
  };

  const categories = ['general', 'trabajo', 'personal', 'urgente', 'información'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Bitácora de Eventos</h1>
          <p className="text-gray-600">Registra y gestiona tus eventos importantes</p>
        </header>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">Total de Eventos</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalEvents}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">Categorías</h3>
            <div className="mt-2">
              {stats.eventsByCategory.map((cat, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="capitalize">{cat._id}</span>
                  <span className="font-semibold">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">Acciones</h3>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="btn-primary w-full"
            >
              {showForm ? 'Cancelar' : 'Nuevo Evento'}
            </button>
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Crear Nuevo Evento</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <select
                    className="input-field"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar Evento'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Buscar</label>
              <input
                type="text"
                className="input-field"
                placeholder="Buscar en título o descripción..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div>
              <label className="form-label">Categoría</label>
              <select
                className="input-field"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Eventos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Eventos Registrados</h2>
          {events.length === 0 ? (
            <div className="card text-center text-gray-500">
              No hay eventos registrados. ¡Crea tu primer evento!
            </div>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <div key={event._id} className="card">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-500">
                        <span className="capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {event.category}
                        </span>
                        <span>
                          {format(new Date(event.date), 'dd/MM/yyyy', { locale: es })}
                        </span>
                        <span>
                          Creado: {format(new Date(event.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn-danger ml-4"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
