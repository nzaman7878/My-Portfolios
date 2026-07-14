import { useMessages, useDeleteMessage } from '../../hooks/useContact';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { data: messages = [], isLoading } = useMessages();
  const deleteMessageMutation = useDeleteMessage();

  const deleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessageMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-[var(--color-secondary-text)]">Loading messages...</div>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-serif font-bold border-b border-[var(--color-border-custom)] pb-4">Messages Dashboard</h2>
      <div className="flex flex-col gap-4">
        {messages.length === 0 ? <p className="text-[var(--color-secondary-text)]">No messages yet.</p> : messages.map((msg) => (
          <div key={msg._id} className="bg-[var(--color-surface)] border-thin p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-[var(--color-accent)]">{msg.email}</a>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-[var(--color-secondary-text)]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                <button 
                  onClick={() => deleteMessage(msg._id)} 
                  className="px-3 py-1 text-xs bg-red-900/20 text-red-400 border border-red-900/50 rounded hover:bg-red-900/50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-[var(--color-secondary-text)] whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
