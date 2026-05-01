export const dynamic = "force-static"

import { supabase } from "@/lib/supabase"
import { clusterSubjects } from "@/lib/clusterSubjects"

export default async function MLPage() {
  const { data, error } = await supabase
    .from("Subjects")
    .select("*")

  if (error) {
    return (
      <main style={{ padding: "30px" }}>
        <h1>Error loading data</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    )
  }

  if (!data || data.length === 0) {
    return (
      <main style={{ padding: "30px" }}>
        <h1>ML Subject Clustering</h1>
        <p>No subject data found.</p>
      </main>
    )
  }

  const clustered = clusterSubjects(data)

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>ML Subject Clustering</h1>
      <p>Total subjects found: {clustered.length}</p>

      {clustered.map((row) => (
        <div
          key={row.subject_id}
          style={{
            border: "1px solid white",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "8px",
          }}
        >
          <h2>{row.subject_name}</h2>
          <p><b>Subject ID:</b> {row.subject_id}</p>
          <p><b>Cluster:</b> {row.clusterLabel}</p>
        </div>
      ))}
    </main>
  )
}