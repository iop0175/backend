export class UpdateWorkDto {
    work: {
        _id: string;
        userid: string;
        name: string;
        work: number;
        date: Date;
        milestone: string;
        __v?: number;
    };
}
