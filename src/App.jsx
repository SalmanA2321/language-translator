import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [languages, setLanguages] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const res = await axios.get("https://libretranslate.com/languages", {
          headers: { accept: "application/json" },
        });

        setLanguages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLanguages();
  }, []);

  const onTranslate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    try {
      const res = await axios.post(
        "https://libretranslate.de/translate",
        params,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setOutput(res.data.translatedText);
    } catch (err) {
      console.log(err);
      setOutput("Error while proceeding the request!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen grid place-content-center place-items-center gap-8">
        {/* Select Options  */}

        <div className="flex gap-10 items-center">
          {/* Select language to be translated */}
          <div className="flex gap-4 items-center">
            From ({from})
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="px-5 py-2 border rounded-sm"
            >
              {languages?.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select language to which to be translated */}
          <div className="flex gap-4 items-center">
            to ({to})
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="px-5 py-2 border rounded-sm"
            >
              {languages?.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col gap-5">
          {/* Text to be translated */}
          <textarea
            cols="60"
            rows="5"
            className="p-3 border rounded-sm"
            placeholder="Type the text"
            onInput={(e) => setInput(e.target.value)}
          ></textarea>

          {/* Text translated */}
          <textarea
            cols="60"
            rows="5"
            className="p-3 border rounded-sm"
            placeholder=""
            value={isLoading ? "Translating..." : output}
          ></textarea>
        </div>

        <button
          onClick={onTranslate}
          className="bg-indigo-500 text-white px-10 py-2 rounded-sm hover:rounded-full"
        >
          Translate
        </button>
      </div>
    </>
  );
};

export default App;
