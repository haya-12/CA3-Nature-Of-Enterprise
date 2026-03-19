export default function Home() {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Campus Companion</h1>
      <p>Welcome to your student helper app!</p>
      

      <h2>Upcoming Events</h2>
      <ul>
        <li>📅 Coding Workshop - March 20</li>
        <li>🎉 Freshers Party - March 22</li>
        <li>📚 Study Group - March 25</li>
      </ul>

      <h2>Quick Links</h2>
      <ul>
        <li>🗺 Campus Map</li>
        <li>🍔 Canteen Menu</li>
        <li>📩 Helpdesk</li>
      </ul>

      <button style={{ marginTop: "20px", padding: "10px" }}>
        Add Reminder
      </button>
    </main>
  );

}
