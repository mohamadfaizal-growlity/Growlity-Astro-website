import React, { useState, useEffect } from 'react';
import { RefreshCcw, Check, Trash2, ShieldAlert } from 'lucide-react';

export default function CommentsView() {
  const [activeTab, setActiveTab] = useState('All');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { name: 'All', id: 'All' },
    { name: 'Pending', id: 'Pending' },
    { name: 'Approved', id: 'Approved' },
    { name: 'Spam', id: 'Spam' },
    { name: 'Trash', id: 'Trash' }
  ];

  const fetchComments = async (status?: string) => {
    setLoading(true);
    try {
      const url = status && status !== 'All' 
        ? `/api/comments?status=${status}` 
        : `/api/comments`;
      const res = await fetch(url);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments(activeTab);
  }, [activeTab]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch('/api/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      fetchComments(activeTab);
    } catch(e) {
      console.error(e);
    }
  };

  const permanentlyDelete = async (id: string) => {
    try {
      await fetch('/api/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchComments(activeTab);
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-normal text-gray-800">Comments</h1>
      </div>

      <div className="flex space-x-4 mb-4 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id ? 'text-black font-semibold' : 'text-blue-600 hover:text-blue-800'} cursor-pointer`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-300 shadow-sm rounded-sm">
        <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50">
          <select className="border border-gray-300 rounded px-2 py-1 text-sm mr-2 cursor-pointer">
            <option>Bulk actions</option>
            <option>Approve</option>
            <option>Unapprove</option>
            <option>Mark as Spam</option>
            <option>Move to Trash</option>
          </select>
          <button className="border border-gray-300 px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">Apply</button>
        </div>

        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50">
              <th className="p-3 w-8"><input type="checkbox" className="cursor-pointer" /></th>
              <th className="p-3 font-semibold text-gray-700">Author</th>
              <th className="p-3 font-semibold text-gray-700 w-1/2">Comment</th>
              <th className="p-3 font-semibold text-gray-700">In response to</th>
              <th className="p-3 font-semibold text-gray-700">Submitted on</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-500">Loading...</td></tr>
            ) : comments.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-500">No comments found.</td></tr>
            ) : (
              comments.map((comment) => (
                <tr key={comment.id} className={`border-b border-gray-200 hover:bg-gray-50 group ${comment.status === 'Pending' ? 'bg-yellow-50' : ''}`}>
                  <td className="p-3"><input type="checkbox" className="cursor-pointer" /></td>
                  <td className="p-3 align-top">
                    <div className="font-semibold text-gray-800">{comment.author_name}</div>
                    <div className="text-blue-600 text-xs hover:underline cursor-pointer">{comment.author_email}</div>
                  </td>
                  <td className="p-3 align-top">
                    <div className="text-gray-700 mb-2">{comment.content}</div>
                    <div className="flex items-center space-x-3 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {comment.status !== 'Approved' && <button onClick={() => updateStatus(comment.id, 'Approved')} className="text-green-600 hover:underline cursor-pointer">Approve</button>}
                      {comment.status === 'Approved' && <button onClick={() => updateStatus(comment.id, 'Pending')} className="text-orange-600 hover:underline cursor-pointer">Unapprove</button>}
                      <button className="hover:underline cursor-pointer">Reply</button>
                      <button className="hover:underline cursor-pointer">Edit</button>
                      {comment.status !== 'Spam' && <button onClick={() => updateStatus(comment.id, 'Spam')} className="text-red-600 hover:underline cursor-pointer">Spam</button>}
                      {comment.status !== 'Trash' && <button onClick={() => updateStatus(comment.id, 'Trash')} className="text-red-600 hover:underline cursor-pointer">Trash</button>}
                      {comment.status === 'Trash' && <button onClick={() => permanentlyDelete(comment.id)} className="text-red-700 font-bold hover:underline cursor-pointer">Delete Permanently</button>}
                    </div>
                  </td>
                  <td className="p-3 align-top text-blue-600 hover:underline cursor-pointer">{comment.post_slug}</td>
                  <td className="p-3 align-top text-gray-500 text-xs">
                    {new Date(comment.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
