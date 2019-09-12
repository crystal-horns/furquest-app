import {Quest} from './Quest';

export interface QuestRoute {
    id: number;
    quest_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    quest: Quest;
}
