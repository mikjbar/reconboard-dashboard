import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhicemwjjprypboovrzn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oaWNlbXdqanByeXBib292cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjk0NDcsImV4cCI6MjA2MTY0NTQ0N30.kHp1W1CKI3Y9dTXK9QzgYH5sAv7URdg2ccVdC-xT75c';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data);
    } catch (err) {
      setError(err.message || 'Error loading leads');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">📡 ReconBoard Submissions</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {!loading && !error && (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Domain</th>
              <th className="p-3">Email</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="border-t">
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
}import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhicemwjjprypboovrzn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oaWNlbXdqanByeXBib292cnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNjk0NDcsImV4cCI6MjA2MTY0NTQ0N30.kHp1W1CKI3Y9dTXK9QzgYH5sAv7URdg2ccVdC-xT75c'; // Replace this!
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data);
    } catch (err) {
      setError(err.message || 'Error loading leads');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">📡 ReconBoard Submissions</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {!loading && !error && (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Domain</th>
              <th className="p-3">Email</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="border-t">
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
}import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
