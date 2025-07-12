import  { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const mockUser = {
  id: '1',
  username: 'darshanravaldz',
  name: 'Darshan Raval',
  email: 'darshanravaldz@gmail.com',
  bio: 'Passionate cook sharing delicious recipes from around the world 🍳👨‍🍳',
  avatar: 'https://imgs.search.brave.com/F9EyCB6CgCblsAhevHfvq3OgiGlpmGULPofDeZ6wnYc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcDEu/cGl4bm95LmNvbS9w/L3B0XzY3NTc2NTE3/NDgxODExNjg2NjYy/NDNfMF8yMjgwMTZj/NWY0ZGYyMWFkY2Y2/Zjg3YmVkZjM3NWEw/NS5qcGc_bz1hSFIw/Y0hNNkx5OXpZMjl1/ZEdWdWRDMXphbU16/TFRFdVkyUnVhVzV6/ZEdGbmNtRnRMbU52/YlM5MkwzUTFNUzR5/T0RnMUxURTFMelE1/TVRRek9UazVOVjh4/TnpnM056QXpPRE0z/TXpNd01URTVOVjh4/T1RjMk56UXlNalEw/TXpjNE1EZ3hNakV4/WDI0dWFuQm5QM04w/Y0Qxak1DNDBPREF1/TVRJME1DNHhNalF3/WVY5a2MzUXRhbkJu/WDJVek5WOXpOalF3/ZURZME1GOXphREF1/TURoZmRIUTJKbDl1/WTE5b2REMXpZMjl1/ZEdWdWRDMXphbU16/TFRFdVkyUnVhVzV6/ZEdGbmNtRnRMbU52/YlNaZmJtTmZZMkYw/UFRFd055WmZibU5m/YjJNOVVUWmpXakpS/UlVkbGRERjNVWEpp/YkhrMVZYUkNWRkZw/ZURBeFNsVlBWbEJC/UWtreWIzUmxZMEV5/ZFd0RmRuQjRUVzV4/U201eWIwOXhVM1Ez/WDJoblkzRndYMDF2/WmxVMldFOXVaV0pR/WDJ0SFVXdGtlVWxs/UzNaUU1WY21YMjVq/WDI5b1l6MWFZa2ww/TFRSWWNERmlPRkUz/YTA1MmQwWmpRVXRP/TUNaZmJtTmZaMmxr/UFZSU1IwSjFVVUZI/UlZGaWFVNDJTekJI/WTFZelUzY21aV1J0/UFVGUVZUZzVSa0ZD/UVVGQlFTWmpZMkk5/TnkwMUptOW9QVEF3/WDBGbVNuRlpRWFZr/Y1hVMVFYRk1aMFZO/YTFGU05XOU9Welpu/YTA1Q1YxZDViUzFW/UjI5dFdFSndSMmho/ZDBFbWIyVTlOamd5/UVRFM1F6Y21YMjVq/WDNOcFpEMWlZekJq/TW1NPSZoPWMyODM5/ZTUzMjFjZjc3YzYx/NjM3YWNlYWM1NWI0/N2I0',
  followers: 19.1,
  following: 89,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('recipeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would be an API call
    if (email && password) {
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('recipeUser', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('recipeUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};