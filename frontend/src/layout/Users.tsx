import { Home } from "./Home";

interface UsersProps {
  onLogout: () => void;
}

function Users({ onLogout }: UsersProps) {
  return (
    <>
      <Home onLogout={onLogout}>
        <h1>sono un admin e vedo la pagina user</h1>
      </Home>
    </>
  );
}

export default Users;
