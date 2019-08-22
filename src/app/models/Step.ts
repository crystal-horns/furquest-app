export interface Step {
    id: number,
    quest_id: number,
    name: string,
    qrcode: string,
    content: string,
    lat: number,
    long: number,
    tips_count: number,
    status: number,
    created_at: string,
    updated_at: string,
    deleted_at: string
}