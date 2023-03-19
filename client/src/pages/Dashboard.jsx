function Dashboard({ setAuth }) {
  return (
    <div className="">
      <h1>Dashboard</h1>
      <button type="button" onClick={() => setAuth(false)}>
        Click Me To Exit
      </button>
    </div>
  );
}

export default Dashboard;
