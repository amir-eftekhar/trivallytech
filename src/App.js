import './App.css';
import Web from './page.jsx'
import ProjectsPage from './projects.jsx';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ArticlesPage from './Article.jsx';
import TeamPage from './team.jsx';
import DevVaultPage from './devVault.jsx';
import DevVaultDetail from './devVaultDetail.jsx';
import DevVaultCreate from './devVaultCreate.jsx';
import { ThemeProvider } from './ThemeContext';
import ArticleCreate from './ArticleCreate.jsx';
import Meet from './meet';
import OfficersPage from './OfficersPage.jsx';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
     if (sessionStorage.redirect) {
      var redirect = sessionStorage.redirect;
      sessionStorage.removeItem('redirect');
      if (redirect && redirect !== "/" && redirect !== "/index.html") {
        window.history.replaceState(null, null, redirect);
      }
    }
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Web />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/dev-vault" element={<DevVaultPage />} />
          <Route
            path="/dev-vault/create"
            element={
              <ProtectedRoute>
                <DevVaultCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dev-vault/:projectId"
            element={
              <ProtectedRoute>
                <DevVaultDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles/create"
            element={
              <ProtectedRoute>
                <ArticleCreate />
              </ProtectedRoute>
            }
          />
          <Route path="/meet" element={<Meet />} />
          <Route path="/officers" element={<OfficersPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;