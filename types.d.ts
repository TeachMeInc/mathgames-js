declare module 'mathgames-api' {
    namespace MathGamesAPI {

        interface InstanceConfig {
          api_key: string,
          wrapper: HTMLElement
        }

        interface Question {
          display: string,
          choices: string[]
        }

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
          selectSkill: () => void,
          startSession: (pool_key: string) => void,
          getQuestion: () => Question,
          answerQuestion: (index: number) => boolean,
          showProgress: () => void,
          endSession: () => void
        };

        const getInstance: (config: InstanceConfig) => APIInstance;

    }

    export = MathGamesAPI;
}
