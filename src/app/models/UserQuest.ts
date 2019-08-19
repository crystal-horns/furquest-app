import {QuestRoute} from "./QuestRoute";

export interface UserQuest {
    "id": number,
    "user_id": number,
    "quest_route_id": number,
    "created_at": string,
    "updated_at": string,
    "deleted_at": string,
    "quest_route": QuestRoute
}