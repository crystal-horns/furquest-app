import {Step} from './Step';
import {UserQuestStepTip} from './UserQuestStepTip';

export interface UserQuestStep {
    id: number;
    user_quest_id: number;
    step_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    step: Step;
    user_quest_step_tip: UserQuestStepTip[];
}
