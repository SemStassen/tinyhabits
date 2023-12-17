import NewHabit from "./new-habit";

function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="grid grid-cols-6">
        <NewHabit />
      </div>
    </main>
  );
}

export default DashboardPage;
