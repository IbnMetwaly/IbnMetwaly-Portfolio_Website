import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import DataTable from '../components/DataTable';
import { Plus } from 'lucide-react';

export default function Qualifications() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from('qualifications').select('*').order('year', { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (currentItem?.id) {
      await supabase.from('qualifications').update(data).eq('id', currentItem.id);
    } else {
      await supabase.from('qualifications').insert([data]);
    }
    setIsEditing(false);
    setCurrentItem(null);
    fetchData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-xl">
        <h1 className="text-h2 font-bold">Qualifications</h1>
        <button
          onClick={() => { setCurrentItem(null); setIsEditing(true); }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-md py-sm rounded-md hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Qualification</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white dark:bg-background-dark-elevated p-xl rounded-xl shadow-sm max-w-2xl">
          <form onSubmit={handleSave} className="space-y-lg">
            <div>
              <label className="block text-small font-medium mb-xs">Title</label>
              <input name="title" defaultValue={currentItem?.title} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" required />
            </div>
            <div>
              <label className="block text-small font-medium mb-xs">Organization</label>
              <input name="organization" defaultValue={currentItem?.organization} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" />
            </div>
            <div>
              <label className="block text-small font-medium mb-xs">Year</label>
              <input name="year" defaultValue={currentItem?.year} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" />
            </div>
             <div>
              <label className="block text-small font-medium mb-xs">Type</label>
              <select name="type" defaultValue={currentItem?.type || 'certification'} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent">
                <option value="license">License</option>
                <option value="certification">Certification</option>
                <option value="pd">Professional Development</option>
              </select>
            </div>
            <div>
              <label className="block text-small font-medium mb-xs">Digital Copy URL</label>
              <input name="file_url" defaultValue={currentItem?.file_url} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" />
            </div>
            <div className="flex justify-end space-x-md">
              <button type="button" onClick={() => setIsEditing(false)} className="px-md py-sm text-neutral-600 hover:bg-neutral-100 rounded">Cancel</button>
              <button type="submit" className="px-md py-sm bg-primary-600 text-white rounded hover:bg-primary-700">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <DataTable
          columns={[
            { header: 'Title', accessor: 'title' },
            { header: 'Org', accessor: 'organization' },
            { header: 'Year', accessor: 'year' },
            { header: 'Type', accessor: 'type' }
          ]}
          data={items}
          onEdit={(item) => { setCurrentItem(item); setIsEditing(true); }}
          onDelete={async (id) => { if(window.confirm('Delete?')) { await supabase.from('qualifications').delete().eq('id', id); fetchData(); } }}
        />
      )}
    </div>
  );
}
