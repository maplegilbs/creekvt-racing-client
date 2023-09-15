const AdminDashboard = (props) => {
  let adminName = localStorage.getItem("firstName");
  return (
    <div>
      <div>Welcome Back Admin {adminName}</div>
      <div>
        Use This daashboard to edit race information, racers, and to post
        results.
      </div>
      <div>Select A Race To Edit</div>
      {/* <div></div> will have race pannel here from admin dashboard wireframe. */}
    </div>
  );
};

export default AdminDashboard;
