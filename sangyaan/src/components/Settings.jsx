/**
 * Settings Component
 *
 * Purpose: Manage user preferences (theme, language, profile picture).
 */

import React from "react";

const Settings = ({
  currentTheme,
  setTheme,
  currentLanguage,
  changeLanguage,
  availableLanguages,
  avatar,
  setAvatar,
  t,
  onClose,
}) => {
  // List of 20 profile pics
  const pfpList = Array.from({ length: 20 }, (_, i) => `/files/icons/pfp/${i + 1}.png`);

  return (
    <div className="absolute right-0 top-16 w-96 max-w-[calc(100vw-2rem)] theme-card rounded-3xl shadow-2xl p-6 z-50 mx-4 sm:mx-0">
      <h2 className="text-xl font-bold mb-4">⚙️ {t("settings")}</h2>

      {/* Language Selector */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">🌐 {t("language")}</label>
        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-gray-100 rounded-xl px-3 py-2 w-full text-sm"
        >
          {Object.entries(availableLanguages).map(([code, lang]) => (
            <option key={code} value={code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Selector */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">🎨 {t("theme")}</label>
        <div className="flex space-x-2">
          <button
            onClick={() => setTheme("playful")}
            className={`w-8 h-8 rounded-full border-2 ${
              currentTheme === "playful" ? "border-green-500" : "border-gray-300"
            }`}
            style={{ background: "linear-gradient(45deg, #22C55E, #FF8A00)" }}
            title="Playful Growth"
          />
          <button
            onClick={() => setTheme("calm")}
            className={`w-8 h-8 rounded-full border-2 ${
              currentTheme === "calm" ? "border-blue-500" : "border-gray-300"
            }`}
            style={{ background: "linear-gradient(45deg, #2563EB, #06B6D4)" }}
            title="Calm Focus"
          />
          <button
            onClick={() => setTheme("contrast")}
            className={`w-8 h-8 rounded-full border-2 ${
              currentTheme === "contrast" ? "border-yellow-500" : "border-gray-300"
            }`}
            style={{ background: "linear-gradient(45deg, #004E89, #FFB703)" }}
            title="High Contrast"
          />
        </div>
      </div>

      {/* Profile Picture Selector */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">🖼️ {t("profilePicture")}</label>
        <div className="grid grid-cols-5 gap-2">
          {pfpList.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`pfp-${i + 1}`}
              onClick={() => setAvatar(src)}
              className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                avatar === src ? "border-blue-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-full bg-blue-500 text-white rounded-xl py-2 mt-4 hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  );
};

export default Settings;
