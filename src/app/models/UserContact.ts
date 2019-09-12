import {ContactType} from './ContactType';

export interface UserContact {
    id: number;
    contacts_types_id: number;
    value?: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;

    contacts_type: ContactType;
}
