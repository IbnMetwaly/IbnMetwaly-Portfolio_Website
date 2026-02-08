import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import DataTable from '../components/DataTable';
import { Plus } from 'lucide-react';

export default function Timeline() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const fetchData = async () => {
    const { data, error } = await supabase.from('milestones').select('*').order('date', { ascending: false });
    if (!error) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await supabase.from('milestones').delete().eq('id', id);
      fetchData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());

    // Convert achievements string back to array
    if (data.achievements) {
        data.achievements = (data.achievements as string).split('\n').filter(a => a.trim());
    }

    if (currentItem?.id) {
      await supabase.from('milestones').update(data).eq('id', currentItem.id);
    } else {
      await supabase.from('milestones').insert([data]);
    }
    setIsEditing(false);
    setCurrentItem(null);
    fetchData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-xl">
        <h1 className="text-h2 font-bold">Timeline Milestones</h1>
        <button
          onClick={() => { setCurrentItem(null); setIsEditing(true); }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-md py-sm rounded-md hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Milestone</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white dark:bg-background-dark-elevated p-xl rounded-xl shadow-sm max-w-2xl">
          <form onSubmit={handleSave} className="space-y-lg">
            <div className="grid grid-cols-2 gap-md">
              <div>
                <label className="block text-small font-medium mb-xs">Title</label>
                <input name="title" defaultValue={currentItem?.title} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" required />
              </div>
              <div>
                <label className="block text-small font-medium mb-xs">Organization</label>
                <input name="organization" defaultValue={currentItem?.organization} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <div>
                <label className="block text-small font-medium mb-xs">Period (e.g. 2021-2024)</label>
                <input name="period" defaultValue={currentItem?.period} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" required />
              </div>
              <div>
                <label className="block text-small font-medium mb-xs">Exact Date (for sorting)</label>
                <input type="date" name="date" defaultValue={currentItem?.date} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" />
              </div>
            </div>
            <div>
                <label className="block text-small font-medium mb-xs">Description</label>
                <textarea name="description" defaultValue={currentItem?.description} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" rows={3} />
            </div>
            <div>
                <label className="block text-small font-medium mb-xs">Achievements (one per line)</label>
                <textarea name="achievements" defaultValue={currentItem?.achievements?.join('\n')} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" rows={5} />
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
            { header: 'Period', accessor: 'period' },
            { header: 'Achievements', accessor: 'achievements' }
          ]}
          data={items}
          onEdit={(item) => { setCurrentItem(item); setIsEditing(true); }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
