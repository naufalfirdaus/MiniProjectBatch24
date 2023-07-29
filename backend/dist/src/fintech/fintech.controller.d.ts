import { FintechService } from './fintech.service';
import { FintechDto } from './dto/fintech.dto';
export declare class FintechController {
    private Services;
    constructor(Services: FintechService);
    getAll(page: number, limit: number, search: string): Promise<import("nestjs-typeorm-paginate").Pagination<import("../../output/entities/Fintech").Fintech, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: number): Promise<any>;
    create(body: FintechDto): Promise<any>;
    update(id: number, fint_code: string, fint_name: string): Promise<any>;
    delete(id: number): Promise<any>;
}
