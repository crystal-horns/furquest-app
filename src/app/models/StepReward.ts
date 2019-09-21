import {RewardType} from './RewardType';

export interface StepReward {
    id: number;
    step_id: number;
    reward_type_id: number;
    value: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;

    reward_type: RewardType;
}
