import { EXAM_PARTS } from "@/lib/exam-config";

export function ExamFormatTable() {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-left text-sm">
        <caption className="bg-muted/50 px-3 py-2 text-left text-xs text-muted-foreground">
          Anannt commentary on the May 2027 hybrid digital AP Calculus AB structure. Confirm on the
          official College Board exam page.
        </caption>
        <thead>
          <tr className="border-b">
            <th className="px-3 py-2">Part</th>
            <th>Questions</th>
            <th>Time</th>
            <th>Calculator</th>
          </tr>
        </thead>
        <tbody>
          {EXAM_PARTS.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="px-3 py-2">{p.label}</td>
              <td>{p.questions}</td>
              <td>{p.minutes} min</td>
              <td>{p.calculator === "required" ? "Required" : "Not permitted"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
