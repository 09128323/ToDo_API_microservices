"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTaskDto {
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Task 1', description: 'Название задачи' }),
    (0, class_validator_1.IsString)({ message: 'title должно быть строкой' }),
    (0, class_validator_1.Length)(1, 255, { message: 'title должно быть от 1 до 255 символов' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Task description',
        description: 'Описание задачи',
    }),
    (0, class_validator_1.IsString)({ message: 'description должно быть строкой' }),
    (0, class_validator_1.Length)(0, 255, { message: 'description должно быть до 255 символов' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Позиция задачи в колонке' }),
    (0, class_validator_1.IsInt)({ message: 'position должно быть целым числом' }),
    (0, class_validator_1.Min)(0, { message: 'position должно быть не меньше 0' }),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "position", void 0);
//# sourceMappingURL=create-task.dto.js.map