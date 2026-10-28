import React, { useState } from 'react';
import { LEARNING_SCENARIOS } from '../data/learningScenarios';
import { QuizScenario, QuizOption } from '../types';
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
} from 'lucide-react';

export const LearningChallenge: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{
    [scenarioId: string]: {
      selectedId: string;
      isCorrect: boolean;
      scenario: QuizScenario;
    };
  }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scenario = LEARNING_SCENARIOS[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || hasSubmitted) return;

    const chosenOption = scenario.options.find((o) => o.id === selectedOptionId);
    const isCorrect = chosenOption?.isCorrect ?? false;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [scenario.id]: {
        selectedId: selectedOptionId,
        isCorrect,
        scenario,
      },
    }));

    setHasSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < LEARNING_SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setScore(0);
    setUserAnswers({});
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Practice Game</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Spot The Scam Game!
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
          Test your scam-detecting superpowers! Read each suspicious message, find the biggest red flag, and see how high you can score across 5 fun rounds.
        </p>
      </div>

      {!isCompleted ? (
        <div className="p-5 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-white font-bold tabular-nums">
                Round {currentIndex + 1} of {LEARNING_SCENARIOS.length}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300 font-medium">{scenario.category}</span>
            </div>
            <div className="font-mono text-white tabular-nums font-bold">
              Your Score: <span className="text-emerald-400">{score}</span> / {currentIndex}
            </div>
          </div>

          {/* Scenario Case Presentation */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {scenario.scenarioTitle}:
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs sm:text-sm text-white leading-relaxed whitespace-pre-wrap">
              {scenario.messageText}
            </div>
          </div>

          {/* Question */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white">
              {scenario.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {scenario.options.map((option: QuizOption) => {
                const isSelected = selectedOptionId === option.id;
                let optionStyle = 'bg-neutral-900 border-neutral-800 hover:border-neutral-600 text-neutral-200';

                if (hasSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-medium';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'bg-red-950/50 border-red-500 text-red-200';
                  } else {
                    optionStyle = 'bg-neutral-950 border-neutral-800 text-neutral-500 opacity-50';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-white text-black font-semibold border-white';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={hasSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {hasSubmitted && option.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : hasSubmitted && isSelected && !option.isCorrect ? (
                        <XCircle className="w-4 h-4 text-red-400" />
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-black bg-black' : 'border-neutral-500'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      )}
                    </div>
                    <span className="leading-relaxed">{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Section */}
          {hasSubmitted && (
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                {scenario.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    YES! You Got It Right!
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Not Quite! Here’s Why:
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {scenario.options.find((o) => o.id === selectedOptionId)?.feedback}
              </p>

              <div className="pt-2 border-t border-neutral-800 text-xs text-neutral-400 space-y-1">
                <span className="font-bold text-white">Rule to remember:</span>
                <p className="leading-relaxed">{scenario.educationalTakeaway}</p>
              </div>
            </div>
          )}

          {/* Next / Submit Button */}
          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
              >
                Submit My Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all"
              >
                <span>{currentIndex < LEARNING_SCENARIOS.length - 1 ? 'Next Round' : 'See Final Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Card */
        <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Game Finished!</h3>
            <p className="text-sm text-neutral-300">
              You scored <strong className="text-white text-lg font-mono">{score}</strong> out of{' '}
              <strong className="text-white text-lg font-mono">{LEARNING_SCENARIOS.length}</strong>!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400">Rules You Mastered:</div>
              <ul className="text-xs text-neutral-300 space-y-1">
                {LEARNING_SCENARIOS.filter((s) => userAnswers[s.id]?.isCorrect).map((s) => (
                  <li key={s.id} className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{s.keyConcept}</span>
                  </li>
                ))}
                {score === 0 && <li className="text-neutral-500">None yet. Try again!</li>}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-xs font-bold text-amber-400">Rules To Review:</div>
              <ul className="text-xs text-neutral-300 space-y-1">
                {LEARNING_SCENARIOS.filter((s) => !userAnswers[s.id]?.isCorrect).map((s) => (
                  <li key={s.id} className="flex items-center gap-1.5">
                    <span className="text-amber-400">!</span>
                    <span>{s.keyConcept}</span>
                  </li>
                ))}
                {score === LEARNING_SCENARIOS.length && (
                  <li className="text-emerald-400">100% Perfect! You're a scam-spotting pro!</li>
                )}
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
