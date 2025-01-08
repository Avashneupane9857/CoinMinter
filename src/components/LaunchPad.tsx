import React, { useState } from "react";
import { Terminal, Rocket, Image, Coins } from "lucide-react";
import { Card, CardContent } from "./ui/card";
function LaunchPad() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    imageUrl: "",
    initialSupply: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createToken = () => {
    // Token creation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Solana LaunchPad
          </h1>
          <p className="text-gray-400 mt-2">Create your token in seconds</p>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-md border border-gray-800">
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Terminal className="w-4 h-4 mr-2" />
                    Token Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Cosmic Coin"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Symbol Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Rocket className="w-4 h-4 mr-2" />
                    Symbol
                  </label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    placeholder="e.g., CSMC"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Image URL Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Image className="w-4 h-4 mr-2" />
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter token image URL"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Initial Supply Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                    <Coins className="w-4 h-4 mr-2" />
                    Initial Supply
                  </label>
                  <input
                    type="number"
                    name="initialSupply"
                    value={formData.initialSupply}
                    onChange={handleChange}
                    placeholder="Enter initial supply"
                    className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  onClick={createToken}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition duration-200 transform hover:scale-[1.02]"
                >
                  Launch Token
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LaunchPad;
