import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductTable } from './components/ProductTable';
import { useAuth } from '../auth/AuthContext';
import { LogOut } from 'lucide-react';
import './Spreadsheet.css';

export const Dashboard: React.FC = () => {
    const { logout, storeUrl } = useAuth();
    const [page, setPage] = useState(1);
    const { data, isLoading } = useProducts({ page });

    return (
        <div className="container" style={{ maxWidth: '100%', padding: '0' }}>
            <header className="toolbar">
                <div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Bulk Editor</h1>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{storeUrl}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.875rem' }}>
                        Page {page} of {data?.totalPages || 1}
                    </div>
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        style={{ padding: '0.25rem 0.5rem' }}
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setPage((p) => (data?.totalPages && p < data.totalPages ? p + 1 : p))}
                        disabled={!data?.totalPages || page >= data.totalPages}
                        style={{ padding: '0.25rem 0.5rem' }}
                    >
                        Next
                    </button>
                    <button
                        onClick={logout}
                        className="btn-primary"
                        style={{ backgroundColor: 'transparent', color: 'var(--color-error)', border: '1px solid currentColor', width: 'auto' }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </header>

            <div style={{ padding: '1rem' }}>
                <ProductTable data={data?.products || []} isLoading={isLoading} />
            </div>
        </div>
    );
};
