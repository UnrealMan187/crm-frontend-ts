import { defineStore } from 'pinia';
import type { Lead, LeadStatus, LeadCategory } from '../types/lead';
import { seedLeads } from '../data/leads.mock';

function toCSV(rows: Record<string, any>[]) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => {
    if (v == null) return '';
    const s = String(v).replace(/"/g, '""');
    return /[",\n;]/.test(s) ? `"${s}"` : s;
  };
  const lines = [
    headers.join(';'),
    ...rows.map(r => headers.map(h => escape(r[h])).join(';'))
  ];
  return lines.join('\n');
}

export const useLeadsStore = defineStore('leads', {
  state: () => ({
    leads: [...seedLeads] as Lead[],
  }),
  getters: {
    byStatus: (s) => (status: LeadStatus) => s.leads.filter(l => l.status === status),
  },
  actions: {
    addLead(input: Omit<Lead, 'id'|'createdAt'>) {
      const id = Math.random().toString(36).slice(2,10);
      const createdAt = new Date().toISOString();
      this.leads.unshift({ id, createdAt, ...input });
    },
    updateStatus(id: string, status: LeadStatus) {
      const idx = this.leads.findIndex(l => l.id === id);
      if (idx >= 0) this.leads[idx].status = status;
    },
    remove(id: string) {
      this.leads = this.leads.filter(l => l.id !== id);
    },
    exportCSV() {
      const csv = toCSV(this.leads);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads_${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
});
