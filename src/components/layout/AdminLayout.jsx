import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/Sidebar";
import TopNav from "../../pages/TopNav";

export default function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    // ADD THIS
    const [collapsed, setCollapsed] = useState(false);

    const handleMenuClick = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div
                style={{
                    flex: 1,
                    marginLeft: collapsed ? '80px' : '260px',
                    minHeight: '100vh',
                    transition: 'all 0.3s ease',
                }}
            >
                <TopNav
                    onMenuClick={handleMenuClick}
                    mobileOpen={mobileOpen}
                    collapsed={collapsed}
                />

                <main
                    style={{
                        padding: '0',
                        marginTop: '64px',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        background: '#f8fafc',
                        minHeight: 'calc(100vh - 64px)',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}