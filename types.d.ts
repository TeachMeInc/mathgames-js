declare module 'mathgames-api' {
    namespace MathGamesAPI {

        interface InstanceConfig {
          api_key: string,
          wrapper: HTMLElement
        };

        interface SelectSkillConfig {
          pool_key: string
        };

        interface Question {
          display: string,
          choices: string[]
        };

        type SkillSelectedListener = () => void;
        type SessionReadyListener = () => void;
        type SkillChangedListener = () => void;
        type ProgressClosedListener = () => void;
        type AverageTimeChangeListener = (time: number) => void;

        interface APIInstance {
          onSkillSelected?: SkillSelectedListener,
          onSessionReady?: SessionReadyListener,
          onSkillChanged?: SkillChangedListener,
          onProgressClosed?: ProgressClosedListener,
          onAverageTimeChange?: AverageTimeChangeListener,
          selectSkill: (options: SelectSkillConfig) => void,
          startSession: () => void,
          getQuestion: () => Question,
          answerQuestion: (index: number) => boolean,
          showProgress: () => void,
          endSession: () => void
        };

        const getInstance: (options: InstanceConfig) => APIInstance;

    }

    export = MathGamesAPI;
}
