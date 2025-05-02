cat > src/App.jsx << 'EOF'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nhicemwjjprypboovrzn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oaWNlbXdqanByeXBib292cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjk0NDcsImV4cCI6MjA2MTY0NTQ0N30.kHp1W1CKI3Y9dTXK9QzgYH5sAv7URdg2ccVdC-xT75c'
);

export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ domain: '', email: '' });

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setLeads(data);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from('leads').insert([form]);
    if (!error) {
      setForm({ domain: '', email: '' });
      fetchLeads(); // Refresh table
    } else {
      alert('❌ Submission failed!');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">📡 ReconBoard Dashboard</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-8">
        <div className="mb-3">
          <label className="block text-sm font-medium">Domain</label>
          <input
            required
            type="text"
            className="border p-2 w-full rounded"
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Email</label>
          <input
            required
            type="email"
            className="border p-2 w-full rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && leads.length === 0 && <p>No leads found.</p>}

      {leads.length > 0 && (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Domain</th>
              <th className="p-3">Email</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="p-3">{lead.domain}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{new Date(lead.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
EOF
