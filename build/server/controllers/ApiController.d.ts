import { Router } from "express";
export interface ApiController {
    path: string;
    router(): Router;
}
