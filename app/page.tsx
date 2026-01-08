"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Indie_Flower } from "next/font/google";
import { Heart, Sparkles, Gift, X } from "lucide-react";

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
});

const avatarStyles = [
  { id: "romantic", name: "Romantic" },
  { id: "cupid", name: "Cupid" },
  { id: "roses", name: "Roses" },
  { id: "sweet", name: "Sweet" },
  { id: "hearts", name: "Hearts" },
  { id: "angel", name: "Angel" },
];

type AppState = "create" | "loading" | "result";

export default function CrafterPage() {
  const [selectedStyle, setSelectedStyle] = useState("romantic");
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [appState, setAppState] = useState<AppState>("create");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClaim = () => {
    setAppState("loading");
    setTimeout(() => {
      setAppState("result");
    }, 3000);
  };

  const handleClearImage = () => {
    setImage(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const PaperWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#fafad2] flex items-center justify-center p-4">
      <div className="relative bg-white/90 w-full max-w-[450px] min-h-[550px] shadow-[0_0_5px_0_#888] overflow-hidden">
        {/* Red margin line */}
        <div className="absolute left-[45px] top-0 h-full w-[2px] bg-red-400/40" />

        {/* Lines background */}
        <div
          className="absolute inset-0 mt-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(white 0px, white 24px, steelblue 25px)",
          }}
        />

        {/* Holes */}
        <div className="absolute left-[10px] top-[10%] w-[25px] h-[25px] bg-[#fafad2] rounded-full shadow-[inset_0_0_2px_0_#888]" />
        <div className="absolute left-[10px] top-[50%] w-[25px] h-[25px] bg-[#fafad2] rounded-full shadow-[inset_0_0_2px_0_#888]" />
        <div className="absolute left-[10px] bottom-[10%] w-[25px] h-[25px] bg-[#fafad2] rounded-full shadow-[inset_0_0_2px_0_#888]" />

        {/* Content area */}
        <div
          className={`relative z-10 pt-16 pl-14 pr-4 pb-4 ${indieFlower.className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );

  if (appState === "loading") {
    return (
      <PaperWrapper>
        <div className="flex flex-col items-center justify-center min-h-[450px] gap-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <Heart
                key={i}
                className="absolute text-rose-400/50 fill-rose-400/50 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${12 + Math.random() * 16}px`,
                  height: `${12 + Math.random() * 16}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
            <p className="text-xl text-rose-800">
              Creating your card with love...
            </p>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-rose-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </PaperWrapper>
    );
  }

  if (appState === "result") {
    return (
      <PaperWrapper>
        <div className="flex flex-col items-center gap-4 min-h-[450px] justify-center">
          <Sparkles className="w-6 h-6 text-pink-500" />
          <p className="text-xl text-rose-800">Your card is ready!</p>

          <div className="relative my-4">
            <div
              className="absolute -inset-3 rounded-full border-2 border-dashed border-rose-300 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <Heart className="absolute -top-4 -left-4 w-6 h-6 text-rose-400 fill-rose-400" />
            <Heart className="absolute -top-4 -right-4 w-6 h-6 text-pink-400 fill-pink-400" />
            <Heart className="absolute -bottom-4 -left-4 w-6 h-6 text-pink-400 fill-pink-400" />
            <Heart className="absolute -bottom-4 -right-4 w-6 h-6 text-rose-400 fill-rose-400" />

            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {image ? (
                <img
                  src={image || "/placeholder.svg"}
                  alt="Your card"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white fill-white" />
                </div>
              )}
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs px-3 py-1 rounded-full">
              {avatarStyles.find((s) => s.id === selectedStyle)?.name}
            </div>
          </div>

          {prompt && (
            <p className="text-rose-600 text-center max-w-xs italic text-sm">
              "{prompt}"
            </p>
          )}

          <button className="mt-4 py-3 px-8 bg-rose-500 text-white rounded-xl flex items-center gap-2 shadow-[0_4px_0_0_#be123c] active:translate-y-1 active:shadow-[0_2px_0_0_#be123c] transition-all">
            <Gift className="w-4 h-4" />
            Download Card
          </button>
        </div>

        <footer className="absolute bottom-4 left-14 right-4 text-rose-400 text-sm flex items-center gap-1">
          Built with <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />{" "}
          by Crafter Station.
        </footer>
      </PaperWrapper>
    );
  }

  return (
    <PaperWrapper>
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-3xl text-rose-900 italic">
          Valentine yourself
        </span>
      </div>

      <div className="mb-6">
        <p className="text-rose-700 text-lg mb-3 underline">
          Choose your style:
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {avatarStyles.map((style, index) => (
            <div
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className="flex items-center gap-1 cursor-pointer transition-all"
            >
              <span className="text-lg text-gray-600">{index + 1}.</span>
              <span
                className={`text-lg px-2 py-0.5 transition-all ${
                  selectedStyle === style.id
                    ? "border-2 border-rose-500 text-rose-600"
                    : "text-gray-600 hover:text-rose-500"
                }`}
                style={{
                  borderRadius:
                    selectedStyle === style.id ? "50% 40% 50% 45%" : "0",
                  transform:
                    selectedStyle === style.id ? "rotate(-2deg)" : "none",
                }}
              >
                {style.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <p
          onClick={() => fileInputRef.current?.click()}
          className="text-rose-700 text-lg mb-2 underline cursor-pointer hover:text-rose-500"
        >
          Click to upload your photo
        </p>
        {fileName && (
          <div className="flex items-center gap-2">
            <span className="text-gray-600 italic text-lg">{fileName}</span>
            <button
              onClick={handleClearImage}
              className="text-rose-500 hover:text-rose-700 transition-colors"
              aria-label="Remove photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <p className="text-rose-700 text-lg mb-2 underline">Your message:</p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write something sweet..."
          className={`w-full h-20 p-2 bg-transparent border-b-2 border-rose-300 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-rose-500 resize-none text-lg ${indieFlower.className}`}
        />
      </div>

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        disabled={!image}
        className={`w-full py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-lg ${
          image
            ? "bg-rose-500 text-white shadow-[0_4px_0_0_#be123c] active:translate-y-1 active:shadow-[0_2px_0_0_#be123c]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <Gift className="w-5 h-5" />
        Claim my card
      </button>

      <footer className="mt-8 text-rose-400 text-sm flex items-center gap-1">
        Built with <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> by
        Crafter Station.
      </footer>
    </PaperWrapper>
  );
}
