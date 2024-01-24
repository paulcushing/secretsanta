import Head from "next/head";
import { useState } from "react";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function Home() {
  const [names, setNames] = useState(["", "", ""]);
  const [pairings, setPairings] = useState(null);

  const handleChange = (e) => {
    const newNames = [...names];
    newNames[e.target.id] = e.target.value;
    setNames(newNames);
  };

  const reset = () => {
    setNames(["", "", ""]);
    setPairings(null);
  };

  const generate = () => {
    console.log("generating");
    const nameList = [...names].filter((item) => item);

    shuffle(nameList);

    let pairings = [];
    nameList.forEach((name, id) => {
      if (id == nameList.length - 1) {
        pairings.push({ santa: name, toBuyFor: nameList[0] });
      } else {
        pairings.push({ santa: name, toBuyFor: nameList[id + 1] });
      }
    });
    console.log(pairings);
    setPairings(pairings);
  };

  const addName = () => {
    setNames((names) => [...names, ""]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Secret Santa Selection Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full bg-white flex flex-column flex-1">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full bg-cover lg:w-6/12 xl:w-7/12">
              <div className="relative flex flex-col items-center w-full h-full px-10 my-20 lg:px-16 lg:my-64">
                <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                  <div className="relative">
                    <p className="mb-2 font-medium text-gray-700 uppercase">
                      Putting Javascript To Good Use
                    </p>
                    <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                      Secret Santa Selection Engine
                    </h2>
                  </div>
                  <p className="text-2xl text-gray-700">
                    I've created a simple form to generate random selections so
                    everyone in your list gets a gift and no one is left out.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full bg-white lg:w-6/12 xl:w-5/12">
              <div className="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
                <h4 className="w-full text-3xl font-bold">Your List</h4>
                <p className="text-lg text-gray-500">
                  Add the names of your Secret Santa participants
                </p>
                <div className="relative w-full mt-10 space-y-8">
                  <div className="relative">
                    <div className="flex flex-row justify-between my-4">
                      <div>
                        <label className="font-medium text-gray-900">
                          Names
                        </label>
                      </div>
                      
                    </div>
                    {names.map((name, id) => {
                      return (
                        <input
                          id={id}
                          key={id}
                          type="text"
                          className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                          placeholder="Participant Name"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          value={names[id]}
                        />
                      );
                    })}
                  </div>
                  <div>
                        <button
                          onClick={addName}
                          className="p-4 text-center text-white bg-gray-400 rounded-lg hover:bg-gray-600 ease content-center"
                        >
                          Add Participant
                        </button>
                      </div>

                  <div className="relative">
                    <button
                      onClick={generate}
                      className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                    >
                      Generate The List
                    </button>
                    <button
                      onClick={reset}
                      className="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {pairings && (
        <div className="flex flex-col items-center justify-center flex-1 w-full mb-10">
          <h3 class="text-3xl text-gray-800">Results</h3>
          <ul className="text-2xl text-gray-700">
            {pairings.map((result, id) => {
              return (
                <li key={id}>
                  {result.santa}{" "}
                  <span className="text-lg italic">buys for</span>{" "}
                  {result.toBuyFor}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://paulcushing.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paul Cushing
        </a>
      </footer>
    </div>
  );
}
