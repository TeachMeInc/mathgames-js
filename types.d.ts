declare module 'mathgames-api' {
    namespace MathGamesAPI {

        interface InstanceConfig {
          api_key: string,
          wrapper: HTMLElement
        };

        interface SelectSkillConfig {
          pool_key: string
        };

        type APIEventType =
            'SESSION_READY'
          | 'SKILL_SELECTED'
          | 'SKILL_CHANGED'
          | 'PROGRESS_CLOSED'
          | 'AVERAGE_TIME_CHANGE'
          | 'AVAILABLE_STANDARDS_CLOSED'
          | 'ERROR';

        interface Question {
          display: string,
          choices: string[]
        };

        interface APIInstance {
          on: (event: APIEventType, listener: Function) => APIInstance,
          off: (event: APIEventType, listener: Function) => APIInstance,
          selectSkill: (options: SelectSkillConfig) => void,
          startSession: () => void,
          getQuestion: () => Question,
          answerQuestion: (index: number) => boolean,
          showProgress: () => void,
          showAvailableStandards: () => void,
          resize: () => void,
          endSession: () => void
        };

        const getInstance: (options: InstanceConfig) => APIInstance;

    }

    export = MathGamesAPI;
}
