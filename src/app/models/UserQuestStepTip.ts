import {Tip} from './Tip';

export interface UserQuestStepTip {
    id: number;
    user_quest_step_id: number;
    user_quest_id: number;
    tip_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    tip: Tip;
}
