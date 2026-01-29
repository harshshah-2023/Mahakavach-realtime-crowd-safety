import { useParams } from "react-router-dom";
import { getRushStatus } from "../utils/rushLogic";
import { LINE_DETAILS } from "../data/lineDetails";

export default function RushLineDetail() {
  const { line } = useParams();
  const data = LINE_DETAILS[line];
  const rush = getRushStatus();

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-2 h-10 rounded ${rush.color}`} />
          <h1 className="font-emirates text-4xl text-dark">
            {data.name}
          </h1>
        </div>

        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white ${rush.color}`}
        >
          Current Rush Level: {rush.level}
        </div>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-dark mb-3">
          Line Overview
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {data.overview}
        </p>
      </section>

      {/* Routes */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-dark mb-4">
          Active Routes
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <ul className="space-y-2 text-sm text-gray-700">
            {data.routes.map((route) => (
              <li key={route}>• {route}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interchanges */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-dark mb-3">
          Major Interchanges
        </h2>
        <p className="text-sm text-gray-700">
          {data.interchanges.join(" · ")}
        </p>
      </section>

      {/* Operational Notes */}
      <section>
        <h2 className="text-lg font-semibold text-dark mb-3">
          Operational Notes
        </h2>
        <div className="border-l-4 border-primary bg-white p-5 rounded-md shadow-sm">
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.notes}
          </p>
        </div>
      </section>
    </div>
  );
}
