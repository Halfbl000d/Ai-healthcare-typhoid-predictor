import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function PredictDisease() {
  const { user, token } = useAuth();
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await fetch(`${API_URL}/symptoms`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setAllSymptoms(data.symptoms || []);
      } catch (err) {
        console.error("Failed to fetch symptoms:", err);
      }
    };
    fetchSymptoms();
  }, [token]);

  const fuse = new Fuse(allSymptoms, { includeScore: true, threshold: 0.4 });

  const handleAddSymptom = () => {
    if (!input) return;
    const match = fuse.search(input);
    if (match.length > 0) {
      const bestMatch = match[0].item;
      if (!selectedSymptoms.includes(bestMatch)) {
        setSelectedSymptoms([...selectedSymptoms, bestMatch]);
      }
    } else {
      alert("Symptom not recognized. Please select from available symptoms.");
    }
    setInput("");
  };

  const handleRemoveSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/typhoidpredict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(
          selectedSymptoms.reduce((acc, s, i) => {
            acc[`symptom${i + 1}`] = s;
            return acc;
          }, {})
        ),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">
        Typhoid Prediction {user ? `for ${user.username}` : ""}
      </h2>

      <form onSubmit={handlePredict} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a symptom"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            type="button"
            onClick={handleAddSymptom}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSymptoms.map((s) => (
            <span
              key={s}
              className="bg-purple-200 text-purple-800 px-2 py-1 rounded flex items-center gap-1"
            >
              {s}
              <button
                type="button"
                onClick={() => handleRemoveSymptom(s)}
                className="font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-white py-2 rounded mt-4 hover:bg-purple-600"
        >
          Predict
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          {result.error && <p className="text-red-600">{result.error}</p>}
          {result.prediction && (
            <>
              <p>
                <strong>Prediction:</strong> {result.prediction}
              </p>
              <p>
                <strong>Precautions:</strong>{" "}
                {result.precautions ? result.precautions.join(", ") : "N/A"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
