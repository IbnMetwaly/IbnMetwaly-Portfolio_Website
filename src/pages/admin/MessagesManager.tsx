import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase';
import {
    Mail,
    Trash2,
    Loader2,
    Search,
    AlertCircle,
    CheckCircle2,
    Clock,
    User,
    ChevronRight,
    MessageSquare
} from 'lucide-react';

type Submission = Database['public']['Tables']['contact_submissions']['Row'];

export default function MessagesManager() {
    const [messages, setMessages] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Submission | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    async function fetchMessages() {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError('Failed to fetch messages');
            console.error(error);
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    }

    const handleStatusUpdate = async (id: string, status: string) => {
        const { error } = await supabase
            .from('contact_submissions')
            .update({ status })
            .eq('id', id);

        if (error) {
            setError('Failed to update status');
        } else {
            if (selectedMessage?.id === id) {
                setSelectedMessage({ ...selectedMessage, status });
            }
            fetchMessages();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id);

        if (error) {
            setError('Failed to delete message');
        } else {
            if (selectedMessage?.id === id) setSelectedMessage(null);
            fetchMessages();
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-xl font-latin h-[calc(100vh-10rem)]">
            <div className="flex flex-col md:flex-row gap-lg h-full">
                {/* Message List */}
                <div className="w-full md:w-1/3 bg-white dark:bg-background-dark-surface rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden shadow-sm">
                    <div className="p-md border-b border-neutral-100 dark:border-neutral-800">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md text-small outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                        {loading && messages.length === 0 ? (
                            <div className="p-xl text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary-500" /></div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="p-xl text-center text-neutral-500 italic">No messages found.</div>
                        ) : (
                            filteredMessages.map((msg) => (
                                <button
                                    key={msg.id}
                                    onClick={() => setSelectedMessage(msg)}
                                    className={`w-full p-lg text-left transition-colors hover:bg-neutral-50 dark:hover:bg-primary-900/5 ${selectedMessage?.id === msg.id ? 'bg-primary-50 dark:bg-primary-900/10 border-r-4 border-primary-500' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-xs">
                                        <div className="font-bold text-neutral-900 dark:text-neutral-100 truncate">{msg.name}</div>
                                        {msg.status === 'unread' && (
                                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                                        )}
                                    </div>
                                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium truncate mb-1">{msg.subject}</div>
                                    <div className="text-[10px] text-neutral-400">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="hidden md:flex flex-1 bg-white dark:bg-background-dark-surface rounded-xl border border-neutral-200 dark:border-neutral-800 flex-col overflow-hidden shadow-sm">
                    {selectedMessage ? (
                        <div className="flex flex-col h-full">
                            <div className="p-xl border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-h3 font-bold text-neutral-900 dark:text-neutral-100">{selectedMessage.name}</h2>
                                        <p className="text-small text-neutral-500">{selectedMessage.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={selectedMessage.status || 'unread'}
                                        onChange={(e) => handleStatusUpdate(selectedMessage.id, e.target.value)}
                                        className="text-xs px-3 py-1.5 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md font-bold"
                                        title="Change Status"
                                    >
                                        <option value="unread">Unread</option>
                                        <option value="read">Read</option>
                                        <option value="replied">Replied</option>
                                    </select>
                                    <button
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-xl flex-1 overflow-y-auto">
                                <div className="mb-lg">
                                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Subject</span>
                                    <p className="text-body font-bold text-neutral-900 dark:text-neutral-100">{selectedMessage.subject}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Message</span>
                                    <div className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg border border-neutral-100 dark:border-neutral-800 text-body text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>

                            <div className="p-lg bg-neutral-50 dark:bg-background-dark-elevated border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                                    className="px-6 py-2 bg-primary-600 text-white rounded-md font-bold hover:bg-primary-700 font-latin flex items-center space-x-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>Reply via Email</span>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 p-xl text-center">
                            <div className="w-20 h-20 bg-neutral-50 dark:bg-background-dark-elevated rounded-full flex items-center justify-center mb-md">
                                <MessageSquare className="w-10 h-10 opacity-20" />
                            </div>
                            <p className="text-body font-medium">Select a message to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
