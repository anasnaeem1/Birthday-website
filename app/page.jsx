"use client";
import React, { useState, useEffect } from "react";
import GiftButton from "@/components/GiftButton";

const GiftPage = () => {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showNoteText, setShowNoteText] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [boxZoom, setBoxZoom] = useState(false);
  const [boxExplode, setBoxExplode] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showThanksText, setShowThanksText] = useState(false);
  const [showWantText, setShowWantText] = useState(false);

  const handleNoClick = () => {
    setRejected(true);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  const handleTryAgain = () => {
    setRejected(false);
  };

  const handleGiftClick = () => {
    setShowGift(true);
  };

  useEffect(() => {
    if (accepted) {
      // Wait 3 seconds, then show "here is the note" text
      const timer1 = setTimeout(() => {
        setShowNoteText(true);
      }, 3000);

      // Wait a bit more, then show the note
      const timer2 = setTimeout(() => {
        setShowNote(true);
      }, 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [accepted]);

  useEffect(() => {
    if (showGift) {
      // Wait 3 seconds, then zoom (slower)
      const timer1 = setTimeout(() => {
        setBoxZoom(true);
      }, 3000);

      // After zoom, explode (slower)
      const timer2 = setTimeout(() => {
        setBoxExplode(true);
      }, 5000);

      // After explode, show photo (slower)
      const timer3 = setTimeout(() => {
        setShowPhoto(true);
      }, 6000);

      // Show "I think that's what you wanted" text after gift appears
      const timer4 = setTimeout(() => {
        setShowWantText(true);
      }, 800);

      // After photo shows, show thanks text after 1 second
      const timer5 = setTimeout(() => {
        setShowThanksText(true);
      }, 7000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [showGift]);

  const handleSeeAgain = () => {
    // Reset all states to go back to home page
    setShowGift(false);
    setBoxZoom(false);
    setBoxExplode(false);
    setShowPhoto(false);
    setShowThanksText(false);
    setShowWantText(false);
    setAccepted(false);
    setShowNote(false);
    setShowNoteText(false);
  };

  if (showGift) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f5f5dc] px-4 py-4 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10 w-full">
          {/* Cake - Left (on mobile: top) */}
          <div className="order-1 md:order-1">
            <img
              src="/Cake.png"
              alt="Cake"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>

          {/* Gift Box - Center */}
          <div
            className={`order-2 md:order-2 transition-all duration-1000 ease-in-out ${
              boxZoom ? "scale-150" : "scale-100"
            } ${boxExplode ? "opacity-0 scale-200" : "opacity-100"}`}
          >
            <img
              src="/GiftBox.png"
              alt="Gift Box"
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Cake - Right (on mobile: bottom) */}
          <div className="order-3 md:order-3">
            <img
              src="/Cake.png"
              alt="Cake"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
        </div>

        {/* Text - Appears after gift, stays visible */}
        {showWantText && !showPhoto && (
          <div className="mt-6 relative z-10 fade-in">
            <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              I think that's what you wanted right?
            </p>
          </div>
        )}

        {/* Explosion Particles */}
        {boxExplode && (
          <div className="absolute inset-0 pointer-events-none z-[15]">
            {[...Array(20)].map((_, i) => {
              const angle = (360 / 20) * i;
              const distance = 50 + Math.random() * 100;
              const radians = (angle * Math.PI) / 180;
              const x = Math.cos(radians) * distance;
              const y = Math.sin(radians) * distance;
              return (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px)`,
                    animation: "fadeOut 0.5s ease-out forwards",
                    opacity: 1,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Revealed Photo */}
        {showPhoto && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[20] fade-in bg-[#f5f5dc] px-4 py-4">
            <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 mb-4">
              <img
                src="/AGift.jpg"
                alt="Revealed photo"
                className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-lg"
              />
            </div>

            {/* Main Text - Also shown in photo view */}
            {showWantText && (
              <div className="fade-in mb-2">
                <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                  I think that's what you wanted right?
                </p>
              </div>
            )}

            {/* Thanks Text */}
            {showThanksText && (
              <div className="fade-in mb-4">
                <p className="text-base md:text-lg text-gray-600 text-center">
                  (Thanks me later twin)
                </p>
              </div>
            )}

            {/* See Again Button */}
            {showThanksText && (
              <div className="fade-in">
                <GiftButton onClick={handleSeeAgain}>
                  omg i want to see it again
                </GiftButton>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f5f5dc] px-4 py-4 overflow-hidden">
        <div className="w-full max-w-4xl space-y-4 text-center h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black">
            wait... but before that...
          </h1>

          {showNoteText && (
            <div className="fade-in">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                here is the note
              </h2>
            </div>
          )}

          {showNote && (
            <div className="fade-in flex-2 flex flex-col justify-center overflow-hidden">
              <div
                className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-5xl mx-auto relative overflow-hidden max-h-full"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                {/* Usernames */}
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
                  <div className="text-blue-600 text-sm md:text-base italic">
                   from @unverified_anas
                  </div>
                  <hr className="flex-1 border-gray-300" />
                  <div className="text-gray-500 text-sm md:text-base font-medium">
                    to
                  </div>
                  <hr className="flex-1 border-gray-300" />

                  <div className="text-pink-500 text-sm md:text-base font-medium">
                    @sassybabe.0_o
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
                  {/* Left Side */}
                  <div className="flex flex-col items-start space-y-4">
                    {/* HAPPY BIRTHDAY Text */}
                    <div className="space-y-1">
                      <h2
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                        style={{
                          color: "#9CA3AF",
                          letterSpacing: "0.05em",
                        }}
                      >
                        HAPPY
                      </h2>
                      <h2
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                        style={{
                          color: "#9CA3AF",
                          letterSpacing: "0.05em",
                        }}
                      >
                        BIRTHDAY
                      </h2>
                    </div>

                    {/* Polaroid Frame */}
                    <div className="flex flex-col items-start space-y-2">
                      <div className="bg-white border-4 border-gray-300 p-3 shadow-lg flex items-center justify-center">
                        <img
                          src="/this-is-us.jpg"
                          alt="This is us"
                          className="w-40 h-40 md:w-48 md:h-48 object-contain"
                        />
                      </div>
                      <p className="text-base md:text-3xl font-medium text-gray-800">
                        This is us
                      </p>
                      <p className="text-xs md:text-lg text-gray-600 italic">
                        I'm the white one btw
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Message */}
                  <div className="flex flex-col justify-center overflow-y-auto max-h-full relative z-10">
                    <div className="text-left space-y-2.5 text-sm md:text-base text-gray-800 leading-relaxed pr-4">
                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>
                        Even though we've only known each other for about two
                        months, I still wanted to do something for your
                        birthday. It may not be much, but it's a small effort
                        from your nonchalant, extra-special, proudly 6'2″ friend
                        so yeah, it counts.
                      </p>

                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>
                        I hope you genuinely enjoy your day. Please accept this
                        little note, and for the gift… just press that button.
                      </p>

                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>
                        (I know, I know you're kinda DUMB but let's not
                        bring that up today 💀)
                      </p>

                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>
                        Jokes aside, here's the serious part and no, I didn't
                        copy this from gpt
                      </p>

                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>
                        In a short time, you've become someone I genuinely enjoy
                        talking to. You bring good energy and effortless vibes
                        that make things lighter without trying. I hope this
                        year brings you growth, peace, and moments you're proud
                        of. You deserve good things today and always.
                      </p>

                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>
                        Stay the way you are, keep smiling, and remember this is
                        just the start of better chapters.
                      </p>

                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>Once again, happy birthday 😝</p>

                      <p className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(254, 240, 138, 0.4)' }}>— your tall, humble, and slightly annoying friend</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Images - Positioned to avoid text */}
                <div className="absolute top-10 -left-1 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-15 z-0">
                  <img
                    src="/this-is-us.jpg"
                    alt="decorative"
                    className="w-full h-full object-contain rounded-lg"
                    style={{ transform: "rotate(-8deg)" }}
                  />
                </div>
                <div className="absolute bottom-2 left-2 w-14 h-14 md:w-18 md:h-18 flex items-center justify-center opacity-12 z-0">
                  <img
                    src="/this-is-us.jpg"
                    alt="decorative"
                    className="w-full h-full object-contain rounded-lg"
                    style={{ transform: "rotate(10deg)" }}
                  />
                </div>
                <div className="absolute top-12 -right-1 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-15 z-0">
                  <img
                    src="/this-is-us.jpg"
                    alt="decorative"
                    className="w-full h-full object-contain rounded-lg"
                    style={{ transform: "rotate(8deg)" }}
                  />
                </div>
                <div className="absolute -bottom-2 right-3 w-14 h-14 md:w-18 md:h-18 flex items-center justify-center opacity-12 z-0">
                  <img
                    src="/this-is-us.jpg"
                    alt="decorative"
                    className="w-full h-full object-contain rounded-lg"
                    style={{ transform: "rotate(-10deg)" }}
                  />
                </div>
              </div>

              {/* Now my gift? Button */}
              <div className="flex justify-center mt-4 fade-in">
                <GiftButton onClick={handleGiftClick}>Now my gift?</GiftButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (rejected) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f5f5dc] px-4 py-4 overflow-hidden">
        <div className="w-full max-w-6xl space-y-4 md:space-y-6">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black text-center">
            Why did you do that? :(
          </h1>

          {/* Crying Cat Image */}
          <div className="flex justify-center">
            <img
              src="/crying-cat.png"
              alt="Crying cat"
              className="w-[400px] md:w-[600px] h-auto image-fade-zoom"
            />
          </div>

          {/* Try Again Button */}
          <div className="flex justify-center">
            <GiftButton onClick={handleTryAgain}>Try Again</GiftButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f5f5dc] px-4 py-4 overflow-hidden">
      <div className="w-full max-w-6xl space-y-4 md:space-y-6">
        {/* Title */}
        <div className="flex justify-center">
          <div
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider relative inline-block"
            style={{
              filter: "blur(0.8px)",
              textShadow: "0 0 1px rgba(0,0,0,0.2)",
            }}
          >
            <span className="relative z-10 text-black">
              PLS ACCEPT THE GIFT
            </span>
            <div
              className="absolute inset-0 bg-[#C2DFFD] rounded-sm"
              style={{
                width: "0%",
                animation: "text-fill 4s linear infinite",
                zIndex: 5,
              }}
            />
          </div>
        </div>
        <style jsx>{`
          @keyframes text-fill {
            /* Forward: right to left (fills progressively, stays filled) */
            0% {
              width: 0%;
              left: 100%;
            }
            25% {
              width: 100%;
              left: 0%;
            }
            /* Backward: left to right (unfills progressively) */
            50% {
              width: 0%;
              left: 0%;
            }
            /* Forward again: right to left */
            75% {
              width: 100%;
              left: 0%;
            }
            /* Backward again: left to right */
            100% {
              width: 0%;
              left: 0%;
            }
          }
        `}</style>

        {/* Cat Image */}
        <div className="flex justify-center">
          <img
            src="/Begging.png"
            alt="Cat with gift"
            className="w-[400px] md:w-[600px] h-auto image-fade-zoom"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <GiftButton onClick={handleYesClick}>YES</GiftButton>
          <GiftButton onClick={handleNoClick}>NO</GiftButton>
        </div>
      </div>
    </div>
  );
};

export default GiftPage;
