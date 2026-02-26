import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Emergency } from './pages/Emergency';
import { HelpGuides } from './pages/HelpGuides';
import { Profile } from './pages/Profile';
import { VideoCall } from './pages/VideoCall';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'dashboard', Component: Dashboard },
      { path: 'emergency', Component: Emergency },
      { path: 'help-guides', Component: HelpGuides },
      { path: 'profile', Component: Profile },
      { path: 'video-call', Component: VideoCall },
    ],
  },
]);
