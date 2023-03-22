function Dashboard(props) {
  return (
    <div className="">
      <h1>Dashboard</h1>
      <button type="button" onClick={() => props.setAuth(false)}>
        Click Me To Exit
      </button>
    </div>
  );
}

export default Dashboard;
