function LaunchPad() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-10">
      <div className="w-full max-w-lg bg-gray-900 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Solana LaunchPad
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Symbol
            </label>
            <input
              type="text"
              placeholder="Enter symbol"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Initial Supply
            </label>
            <input
              type="number"
              placeholder="Enter initial supply"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LaunchPad;
