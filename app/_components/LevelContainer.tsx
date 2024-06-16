import { levelAndXp } from "../_utils/global";
import { useState, useEffect } from "react";
import { Progress } from "./ui/Progress";
import { calculateTotalExperienceForLevel } from "../_utils/calculateExpInLevel";

const LevelContainer = ({ levelAndXp }: { levelAndXp: levelAndXp }) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(levelAndXp.level);
  const [levelKey, setLevelKey] = useState<number>(levelAndXp.level); //prevent shrinking in progress bar

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const { level, xpToNextLevel } = levelAndXp;
    const XPRequireToNextLevel = calculateTotalExperienceForLevel(level);
    const currentUserXp = XPRequireToNextLevel - xpToNextLevel;
    const progressPercentage = (currentUserXp / XPRequireToNextLevel) * 100;

    const animateMultipleLevelUps = async (
      startLevel: number,
      endLevel: number
    ) => {
      let transitionLevel = startLevel + 1;
      while (transitionLevel <= endLevel) {
        await delay(1000);
        setCurrentLevel(transitionLevel);
        transitionLevel += 1;
      }
    };

    //written in use effect to trigger dependency
    const handleLevelUp = async () => {
      if (currentLevel === 0) {
        setProgress(progressPercentage);
        setCurrentLevel(level);
        return;
      }
      // Player leveled up
      if (level > currentLevel) {
        //frame 1
        setProgress(100);
        await animateMultipleLevelUps(currentLevel, level);

        //frame 2
        setLevelKey(level);
        setCurrentLevel(level);
        setProgress(0);
        await delay(1000);

        //last frame
        setProgress(progressPercentage);

        //no levelup
      } else {
        setProgress(progressPercentage);
      }
    };
    void handleLevelUp();
  }, [levelAndXp, currentLevel]);

  return (
    <div className="fixed bottom-40 left-4 w-40" key={levelKey}>
      {currentLevel === 0 ? null : (
        <>
          <p>level{currentLevel}</p>
          <Progress value={progress} />
        </>
      )}
    </div>
  );
};

export default LevelContainer;