import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import DataTable from '../components/DataTable';
import { Plus } from 'lucide-react';

export default function Gallery() {
  const [items, setItems] = useState<any[]>([]);
  const [workplaces, setWorkplaces] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const fetchData = async () => {
    const { data: media } = await supabase.from('media').select('*, events(name, workplaces(name))');
    const { data: wp } = await supabase.from('workplaces').select('*');
    const { data: ev } = await supabase.from('events').select('*, workplaces(name)');

    if (media) setItems(media);
    if (wp) setWorkplaces(wp);
    if (ev) setEvents(ev);
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
      await supabase.from('media').update(data).eq('id', currentItem.id);
    } else {
      await supabase.from('media').insert([data]);
    }
    setIsEditing(false);
    setCurrentItem(null);
    fetchData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-xl">
        <h1 className="text-h2 font-bold">Media Gallery</h1>
        <button
          onClick={() => { setCurrentItem(null); setIsEditing(true); }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-md py-sm rounded-md hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Media</span>
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
              <label className="block text-small font-medium mb-xs">Event</label>
              <select name="event_id" defaultValue={currentItem?.event_id} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent">
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>{ev.workplaces?.name} - {ev.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-small font-medium mb-xs">Media URL</label>
              <input name="url" defaultValue={currentItem?.url} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent" required />
            </div>
            <div>
              <label className="block text-small font-medium mb-xs">Type</label>
              <select name="type" defaultValue={currentItem?.type || 'image'} className="w-full p-sm rounded border dark:border-neutral-700 bg-transparent">
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="flex justify-end space-x-md">
              <button type="button" onClick={() => setIsEditing(false)} className="px-md py-sm text-neutral-600 hover:bg-neutral-100 rounded">Cancel</button>
              <button type="submit" className="px-md py-sm bg-primary-600 text-white rounded hover:bg-primary-700">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-xl">
           <DataTable
            columns={[
              { header: 'Title', accessor: 'title' },
              { header: 'Type', accessor: 'type' },
              { header: 'URL', accessor: 'url' }
            ]}
            data={items}
            onEdit={(item) => { setCurrentItem(item); setIsEditing(true); }}
            onDelete={async (id) => { if(window.confirm('Delete?')) { await supabase.from('media').delete().eq('id', id); fetchData(); } }}
          />
        </div>
      )}
    </div>
  );
}
