import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';

export function Root() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
