// contexts/AuthContext.jsx
import { createContext, useContext, useReducer } from "react";

// 1. السياق
const AuthContext = createContext();

// 2. الحالة الأولية
const initialState = {
  user: null,
  isAuthenticated: false,
};

// 3. المرسل (Reducer)
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// 4. المزوّد (Provider)
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // دوال تسجيل الدخول والخروج
  const login = (userData) => {
    dispatch({ type: "login", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 5. Hook جاهز للاستخدام
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
