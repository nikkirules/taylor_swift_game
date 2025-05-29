import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import TaylorBackground from './components/TaylorBackground';

interface Question {
  song: string;
  correctAlbum: string;
  options: string[];
  isVaultTrack: boolean;
}

interface HighScore {
  name: string;
  score: number;
  date: string;
}

// Helper function to create and configure an audio element
const createAudio = (src: string, loop = false) => {
  const audio = new Audio(src);
  audio.loop = loop;
  return audio;
};

function App() {
  const questions: Question[] = [
    {
      song: "Anti-Hero",
      correctAlbum: "Midnights",
      options: ["Midnights", "Folklore", "Evermore", "Red (Taylor's Version)", "Lover", "1989"],
      isVaultTrack: false
    },
    {
      song: "Mr. Perfectly Fine",
      correctAlbum: "Fearless (Taylor's Version)",
      options: ["Fearless (Taylor's Version)", "Red (Taylor's Version)", "Speak Now (Taylor's Version)", "1989 (Taylor's Version)", "Midnights", "Lover"],
      isVaultTrack: true
    },
    {
      song: "I Bet You Think About Me",
      correctAlbum: "Red (Taylor's Version)",
      options: ["Red (Taylor's Version)", "Fearless (Taylor's Version)", "Speak Now (Taylor's Version)", "1989 (Taylor's Version)", "Evermore", "Reputation"],
      isVaultTrack: true
    },
    {
      song: "All Too Well (10 Minute Version)",
      correctAlbum: "Red (Taylor's Version)",
      options: ["Red (Taylor's Version)", "Fearless (Taylor's Version)", "Speak Now (Taylor's Version)", "1989 (Taylor's Version)", "Folklore", "Midnights"],
      isVaultTrack: true
    },
    {
      song: "You're Losing Me",
      correctAlbum: "Midnights (3am Edition)",
      options: ["Midnights (3am Edition)", "Evermore", "Folklore", "Red (Taylor's Version)", "1989 (Taylor's Version)", "Speak Now (Taylor's Version)"],
      isVaultTrack: true
    },
    {
      song: "Now That We Don't Talk",
      correctAlbum: "1989 (Taylor's Version)",
      options: ["1989 (Taylor's Version)", "Speak Now (Taylor's Version)", "Red (Taylor's Version)", "Fearless (Taylor's Version)", "Midnights", "Lover"],
      isVaultTrack: true
    },
    {
      song: "Slut!",
      correctAlbum: "1989 (Taylor's Version)",
      options: ["1989 (Taylor's Version)", "Midnights", "Speak Now (Taylor's Version)", "Lover", "Reputation", "Red (Taylor's Version)"],
      isVaultTrack: true
    },
    {
      song: "Say Don't Go",
      correctAlbum: "1989 (Taylor's Version)",
      options: ["1989 (Taylor's Version)", "Speak Now (Taylor's Version)", "Fearless (Taylor's Version)", "Red (Taylor's Version)", "Evermore", "Folklore"],
      isVaultTrack: true
    },
    {
      song: "Timeless",
      correctAlbum: "Speak Now (Taylor's Version)",
      options: ["Speak Now (Taylor's Version)", "1989 (Taylor's Version)", "Red (Taylor's Version)", "Fearless (Taylor's Version)", "Midnights", "Lover"],
      isVaultTrack: true
    },
    {
      song: "Castles Crumbling",
      correctAlbum: "Speak Now (Taylor's Version)",
      options: ["Speak Now (Taylor's Version)", "Evermore", "Folklore", "Red (Taylor's Version)", "1989 (Taylor's Version)", "Fearless (Taylor's Version)"],
      isVaultTrack: true
    },
    {
      song: "Fortnight (feat. Post Malone)",
      correctAlbum: "The Tortured Poets Department",
      options: ["The Tortured Poets Department", "Midnights", "Folklore", "Lover", "Reputation", "1989"],
      isVaultTrack: false
    },
    {
      song: "Cruel Summer",
      correctAlbum: "Lover",
      options: ["Lover", "Reputation", "1989", "Red (Taylor's Version)", "Midnights", "Speak Now"],
      isVaultTrack: false
    },
    {
      song: "cardigan",
      correctAlbum: "folklore",
      options: ["folklore", "evermore", "Midnights", "Lover", "Red", "Speak Now (Taylor's Version)"],
      isVaultTrack: false
    },
    {
      song: "willow",
      correctAlbum: "evermore",
      options: ["evermore", "folklore", "Midnights", "Lover", "Fearless (Taylor's Version)", "Red (Taylor's Version)"],
      isVaultTrack: false
    },
    {
      song: "Look What You Made Me Do",
      correctAlbum: "Reputation",
      options: ["Reputation", "1989", "Lover", "Midnights", "Speak Now", "Red"],
      isVaultTrack: false
    },
    {
      song: "Love Story (Taylor's Version)",
      correctAlbum: "Fearless (Taylor's Version)",
      options: ["Fearless (Taylor's Version)", "Speak Now (Taylor's Version)", "Red (Taylor's Version)", "Taylor Swift", "1989", "Lover"],
      isVaultTrack: false
    },
    {
      song: "I Can Do It With a Broken Heart",
      correctAlbum: "The Tortured Poets Department",
      options: ["The Tortured Poets Department", "Midnights (3am Edition)", "evermore", "Lover", "reputation", "1989 (Taylor's Version)"],
      isVaultTrack: false
    },
    {
      song: "You Belong With Me (Taylor's Version)",
      correctAlbum: "Fearless (Taylor's Version)",
      options: ["Fearless (Taylor's Version)", "Taylor Swift", "Speak Now", "Red", "1989", "Lover"],
      isVaultTrack: false
    },
    {
      song: "Is It Over Now? (Taylor's Version) [From The Vault]",
      correctAlbum: "1989 (Taylor's Version)",
      options: ["1989 (Taylor's Version)", "Red (Taylor's Version)", "Midnights", "Lover", "Speak Now (Taylor's Version)", "Fearless (Taylor's Version)"],
      isVaultTrack: true
    },
    {
      song: "Enchanted (Taylor's Version)",
      correctAlbum: "Speak Now (Taylor's Version)",
      options: ["Speak Now (Taylor's Version)", "Fearless (Taylor's Version)", "Red", "Lover", "1989", "Midnights"],
      isVaultTrack: false
    },
    {
      song: "Don't Blame Me",
      correctAlbum: "Reputation",
      options: ["Reputation", "Lover", "1989 (Taylor's Version)", "Midnights", "Folklore", "Evermore"],
      isVaultTrack: false
    },
    {
      song: "The Story Of Us (Taylor's Version)",
      correctAlbum: "Speak Now (Taylor's Version)",
      options: ["Speak Now (Taylor's Version)", "Red (Taylor's Version)", "Fearless (Taylor's Version)", "1989", "Lover", "Midnights"],
      isVaultTrack: false
    },
    {
      song: "My Boy Only Breaks His Favorite Toys",
      correctAlbum: "The Tortured Poets Department",
      options: ["The Tortured Poets Department", "Midnights", "Lover", "evermore", "reputation", "1989 (Taylor's Version)"],
      isVaultTrack: false
    },
    {
      song: "Hits Different",
      correctAlbum: "Midnights (Target Exclusive)",
      options: ["Midnights (Target Exclusive)", "Midnights (3am Edition)", "Lover", "1989 (Taylor's Version)", "Folklore", "The Tortured Poets Department"],
      isVaultTrack: false
    },
    {
      song: "Suburban Legends (Taylor's Version) [From The Vault]",
      correctAlbum: "1989 (Taylor's Version)",
      options: ["1989 (Taylor's Version)", "Midnights", "Lover", "Speak Now (Taylor's Version)", "Red (Taylor's Version)", "The Tortured Poets Department"],
      isVaultTrack: true
    },
    {
      song: "I Can See You (Taylor's Version) [From The Vault]",
      correctAlbum: "Speak Now (Taylor's Version)",
      options: ["Speak Now (Taylor's Version)", "Fearless (Taylor's Version)", "1989 (Taylor's Version)", "Red (Taylor's Version)", "Midnights", "Lover"],
      isVaultTrack: true
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [activeSparkleButtonKey, setActiveSparkleButtonKey] = useState<string | null>(null);
  const [activeCryingButtonKey, setActiveCryingButtonKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Memoize audio elements to prevent re-creation on every render
  const audioFiles = useMemo(() => ({
    background: createAudio(`${process.env.PUBLIC_URL}/audio/background.mp3`, true),
    correct: createAudio(`${process.env.PUBLIC_URL}/audio/correct.mp3`),
    incorrect: createAudio(`${process.env.PUBLIC_URL}/audio/incorrect.mp3`),
    // gameover: createAudio(`${process.env.PUBLIC_URL}/audio/gameover.mp3`) // Optional
  }), []);

  // Function to play a sound effect, respecting mute state
  const playSound = useCallback((sound: HTMLAudioElement) => {
    if (!isMuted && hasInteracted) {
      sound.currentTime = 0; // Rewind to start
      sound.play().catch(error => console.warn("Audio play failed:", error));
    }
  }, [isMuted, hasInteracted]);

  // Effect for background music
  useEffect(() => {
    if (hasInteracted && !isMuted) {
      audioFiles.background.play().catch(error => console.warn("Background audio play failed:", error));
    } else {
      audioFiles.background.pause();
    }
    // Cleanup: pause music when component unmounts
    return () => {
      audioFiles.background.pause();
    };
  }, [isMuted, hasInteracted, audioFiles.background]);

  // Effect to handle the first user interaction for autoplay policy
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const savedScores = localStorage.getItem('highScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const saveScore = (name: string) => {
    const newScore: HighScore = {
      name,
      score,
      date: new Date().toLocaleDateString()
    };
    
    const newHighScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setHighScores(newHighScores);
    localStorage.setItem('highScores', JSON.stringify(newHighScores));
    setShowLeaderboard(true);
  };

  const handleAlbumClick = (selectedAlbum: string, buttonKey: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAlbum === currentQuestion.correctAlbum;
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 1);
      setActiveSparkleButtonKey(buttonKey);
      playSound(audioFiles.correct);
    } else {
      setActiveCryingButtonKey(buttonKey);
      playSound(audioFiles.incorrect);
    }

    setTimeout(() => {
      setShowResult(false);
      setActiveSparkleButtonKey(null);
      setActiveCryingButtonKey(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsGameOver(true);
        // if (audioFiles.gameover) playSound(audioFiles.gameover); // Optional game over sound
      }
    }, 1200);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setIsGameOver(false);
    setShowLeaderboard(false);
    setPlayerName("");
  };

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      saveScore(playerName);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const numSparkles = 15;
  const numCryingEmojis = 5;

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="App">
      <TaylorBackground />
      <header className="App-header">
        <h1>Taylor Swift Song Quiz</h1>
        <div className="score">Score: {score}</div>
        
        {!isGameOver ? (
          <div className="quiz-container">
            <div className="progress-bar">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="song-display">
              <h2>Which album is this song from?</h2>
              <div className="song-title">
                {currentQuestion.song}
                {currentQuestion.isVaultTrack && 
                  <span className="vault-badge">From The Vault</span>
                }
              </div>
            </div>
            <div className="album-options">
              {currentQuestion.options.map((album, index) => {
                const buttonKey = `q${currentQuestionIndex}-opt${index}`;
                // Determine if this specific button was the one clicked and is correct
                const isThisButtonCorrectAndActive = showResult && 
                                                 album === currentQuestion.correctAlbum && 
                                                 activeSparkleButtonKey === buttonKey;
                // Determine if this specific button was the one clicked and is incorrect
                const isThisButtonIncorrectAndActive = showResult && 
                                                   album !== currentQuestion.correctAlbum && 
                                                   activeCryingButtonKey === buttonKey;
                
                let buttonClass = 'album-button';
                if (showResult) {
                  if (album === currentQuestion.correctAlbum) {
                    buttonClass += ' correct';
                  } else if (activeCryingButtonKey === buttonKey) { // Only the clicked incorrect button gets styled as incorrect
                    buttonClass += ' incorrect';
                  }
                }

                return (
                  <button
                    key={buttonKey}
                    onClick={() => handleAlbumClick(album, buttonKey)}
                    className={buttonClass}
                    disabled={showResult}
                  >
                    {album}
                    {isThisButtonCorrectAndActive && Array.from({ length: numSparkles }).map((_, i) => {
                      const randomAngle = Math.random() * 360;
                      const randomDistance = 50 + Math.random() * 50;
                      const tx = Math.cos(randomAngle * Math.PI / 180) * randomDistance;
                      const ty = Math.sin(randomAngle * Math.PI / 180) * randomDistance;
                      return (
                        <span
                          key={`sparkle-${i}`}
                          className="sparkle animate"
                          style={{
                            '--tx': `${tx}px`,
                            '--ty': `${ty}px`,
                            animationDelay: `${i * 0.02}s`
                          } as React.CSSProperties}
                        />
                      );
                    })}
                    {isThisButtonIncorrectAndActive && Array.from({ length: numCryingEmojis }).map((_, i) => {
                      const randomX = Math.random() * 70 + 15; 
                      const randomStartDelay = Math.random() * 0.3;
                      return (
                        <span
                          key={`cry-${i}`}
                          className="crying-emoji animate"
                          style={{
                            left: `${randomX}%`,
                            top: `${Math.random() * 20 + 40}%`,
                            animationDelay: `${randomStartDelay + i * 0.05}s`
                          } as React.CSSProperties}
                        >
                          😭
                        </span>
                      );
                    })}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="game-over">
            {!showLeaderboard ? (
              <>
                <h2>Game Over!</h2>
                <p>Final Score: {score} out of {questions.length}</p>
                <form onSubmit={handleSubmitScore} className="name-form">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="name-input"
                  />
                  <button type="submit" className="submit-button">
                    Save Score
                  </button>
                </form>
              </>
            ) : (
              <div className="leaderboard">
                <h2>Leaderboard</h2>
                <div className="leaderboard-entries">
                  {highScores.map((highScore, index) => (
                    <div key={index} className="leaderboard-entry">
                      <div className="rank">#{index + 1}</div>
                      <div className="name">{highScore.name}</div>
                      <div className="high-score">{highScore.score}</div>
                      <div className="date">{highScore.date}</div>
                    </div>
                  ))}
                </div>
                <button onClick={restartGame} className="restart-button">
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <button onClick={toggleMute} className="mute-button">
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
}

export default App;
